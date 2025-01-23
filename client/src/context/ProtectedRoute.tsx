import { Navigate, useLocation } from "react-router-dom";
import { useUser } from "./UserContext";
import { ReactNode } from "react";

export const ProtectedRoute = ({ children }: { children: ReactNode }) => {
  const { user } = useUser();
  const location = useLocation();

  if (!user) {
    
    return <Navigate to="/login" state={{ from: location.pathname }} replace />;
  }

  return children;
};
