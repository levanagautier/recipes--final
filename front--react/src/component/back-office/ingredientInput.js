import React, { useEffect } from 'react';

export function IngredientInput({
  id,
  name,
  qty,
  unit,
  prepNotes,
  recipe,
  handleIngredientChange,
  deleteIngredient,
  subrecipeId,
  order,
  ...props
}) {
  const units = ['', 'g', 'mg', 'l', 'cl', 'ml'];

  useEffect(() => {
    console.log(order);
  }, []);

  return (
    <li>
      {recipe && (
        <>
          <input
            className="ingredient__qty"
            type="number"
            value={qty || ''}
            name="qty"
            onChange={(e) => handleIngredientChange(e, id, order)}
            required={true}
          />
          <select
            className="ingredient__unit"
            name="unit"
            onChange={(e) => handleIngredientChange(e, id, order)}
            value={unit}
          >
            {units.map((unit) => (
              <option key={unit} value={unit}>
                {unit}
              </option>
            ))}
          </select>
        </>
      )}
      <input
        className="ingredient__name"
        type="text"
        name="name"
        value={name}
        onChange={(e) => handleIngredientChange(e, id, order)}
      />
      {recipe && (
        <>
          <input
            className="ingredient__prepNotes"
            type="text"
            name="prepNotes"
            value={prepNotes}
            onChange={(e) => handleIngredientChange(e, id, order)}
          />
          <button
            className="ingredient__delete"
            onClick={(e) => deleteIngredient(e, id, order)}
          >
            &times;
          </button>
        </>
      )}
    </li>
  );
}
