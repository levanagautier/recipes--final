import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import { NotFound } from '../notFound.js';
// import { IngredientInput } from './ingredientInput';
// import { UtensilInput } from './utensilInput';

import { useSelector } from 'react-redux';

export function RecipeItem() {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(false);
  const [steps, setSteps] = useState([]);
  const [utensils, setUtensils] = useState([]);
  const [ingredients, setIngredients] = useState([]);
  const [ingredientsCount, setIngredientsCount] = useState(0);
  const [utensilsCount, setUtensilsCount] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(`http://localhost:8080/recipes/${id}/`);
      const newRecipe = await response.json();
      setRecipe(newRecipe);
    };

    fetchData();
  }, [id]);

  useEffect(() => {
    console.log(recipe);
  }, [recipe]);

  useEffect(() => {
    if (recipe) {
      setSteps([]);
      recipe.subRecipes.forEach((subrecipe) => {
        for (const [index, step] of Object.entries(subrecipe.instructions)) {
          setSteps((prevState) => [...prevState, step]);
        }
      });
      setIngredients(recipe.ingredients);
      setUtensils(recipe.utensils);
      setIngredientsCount(recipe.ingredientsCount);
      setUtensilsCount(recipe.utensilsCount);
    }
  }, [recipe]);

  if (recipe) {
    return <div>{recipe.title}</div>;
  }

  return null;
}
