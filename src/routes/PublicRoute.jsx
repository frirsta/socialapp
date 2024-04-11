import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { Navigate } from "react-router-dom";

const PublicRoute = ({ children }) => {
  const { currentUser } = useContext(AuthContext);

  return currentUser ? <Navigate to="/signin" replace /> : children;
};

export default PublicRoute;
