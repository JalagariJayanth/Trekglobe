
import { Navigate, Outlet} from "react-router-dom";

const ProtectedRoute = () => {
  const jwtToken = localStorage.getItem("jwtToken");


  if (!jwtToken) {
    return <Navigate to="/login" />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
