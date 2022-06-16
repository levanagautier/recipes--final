import React from "react";
import { Login } from "./login";
import { Navigate } from "react-router-dom";
import "../../scss/front-office/auth.scss";
import { useSelector } from "react-redux";

export function Auth() {
  const token =
    useSelector((state) => state.token) || localStorage.getItem("token");
  if (token) {
    return <Navigate to="/admin" />;
  }

  return (
    <section className="auth">
      <h1 className="auth__title">S'identifier</h1>
      <Login />
    </section>
  );
}
