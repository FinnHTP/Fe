import { jwtDecode } from "jwt-decode";
import { Navigate } from "react-router-dom";

function PrivateRoute({ children, allowedRoles }) {
  const token = localStorage.getItem("accesstoken");

  if (!token) {
    return <Navigate to="/login" />;
  }

  try {
    const decodedToken = jwtDecode(token);
    const userRoles = decodedToken.roles || [];

    const hasAccess = allowedRoles.some((role) => userRoles.includes(role));

    return hasAccess ? children : <Navigate to="/unauthorized" />;
  } catch (error) {
    console.error("Invalid token", error);
    return <Navigate to="/login" />;
  }
}

export default PrivateRoute;
