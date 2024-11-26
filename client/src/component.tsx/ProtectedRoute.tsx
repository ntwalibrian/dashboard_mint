import { Navigate, useParams } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

const isAuthenticated = (id: string | undefined) => {
  // const token =
  // const decoded = jwtDecode<{ id: string; username: string }>(token);
  // return !!localStorage.getItem("authToken");
  if (!!localStorage.getItem("authToken")) {
    const token = localStorage.getItem("authToken");
    if (token) {
      const decoded = jwtDecode<{ id: string; username: string }>(token);
      if (id === decoded.id) {
        return 1
      } else {
        return 0
      }
    }
  } else {
    return 0
  }
};
type ProtectedRouteProps = {
  children: React.ReactNode;
};
const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const { id } = useParams();
  if (!isAuthenticated(id)) {
    return <Navigate to="/login" replace />;
  }
  return <>{children}</>;
};

export default ProtectedRoute;
