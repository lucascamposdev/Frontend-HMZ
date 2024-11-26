// Hooks
import { useAuth } from "@/context/useAuth";
import { Outlet, Navigate } from "react-router-dom";

const AuthLayout = () => {
  const { isAuthenticated } = useAuth();

  if (isAuthenticated) {
    return <Navigate to="/" />;
  }

  return (
    <div className="bg-primary text-secondary h-screen w-full">
      <Outlet /> 
    </div>
  );
};

export default AuthLayout;
