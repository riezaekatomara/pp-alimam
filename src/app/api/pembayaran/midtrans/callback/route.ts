import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase/server";
import crypto from "crypto";

/**
 * POST /api/pembayaran/midtrans/callback
 * Menerima notifikasi dari Midtrans (webhook)
 *
 * Midtrans akan mengirim notifikasi ke endpoint ini setelah:
 * - Pembayaran berhasil (settlement, capture)
 * - Pembayaran pending
 * - Pembayaran gagal (deny, expire, cancel)
 */
export async function POST(request: NextRequest) {
  try {
    // 1. Parse notification body
    const notification = await request.json();

    console.log("Midtrans notification received:", {
      order_id: notification.order_id,
      transaction_status: notification.transaction_status,
      fraud_status: notification.fraud_status,
    });

    // 2. Validate notification signature
    const serverKey = process.env.MIDTRANS_SERVER_KEY;

    if (!serverKey) {
      console.error("MIDTRANS_SERVER_KEY not configured");
      return NextResponse.json({ status: "error", message: "Server key not configured" }, { status: 500 });
    }

    // Generate signature key for verification
    // signature_key = SHA512(order_id+status_code+gross_amount+ServerKey)
    const signatureKey = notification.signature_key;
    const orderId = notification.order_id;
    const statusCode = notification.status_code;
    const grossAmount = notification.gross_amount;

    const expectedSignature = crypto
      .createHash("sha512")
      .update(orderId + statusCode + grossAmount + serverKey)
      .digest("hex");

    if (signatureKey !== expectedSignature) {
      console.error("Invalid signature key");
      return NextResponse.json({ status: "error", message: "Invalid signature" }, { status: 403 });
    }

    // 3. Find the payment record by order_id
    const { data: pembayaran, error: fetchError } = await supabaseAdmin
      .from("pembayaran")
      .select("id, pendaftar_id, status_pembayaran")
      .eq("midtrans_order_id", orderId)
      .single();

    if (fetchError || !pembayaran) {
      console.error("Payment not found for order_id:", orderId);
      return NextResponse.json({ status: "error", message: "Payment not found" }, { status: 404 });
    }

    // 4. Determine payment status based on notification
    const transactionStatus = notification.transaction_status;
    const fraudStatus = notification.fraud_status;

    let newStatus = pembayaran.status_pembayaran;
    let shouldUpdatePendaftar = false;

    if (transactionStatus === "capture") {
      // For credit card payments
      if (fraudStatus === "accept") {
        newStatus = "verified";
        shouldUpdatePendaftar = true;
      } else if (fraudStatus === "challenge") {
        // Need manual review
        newStatus = "pending";
      }
    } else if (transactionStatus === "settlement") {
      // Payment successful
      newStatus = "verified";
      shouldUpdatePendaftar = true;
    } else if (transactionStatus === "pending") {
      // Waiting for payment
      newStatus = "pending";
    } else if (
      transactionStatus === "deny" ||
      transactionStatus === "expire" ||
      transactionStatus === "cancel"
    ) {
      // Payment failed/expired/cancelled
      newStatus = "rejected";
    }

    // 5. Update payment record
    const { error: updateError } = await supabaseAdmin
      .from("pembayaran")
      .update({
        midtrans_transaction_id: notification.transaction_id,
        midtrans_transaction_status: transactionStatus,
        midtrans_payment_type: notification.payment_type,
        midtrans_response_json: notification,
        status_pembayaran: newStatus,
        verified_at: newStatus === "verified" ? new Date().toISOString() : null,
        catatan_verifikasi:
          newStatus === "verified"
            ? `Pembayaran otomatis via ${notification.payment_type}`
            : newStatus === "rejected"
            ? `Pembayaran ${transactionStatus}`
            : null,
        updated_at: new Date().toISOString(),
      })
      .eq("id", pembayaran.id);

    if (updateError) {
      console.error("Error updating payment:", updateError);
      return NextResponse.json({ status: "error", message: "Failed to update payment" }, { status: 500 });
    }

    // 6. Update pendaftar status if payment is successful
    if (shouldUpdatePendaftar) {
      // Get current pendaftar status
      const { data: pendaftar } = await supabaseAdmin
        .from("pendaftar")
        .select("status_pendaftaran")
        .eq("id", pembayaran.pendaftar_id)
        .single();

      // Only update if still waiting for payment
      if (
        pendaftar &&
        (pendaftar.status_pendaftaran === "draft" ||
          pendaftar.status_pendaftaran === "waiting_payment" ||
          pendaftar.status_pendaftaran === "payment_verification")
      ) {
        await supabaseAdmin
          .from("pendaftar")
          .update({
            status_pendaftaran: "data_lengkap", // Payment verified, move to next step
            updated_at: new Date().toISOString(),
          })
          .eq("id", pembayaran.pendaftar_id);

        console.log(`Pendaftar ${pembayaran.pendaftar_id} status updated to data_lengkap`);
      }
    }

    // 7. Return success
    console.log(`Payment ${orderId} updated to status: ${newStatus}`);
    return NextResponse.json({ status: "ok", message: "Notification processed successfully" });
  } catch (error: any) {
    console.error("Error processing Midtrans callback:", error);
    return NextResponse.json({ status: "error", message: "Internal server error" }, { status: 500 });
  }
}

/**
 * GET /api/pembayaran/midtrans/callback
 * Health check endpoint untuk Midtrans
 */
export async function GET() {
  return NextResponse.json({ status: "ok", message: "Midtrans callback endpoint is ready" });
}
