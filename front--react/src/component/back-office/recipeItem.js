import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { IngredientInput } from './ingredientInput';
import { UtensilInput } from './utensilInput';
import { useSelector } from 'react-redux';
import '../../scss/back-office/recipe-edit.scss';

export function RecipeItem() {
  const { id } = useParams();
  const [recipe, setRecipe] = useState();
  const [steps, setSteps] = useState([]);
  const [utensils, setUtensils] = useState([]);
  const [ingredients, setIngredients] = useState([]);
  const [ingredientsCount, setIngredientsCount] = useState(0);
  const [utensilsCount, setUtensilsCount] = useState(0);
  const [apiMessage, setApiMessage] = useState(false);
  const token =
    useSelector((state) => state.token) || localStorage.getItem('token');

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(`http://localhost:8080/recipes/${id}/`);
      const newRecipe = await response.json();
      setRecipe(newRecipe);
    };

    fetchData();
  }, [id]);

  useEffect(() => {
    if (recipe) {
      setSteps([]);
      recipe.subRecipes.forEach((subrecipe) => {
        for (const [index, step] of Object.entries(subrecipe.instructions)) {
          setSteps((prevState) => [
            ...prevState,
            { subRecipeId: subrecipe.id, order: index, instructions: step },
          ]);
        }
      });
      setIngredients(recipe.ingredients);
      setUtensils(recipe.utensils);
      setIngredientsCount(recipe.ingredientsCount);
      setUtensilsCount(recipe.utensilsCount);
    }
  }, [recipe]);

  useEffect(() => {
    console.log(steps);
  }, [steps]);

  useEffect(() => {}, [ingredientsCount]);

  useEffect(() => {
    setTimeout(() => setApiMessage(false), 3000);
  }, [apiMessage]);

  const handleSubmit = (e) => {
    e.preventDefault();
    let { ...updatedRecipe } = recipe;
    updatedRecipe.ingredients = ingredients;
    updatedRecipe.utensils = utensils;

    updatedRecipe.instructions = steps;

    delete updatedRecipe.utensilsCount;
    delete updatedRecipe.ingredientsCount;
    console.log(updatedRecipe);
    fetch(`http://localhost:8080/recipes/${id}/`, {
      method: 'PUT',
      headers: {
        'x-access-token': token,
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
      body: JSON.stringify({
        updatedRecipe,
      }),
    })
      .then((response) => response.json())
      .then((apiResponse) => {
        setApiMessage(apiResponse);
      });
  };

  const handleTitleChange = (e) => {
    setRecipe((prevState) => ({
      ...prevState,
      title: e.target.value,
    }));
  };

  const handleIngredientChange = (
    { target: { name, value } },
    ingredientId
  ) => {
    setIngredients((prevState) =>
      prevState.map((ingredient) => {
        if (ingredient.id === ingredientId) {
          return {
            ...ingredient,
            [name]: value,
          };
        }
        return ingredient;
      })
    );
  };

  const addIngredient = (subrecipeId) => {
    setIngredientsCount((prevState) => ++prevState);
    setIngredients((prevState) => [
      ...prevState,
      {
        id: ingredientsCount,
        name: '',
        qty: '',
        unit: '',
        prepNotes: '',
        subrecipeId,
      },
    ]);
  };

  const handleUtensilChange = ({ target: { name, value } }, utensilId) => {
    setUtensils((prevState) =>
      prevState.map((utensil) => {
        if (utensil.id === utensilId) {
          return {
            ...utensil,
            [name]: value,
          };
        }
        return utensil;
      })
    );
  };

  const addUtensil = (subrecipeId) => {
    setUtensilsCount((prevState) => ++prevState);
    setUtensils((prevState) => [
      ...prevState,
      {
        id: utensilsCount,
        name: '',
        subrecipeId,
      },
    ]);
  };

  const addStep = (subrecipeId, order) => {
    setSteps((prevState) => [
      ...prevState,
      { subrecipeId, order: order + 1, instructions: '' },
    ]);
  };

  const deleteIngredient = (e, ingredientId) => {
    setIngredients((prevState) =>
      prevState.filter((ingredient) => ingredient.id !== ingredientId)
    );
  };

  const deleteUtensil = (e, utensilId) => {
    setUtensils((prevState) =>
      prevState.filter((utensil) => utensil.id !== utensilId)
    );
  };

  const handleStepChange = (e, stepIndex) => {
    console.log(stepIndex);
    setSteps((prevState) => {
      return prevState.map((step) => {
        if (+step.order === +stepIndex) {
          return {
            ...step,
            instructions: e.target.value,
          };
        }
        return step;
      });
    });
  };

  if (recipe) {
    return (
      <form onSubmit={handleSubmit} className="edit">
        <section className="edit__field-group">
          <h1 className="edit__title">
            <p className="edit__label">titre</p>
            <input
              type="text"
              value={recipe.title}
              name="recipe-title"
              onChange={handleTitleChange}
            />
          </h1>

          {recipe.subRecipes.map((subrecipe) => (
            <div key={subrecipe.id}>
              <article className="edit__field">
                <details className="ingredients__list">
                  <summary className="edit__label">
                    Ingrédients {subrecipe.title}
                  </summary>
                  <ul>
                    {ingredients.length > 0 &&
                      ingredients.map((ingredient) => {
                        if (ingredient.subrecipeId === subrecipe.id) {
                          return (
                            <IngredientInput
                              key={ingredient.id}
                              {...ingredient}
                              recipe={true}
                              handleIngredientChange={handleIngredientChange}
                              deleteIngredient={deleteIngredient}
                            />
                          );
                        }
                        return null;
                      })}
                  </ul>
                </details>
                <button
                  type="button"
                  className="edit__add-button"
                  onClick={() => addIngredient(subrecipe.id)}
                >
                  &#65291; ingrédient
                </button>
              </article>
            </div>
          ))}

          {recipe.subRecipes.map((subrecipe) => (
            <div key={subrecipe.id}>
              <article className="edit__field">
                <details className="utensils__list">
                  <summary className="edit__label">
                    Ustensiles {subrecipe.title}
                  </summary>
                  <ul>
                    {utensils.length > 0 &&
                      utensils.map((utensil) => {
                        if (utensil.subrecipeId === subrecipe.id) {
                          return (
                            <UtensilInput
                              {...utensil}
                              handleUtensilChange={handleUtensilChange}
                              deleteUtensil={deleteUtensil}
                              key={utensil.id}
                            />
                          );
                        }
                        return null;
                      })}
                  </ul>
                </details>
                <button
                  type="button"
                  className="edit__add-button"
                  onClick={() => addUtensil(subrecipe.id)}
                >
                  &#65291; ustensile
                </button>
              </article>
            </div>
          ))}

          {recipe.subRecipes.map((subrecipe) => (
            <article className="instructions__list">
              <div className="instructions__header">
                <h3 className="edit__label">Instructions {subrecipe.title}</h3>
                <button
                  className="edit__add-button"
                  type="button"
                  onClick={() => addStep(subrecipe.id, steps.length)}
                >
                  &#65291; étape
                </button>
              </div>

              {steps.map((step, index) => (
                <details className="instructions__container">
                  <summary
                    className="edit__label instructions__label"
                    htmlFor={`subrepice${subrecipe.id}-step${index + 1}`}
                  >
                    étape {index + 1}
                  </summary>
                  <textarea
                    className="instructions__textarea"
                    name={`subrepice${subrecipe.id}-step${index + 1}`}
                    value={step.instructions}
                    onChange={(e) => handleStepChange(e, step.order)}
                  />
                </details>
              ))}
            </article>
          ))}
        </section>

        <section className="edit__submit">
          <input type="submit" value="valider" />
          <p className="edit__message">{apiMessage.message}</p>
        </section>
      </form>
    );
  } else {
    return null;
  }
}
