import React from "react";
import { useAuth } from "../contexts/AuthContext";
import { Navigate, useLocation } from "react-router";
import Loading from "../components/utilities/Loading";

const PrivateRoutes = ({ children }) => {
  const { user, authLoading } = useAuth();
  const location = useLocation();

  if (authLoading) return <Loading />;

  if (user && user.email) return children;

  return (
    <Navigate
      to="/login"
      replace
      state={{
        from: location.pathname,
        message: "You must login to access this page.",
      }}
    />
  );
};

export default PrivateRoutes;
