import React from 'react';

export function UtensilInput({
  id,
  name,
  handleUtensilChange,
  deleteUtensil,
  ...props
}) {
  return (
    <li>
      <input
        type="text"
        name="name"
        value={name}
        onChange={(e) => handleUtensilChange(e, id)}
      />
      <button className="utensil__delete" onClick={(e) => deleteUtensil(e, id)}>
        &times;
      </button>
    </li>
  );
}
