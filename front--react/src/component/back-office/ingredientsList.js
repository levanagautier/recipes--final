import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { CreationButton } from '../back-index';
import { useSelector } from 'react-redux';
import '../../scss/back-office/list.scss';

export function IngredientsList() {
  const [ingredients, setIngredients] = useState([]);
  const token =
    useSelector((state) => state.token) || localStorage.getItem('token');

  useEffect(() => {
    fetch('http://localhost:8080/ingredients')
      .then((response) => response.json())
      .then((data) => setIngredients(data));
  }, []);

  useEffect(() => {
    console.log(ingredients);
  }, [ingredients]);

  const deleteIngredient = (ingredientId) => {
    setIngredients((prevState) =>
      prevState.filter((ingredient) => ingredient.id !== ingredientId)
    );
    fetch(`http://localhost:8080/ingredients/${ingredientId}`, {
      method: 'DELETE',
      headers: {
        'x-access-token': token,
      },
    })
      .then((response) => response.json())
      .then(console.log);
  };

  return (
    <section className="resources__list">
      <h1>Liste des ingrédients</h1>
      <CreationButton ressource="ingredients" text="ingredient" />
      <div className="resources__table">
        <table>
          <thead>
            <tr>
              <th id="thead__ingredient-name">Ingrédient</th>
              <th id="thead__last-modification">Dernière modification</th>
              <th id="thead__edit"></th>
              <th id="thead__delete"></th>
            </tr>
          </thead>
          <tbody>
            {ingredients.map((ingredient) => (
              <tr key={ingredient.id}>
                <td className="tbody__ingredient-name">{ingredient.name}</td>
                <td className="tbody__last-modification">
                  {ingredient.updatedAt}
                </td>
                <td className="tbody__edit">
                  <Link
                    className="table__icon"
                    title={"Éditer l'ingrédient " + ingredient.name}
                    to={`./${ingredient.id}`}
                  >
                    <img
                      alt={"Éditer l'ingrédient " + ingredient.name}
                      src={process.env.PUBLIC_URL + '/icons/icon__edit.svg'}
                    />
                  </Link>
                </td>
                <td className="tbody__delete">
                  <div
                    className="table__icon"
                    title={"Supprimer l'ingrédient " + ingredient.name}
                    onClick={() => deleteIngredient(ingredient.id)}
                  >
                    <img
                      alt={"Supprimer l'ingrédient " + ingredient.name}
                      src={process.env.PUBLIC_URL + '/icons/icon__delete.svg'}
                    />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
