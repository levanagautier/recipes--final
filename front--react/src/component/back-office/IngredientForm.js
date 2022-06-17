import React, { useState } from 'react';

import { useSelector } from 'react-redux';

export function IngredientForm() {
  const token =
    useSelector((state) => state.token) || localStorage.getItem('token');

  const [ingredient, setIngredient] = useState({
    name: '',
  });

  const [apiMessage, setApiMessage] = useState(false);

  const handleIngredientChange = ({ target: { name, value } }) => {
    setIngredient((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    fetch(`http://localhost:8080/ingredients`, {
      method: 'POST',
      headers: {
        'x-access-token': token,
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
      body: JSON.stringify(ingredient),
    })
      .then((response) => response.json())
      .then((apiResponse) => setApiMessage(apiResponse));
  };
  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="name">
        Nom
        <input
          type="text"
          name="name"
          id="name"
          value={ingredient.name}
          onChange={handleIngredientChange}
        />
      </label>
      <section className="edit__submit">
        <input type="submit" value="valider" />
        <p className="edit__message">{apiMessage.message}</p>
      </section>
    </form>
  );
}
