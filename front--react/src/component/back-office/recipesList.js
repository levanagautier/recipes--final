import React, { useState, useEffect } from 'react';
import { Link, Routes, Route } from 'react-router-dom';
import { CreationButton } from '../back-index';

export function RecipesList() {
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    fetch('http://localhost:8080/recipes')
      .then((response) => response.json())
      .then((data) => setRecipes(data));
  }, []);

  useEffect(() => {
    console.log(recipes);
  }, [recipes]);

  return (
    <section className="resources__list">
      <h1>Liste des recettes</h1>
      <CreationButton ressource="recipes" text="recette" />
      <div className="resources__table">
        <table>
          <thead>
            <tr>
              <th id="thead__recipe-title">Recette</th>
              <th id="thead__status">Statut</th>
              <th id="thead__date">Date</th>
              <th id="thead__last-modification">Dernière modification</th>
              <th id="thead__edit"></th>
              <th id="thead__delete"></th>
            </tr>
          </thead>
          <tbody>
            {recipes.map((recipe) => (
              <tr key={recipe.id}>
                <td className="tbody__recipe-title">{recipe.title}</td>
                <td className="tbody__status">
                  {recipe.published === 1 ? 'Publiée' : 'Brouillon'}
                </td>
                <td className="tbody__date">{recipe.date}</td>
                <td className="tbody__last-modification">{recipe.updatedAt}</td>
                <td className="tbody__edit">
                  <Link
                    className="table__icon"
                    title={'Éditer la recette ' + recipe.title}
                    to={`./${recipe.id}`}
                  >
                    <img
                      alt={'Éditer la recette ' + recipe.title}
                      src={process.env.PUBLIC_URL + '/icons/icon__edit.svg'}
                    />
                  </Link>
                </td>
                <td className="tbody__delete">
                  <Link
                    className="table__icon"
                    title={'Supprimer la recette ' + recipe.title}
                    to={`./${recipe.id}`}
                  >
                    <img
                      alt={'Supprimer la recette ' + recipe.title}
                      src={process.env.PUBLIC_URL + '/icons/icon__delete.svg'}
                    />
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
