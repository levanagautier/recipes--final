import React from 'react';
import { NavLink } from 'react-router-dom';

export function CreationButton({ ressource }) {
  return (
    <NavLink to={`../create/${ressource}`}>
      <button>+</button>
    </NavLink>
  );
}
