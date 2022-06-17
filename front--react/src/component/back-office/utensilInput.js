import React, { useEffect } from 'react';

export function UtensilInput({
  id,
  name,
  handleUtensilChange,
  deleteUtensil,
  order,
  ...props
}) {
  useEffect(() => {
    console.log(order);
  }, []);
  return (
    <li>
      <input
        type="text"
        name="name"
        value={name}
        onChange={(e) => handleUtensilChange(e, id, order)}
      />
      <button
        className="utensil__delete"
        onClick={(e) => deleteUtensil(e, id, order)}
      >
        &times;
      </button>
    </li>
  );
}
