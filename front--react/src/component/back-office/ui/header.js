import React from "react";
import { Link } from "react-router-dom";

export function Header() {
  return (
    <header>
      <Link className="header" to="/">
        Recipes.{" "}
      </Link>
      <span className="header__subtitle">back-office</span>
    </header>
  );
}
