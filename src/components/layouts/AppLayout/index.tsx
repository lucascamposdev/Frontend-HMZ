// Hooks
import { useAuth } from "@/context/useAuth";
import { Outlet, Navigate } from "react-router-dom";

// Components
import Navbar from "./Navbar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import AppSidebar from "./Sidebar";

const AppLayout = () => {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  return (
    <div className="px-5">
      <Navbar />
      <div className="flex">
        <SidebarProvider>
          <AppSidebar />
          <SidebarTrigger />
          <main className="w-full">
            <Outlet />
          </main>
        </SidebarProvider>
      </div>
    </div>
  );
};

export default AppLayout;
