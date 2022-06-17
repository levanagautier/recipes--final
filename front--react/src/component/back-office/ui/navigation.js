import React from 'react';
import { NavLink } from 'react-router-dom';

export function Navigation() {
  return (
    <nav>
      <ul>
        <li>
          <NavLink
            title="Se rendre sur le tableau de bord"
            className={({ isActive }) => (isActive ? 'active' : undefined)}
            to="../admin/"
          >
            Dashboard
          </NavLink>
        </li>
        <li>
          <NavLink
            title="Se rendre sur la liste des recettes"
            className={({ isActive }) => (isActive ? 'active' : '')}
            to="recipes"
          >
            Recipes
          </NavLink>
        </li>
        <li>
          <NavLink
            title="Se rendre sur la liste des ingrédients"
            className={({ isActive }) => (isActive ? 'active' : '')}
            to="ingredients"
          >
            Ingrédients
          </NavLink>
        </li>
        <li>
          <NavLink
            title="Se rendre sur la liste des ustensiles"
            className={({ isActive }) => (isActive ? 'active' : '')}
            to="utensils"
          >
            Ustensiles
          </NavLink>
        </li>
        <li>
          <NavLink
            title="Se rendre sur la liste des tags"
            className={({ isActive }) => (isActive ? 'active' : '')}
            to="tags"
          >
            Tags
          </NavLink>
        </li>
        <li>
          <NavLink
            title="Se rendre sur la liste des utilisateurs"
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
