import { Navigate, Outlet } from "react-router-dom";

import useAuthContext from "../hooks/useAuthContext";

const ProtectedRoute = () => {
  const { currentUser } = useAuthContext();

  return currentUser ? <Outlet /> : <Navigate to="/login" />;
};

export default ProtectedRoute;
