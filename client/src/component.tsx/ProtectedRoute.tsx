import { Navigate } from "react-router-dom";

const isAuthenticated = () => {
  return !!localStorage.getItem("authToken");
};
type ProtectedRouteProps = {
  children: React.ReactNode;
};
const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  if (!isAuthenticated()) {
    return <Navigate to="/login" replace/>;
  }
  return <>{children}</>;
};
export default ProtectedRoute;
