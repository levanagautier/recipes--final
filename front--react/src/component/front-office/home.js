import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Filter } from '../../component/front-index';
import '../../scss/front-office/home.scss';

export function Home() {
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
    <section className="homepage">
      <Filter />
      <div className="recipes__container">
        {recipes.map((recipe) => (
          <article className="recipe__item" key={recipe.id}>
            <div
              role="img"
              aria-label={"Image d'illustration de la recette " + recipe.title}
              title={"Image d'illustration de la recette " + recipe.title}
              className="recipe__img"
              style={{
                backgroundImage: `url(/${recipe.picture})`,
              }}
            />
            <h2 className="recipe__title">{recipe.title}</h2>
            <div className="recipe__button">
              <Link className="button" to={`./recipes/${recipe.id}`}>
                voir la recette
              </Link>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
