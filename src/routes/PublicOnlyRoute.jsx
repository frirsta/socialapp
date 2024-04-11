import React, { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const PublicOnlyRoute = ({ children }) => {
  const { currentUser } = useContext(AuthContext);
  const location = useLocation();

  return !currentUser ? (
    children
  ) : (
    <Navigate to={location.state?.from || "/"} replace />
  );
};

export default PublicOnlyRoute;
