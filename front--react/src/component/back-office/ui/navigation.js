import React from 'react';
import { NavLink } from 'react-router-dom';

export function Navigation() {
  return (
    <nav>
      <ul>
        <li>
          <NavLink
            className={({ isActive }) => (isActive ? 'active' : undefined)}
            to="../admin/"
          >
            Dashboard
          </NavLink>
        </li>
        <li>
          <NavLink
            className={({ isActive }) => (isActive ? 'active' : '')}
            to="recipes"
          >
            Recipes
          </NavLink>
        </li>
        <li>
          <NavLink
            className={({ isActive }) => (isActive ? 'active' : '')}
            to="ingredients"
          >
            Ingrédients
          </NavLink>
        </li>
        <li>
          <NavLink
            className={({ isActive }) => (isActive ? 'active' : '')}
            to="utensils"
          >
            Ustensiles
          </NavLink>
        </li>
        <li>
          <NavLink
            className={({ isActive }) => (isActive ? 'active' : '')}
            to="tags"
          >
            Tags
          </NavLink>
        </li>
        <li>
          <NavLink
            className={({ isActive }) => (isActive ? 'active' : '')}
            to="users"
          >
            Utilisateurs
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}
