import { cookies } from "next/headers";
import { UserRole } from "@/lib/access-control";
import AdminSidebar from "./AdminSidebar";

export default async function AdminDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const cookieStore = await cookies();
  const sessionCookie = cookieStore.get("app_session");

  let userRole: UserRole | null = null;
  let adminName = "Admin";

  if (sessionCookie) {
    try {
      const session = JSON.parse(sessionCookie.value);
      userRole = session.role as UserRole;
      adminName = session.full_name || "Admin";
    } catch (error) {
      console.error("Failed to parse session cookie", error);
    }
  }

  return (
    <AdminSidebar userRole={userRole} adminName={adminName}>
      {children}
    </AdminSidebar>
  );
}
