import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "@/app/store";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import AdminSidebar from "@/components/admin/AdminSidebar";

const AdminLayout = () => {
  const location = useLocation();

  const { user, isAuthenticated, isLoading } = useSelector(
    (state: RootState) => state.auth
  );


    console.log("AdminLayout - isAuthenticated:", isAuthenticated);
    console.log("AdminLayout - user:", user);
    console.log("AdminLayout - isLoading:", isLoading);

  // Chờ dữ liệu user load xong (tránh redirect sớm)
  if (isLoading) {
    return <div className="p-6">Đang tải...</div>; // hoặc spinner
  }

  // Nếu chưa đăng nhập
  if (!isAuthenticated) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  // Nếu không phải admin
  if (user?.role !== "admin") {
    return <Navigate to="/unauthorized" replace />;
  }

  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full">
        <AdminSidebar />

        <main className="flex-1 overflow-auto bg-background py-4">
          <div className="border-b pb-4 ps-4">
            <SidebarTrigger />
          </div>

          <div className="p-6">
            <Outlet />
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
};

export default AdminLayout;
