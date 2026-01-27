// app/send-otp/page.tsx
"use client";

import { useState } from "react";
import { Send, Mail, MessageSquare, Smartphone, ArrowLeft } from "lucide-react";

interface ApiResponse {
  success: boolean;
  message: string;
  channel?: string;
  error?: string;
}

export default function SendOtpPage() {
  const [selectedChannel, setSelectedChannel] = useState<
    "email" | "telegram" | "sms"
  >("email");
  const [email, setEmail] = useState("ekatomarar@gmail.com");
  const [telegram, setTelegram] = useState("");
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSendOtp = async () => {
    // Reset messages
    setSuccessMessage("");
    setErrorMessage("");
    setLoading(true);

    // Validate inputs
    if (selectedChannel === "email" && !email) {
      setErrorMessage("Email tidak boleh kosong");
      setLoading(false);
      return;
    }

    if (selectedChannel === "telegram" && !telegram) {
      setErrorMessage("Telegram ID/Username tidak boleh kosong");
      setLoading(false);
      return;
    }

    if (selectedChannel === "sms" && !phone) {
      setErrorMessage("Nomor telepon tidak boleh kosong");
      setLoading(false);
      return;
    }

    // Prepare payload
    const payload: Record<string, string> = {
      channel: selectedChannel,
    };

    if (selectedChannel === "email") {
      payload.email = email;
    } else if (selectedChannel === "telegram") {
      payload.telegram = telegram;
    } else if (selectedChannel === "sms") {
      payload.phone = phone;
    }

    try {
      const response = await fetch("/api/register/send-otp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const data: ApiResponse = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Gagal mengirim kode OTP");
      }

      setSuccessMessage(data.message);

      // Reset form after successful send (optional)
      if (selectedChannel === "telegram") {
        setTelegram("");
      } else if (selectedChannel === "sms") {
        setPhone("");
      }
    } catch (error) {
      console.error("Error sending OTP:", error);
      setErrorMessage(
        error instanceof Error
          ? error.message
          : "Terjadi kesalahan saat mengirim kode",
      );
    } finally {
      setLoading(false);
    }
  };

  const handleBack = () => {
    // Navigasi kembali ke form sebelumnya
    window.history.back();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-6 md:p-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <button
              onClick={handleBack}
              className="flex items-center text-gray-600 hover:text-gray-800 transition-colors"
            >
              <ArrowLeft className="w-5 h-5 mr-2" />
              <span className="text-sm font-medium">Kembali ke Form</span>
            </button>
          </div>

          <h1 className="text-2xl font-bold text-gray-800 mb-2">
            Kirim Kode Verifikasi
          </h1>
          <p className="text-gray-600 text-sm">
            Pilih salah satu channel untuk menerima kode OTP
          </p>
        </div>

        {/* Channel Selection */}
        <div className="mb-8">
          <h2 className="text-sm font-semibold text-gray-700 mb-4">
            Pilih Channel Pengiriman:
          </h2>

          <div className="space-y-3">
            {/* Telegram Option */}
            <div
              className={`p-4 border-2 rounded-xl cursor-pointer transition-all ${
                selectedChannel === "telegram"
                  ? "border-blue-500 bg-blue-50"
                  : "border-gray-200 hover:border-gray-300"
              }`}
              onClick={() => setSelectedChannel("telegram")}
            >
              <div className="flex items-center">
                <div
                  className={`p-2 rounded-lg mr-3 ${
                    selectedChannel === "telegram"
                      ? "bg-blue-100"
                      : "bg-gray-100"
                  }`}
                >
                  <MessageSquare
                    className={`w-5 h-5 ${
                      selectedChannel === "telegram"
                        ? "text-blue-600"
                        : "text-gray-500"
                    }`}
                  />
                </div>
                <div className="flex-1">
                  <div className="flex justify-between items-center">
                    <span className="font-medium text-gray-800">Telegram</span>
                    <div
                      className={`w-4 h-4 rounded-full border-2 ${
                        selectedChannel === "telegram"
                          ? "border-blue-500 bg-blue-500"
                          : "border-gray-300"
                      }`}
                    >
                      {selectedChannel === "telegram" && (
                        <div className="w-full h-full rounded-full bg-white m-0.5"></div>
                      )}
                    </div>
                  </div>
                  <p className="text-sm text-gray-600 mt-1">
                    Kode dikirim ke akun Telegram (Real-time)
                  </p>
                </div>
              </div>
            </div>

            {/* Email Option */}
            <div
              className={`p-4 border-2 rounded-xl cursor-pointer transition-all ${
                selectedChannel === "email"
                  ? "border-green-500 bg-green-50"
                  : "border-gray-200 hover:border-gray-300"
              }`}
              onClick={() => setSelectedChannel("email")}
            >
              <div className="flex items-center">
                <div
                  className={`p-2 rounded-lg mr-3 ${
                    selectedChannel === "email" ? "bg-green-100" : "bg-gray-100"
                  }`}
                >
                  <Mail
                    className={`w-5 h-5 ${
                      selectedChannel === "email"
                        ? "text-green-600"
                        : "text-gray-500"
                    }`}
                  />
                </div>
                <div className="flex-1">
                  <div className="flex justify-between items-center">
                    <span className="font-medium text-gray-800">
                      Email{" "}
                      <span className="text-green-600 text-xs font-normal">
                        GRATIS
                      </span>
                    </span>
                    <div
                      className={`w-4 h-4 rounded-full border-2 ${
                        selectedChannel === "email"
                          ? "border-green-500 bg-green-500"
                          : "border-gray-300"
                      }`}
                    >
                      {selectedChannel === "email" && (
                        <div className="w-full h-full rounded-full bg-white m-0.5"></div>
                      )}
                    </div>
                  </div>
                  <p className="text-sm text-gray-600 mt-1">
                    Kode dikirim ke email orang tua
                  </p>
                  {selectedChannel === "email" && (
                    <div className="mt-2 p-2 bg-green-100 rounded-lg">
                      <p className="text-xs text-green-800 font-medium">
                        ✓ Akan dikirim ke: {email}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* SMS Option */}
            <div
              className={`p-4 border-2 rounded-xl cursor-pointer transition-all ${
                selectedChannel === "sms"
                  ? "border-purple-500 bg-purple-50"
                  : "border-gray-200 hover:border-gray-300"
              }`}
              onClick={() => setSelectedChannel("sms")}
            >
              <div className="flex items-center">
                <div
                  className={`p-2 rounded-lg mr-3 ${
                    selectedChannel === "sms" ? "bg-purple-100" : "bg-gray-100"
                  }`}
                >
                  <Smartphone
                    className={`w-5 h-5 ${
                      selectedChannel === "sms"
                        ? "text-purple-600"
                        : "text-gray-500"
                    }`}
                  />
                </div>
                <div className="flex-1">
                  <div className="flex justify-between items-center">
                    <span className="font-medium text-gray-800">SMS</span>
                    <div
                      className={`w-4 h-4 rounded-full border-2 ${
                        selectedChannel === "sms"
                          ? "border-purple-500 bg-purple-500"
                          : "border-gray-300"
                      }`}
                    >
                      {selectedChannel === "sms" && (
                        <div className="w-full h-full rounded-full bg-white m-0.5"></div>
                      )}
                    </div>
                  </div>
                  <p className="text-sm text-gray-600 mt-1">
                    Pilihan tepat jika internet terbatas
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Input Fields */}
        <div className="mb-8">
          {selectedChannel === "telegram" && (
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Telegram Username/ID
              </label>
              <input
                type="text"
                value={telegram}
                onChange={(e) => setTelegram(e.target.value)}
                placeholder="@username atau ID Telegram"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                disabled={loading}
              />
            </div>
          )}

          {selectedChannel === "email" && (
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Email Orang Tua
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="nama@email.com"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none transition"
                disabled={loading}
              />
            </div>
          )}

          {selectedChannel === "sms" && (
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Nomor Telepon
              </label>
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="081234567890"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none transition"
                disabled={loading}
              />
            </div>
          )}
        </div>

        {/* Messages */}
        {successMessage && (
          <div className="mb-4 p-4 bg-green-100 border border-green-400 text-green-700 rounded-lg">
            <div className="flex items-center">
              <div className="w-5 h-5 rounded-full bg-green-500 flex items-center justify-center mr-2">
                <span className="text-white text-xs">✓</span>
              </div>
              <span className="font-medium">{successMessage}</span>
            </div>
          </div>
        )}

        {errorMessage && (
          <div className="mb-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg">
            <div className="flex items-center">
              <div className="w-5 h-5 rounded-full bg-red-500 flex items-center justify-center mr-2">
                <span className="text-white text-xs">!</span>
              </div>
              <span className="font-medium">{errorMessage}</span>
            </div>
          </div>
        )}

        {/* Submit Button */}
        <button
          onClick={handleSendOtp}
          disabled={loading}
          className={`w-full py-3 px-4 rounded-lg font-medium text-white flex items-center justify-center transition ${
            selectedChannel === "telegram"
              ? "bg-blue-600 hover:bg-blue-700"
              : selectedChannel === "email"
                ? "bg-green-600 hover:bg-green-700"
                : "bg-purple-600 hover:bg-purple-700"
          } ${loading ? "opacity-70 cursor-not-allowed" : ""}`}
        >
          {loading ? (
            <>
              <svg
                className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
              Mengirim kode...
            </>
          ) : (
            <>
              <Send className="w-5 h-5 mr-2" />
              Kirim Kode OTP
            </>
          )}
        </button>

        {/* Tips */}
        <div className="mt-6 p-4 bg-gray-50 rounded-lg">
          <h3 className="text-sm font-semibold text-gray-700 mb-2">
            Tips Pemilihan Channel
          </h3>
          <ul className="text-xs text-gray-600 space-y-1">
            <li className="flex items-start">
              <span className="text-blue-500 mr-2">•</span>
              <span>
                <strong>Telegram</strong> jika ingin notifikasi real-time gratis
              </span>
            </li>
            <li className="flex items-start">
              <span className="text-green-500 mr-2">•</span>
              <span>
                <strong>Email</strong> untuk dokumentasi resmi
              </span>
            </li>
            <li className="flex items-start">
              <span className="text-purple-500 mr-2">•</span>
              <span>
                <strong>SMS</strong> jika internet terbatas
              </span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
