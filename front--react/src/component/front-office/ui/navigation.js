import React from "react";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";

export function Navigation() {
  const token =
    useSelector((state) => state.token) || localStorage.getItem("token");
  return (
    <nav>
      <div className="nav__item">
        <NavLink className={({ isActive }) => (isActive ? "active" : "")} to="">
          &#8943;
        </NavLink>
      </div>
      <div className="nav__item">
        {token ? (
          <NavLink
            className={({ isActive }) => (isActive ? "active" : "")}
            to="admin"
          >
            <img
              className="nav__icon"
              alt="Se connecter"
              src={process.env.PUBLIC_URL + "/icons/icon__chefshat.svg"}
            />
          </NavLink>
        ) : (
          <NavLink
            className={({ isActive }) => (isActive ? "active" : "")}
            to="auth"
          >
            <img
              className="nav__icon"
              alt="Se connecter"
              src={process.env.PUBLIC_URL + "/icons/icon__chefshat.svg"}
            />
          </NavLink>
        )}
      </div>
    </nav>
  );
}
