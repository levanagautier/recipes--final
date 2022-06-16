import React from "react";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

export function ProtectedRoute({ redirectPath = "/auth", children }) {
  const token =
    useSelector((state) => state.token) || localStorage.getItem("token");
  if (!token) {
    return <Navigate to={redirectPath} replace />;
  }

  return children;
}
