import React, { useState, useEffect } from 'react';
import { IngredientInput } from './ingredientInput';
import { UtensilInput } from './utensilInput';

export function RecipeForm() {
  const [steps, setSteps] = useState([]);
  const [utensils, setUtensils] = useState(['']);
  const [ingredients, setIngredients] = useState([]);
  const [recipe, setRecipe] = useState({
    title: '',
    picture: '',
    published: 0,
    subRecipes: [''],
    ingredients: [],
    utensils: [],
    instructions: [],
  });

  useEffect(() => {
    const fetchdata = async (ressource) => {
      let response = await fetch(`http://localhost:8080/${ressource}`);
      let data = await response.json();

      switch (ressource) {
        case 'ingredients':
          setIngredients(data);
          break;
        case 'utensils':
          setUtensils(data);
          break;
        default:
          break;
      }
    };

    fetchdata('ingredients');
    fetchdata('utensils');
  }, []);
  const handleSubmit = (e) => {
    e.preventDefault();
    // let { ...updatedRecipe } = recipe;
    // updatedRecipe.ingredients = ingredients;
    // updatedRecipe.utensils = utensils;

    // updatedRecipe.instructions = steps;

    // delete updatedRecipe.utensilsCount;
    // delete updatedRecipe.ingredientsCount;
    // console.log(updatedRecipe);
    // fetch(`http://localhost:8080/recipes/${id}/`, {
    //   method: 'PUT',
    //   headers: {
    //     'x-access-token': token,
    //     'Content-Type': 'application/json',
    //     'Access-Control-Allow-Origin': '*',
    //   },
    //   body: JSON.stringify({
    //     updatedRecipe,
    //   }),
    // }).then(console.log);
  };

  useEffect(() => {
    console.log(ingredients);
  }, [ingredients]);
  useEffect(() => {
    console.log(utensils);
  }, [utensils]);

  useEffect(() => {
    console.log(recipe);
  }, [recipe]);

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
    setRecipe((prevState) => ({
      ...prevState,
      ingredients: [
        ...prevState.ingredients,
        { order: prevState.ingredients.length + 1 },
      ],
    }));
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
    console.log('wesh');
    setRecipe((prevState) => ({
      ...prevState,
      utensils: [
        ...prevState.utensils,
        { order: prevState.utensils.length + 1 },
      ],
    }));
  };

  const addStep = (subrecipeId, order) => {
    setSteps((prevState) => [
      ...prevState,
      { subrecipeId, order: order + 1, instructions: '' },
    ]);
  };

  const deleteIngredient = (e, ingredientId, order) => {
    let { ingredients } = recipe;
    ingredients = ingredients.filter(
      (ingredient) => ingredient.order !== order
    );
    setRecipe((prevState) => ({
      ...prevState,
      ingredients,
    }));
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

  const handleChange = ({ target: { value, name } }) => {
    setRecipe((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
  return (
    <form onSubmit={handleSubmit} className="edit">
      <section className="edit__field-group">
        <h1 className="edit__title">
          <p className="edit__label">titre</p>
          <input
            type="text"
            value={recipe.title}
            name="title"
            onChange={handleChange}
          />
        </h1>

        {recipe.subRecipes.map((subrecipe) => (
          // Ajouter un element HTML pour pouvoir mettre une key
          <div key={subrecipe.id}>
            <article className="edit__field">
              <details className="ingredients__list">
                <summary className="edit__label">
                  Ingrédients {recipe.title}
                </summary>
                <ul>
                  {ingredients.length > 0 &&
                    recipe.ingredients.map((ingredient) => {
                      return (
                        <IngredientInput
                          key={ingredient.id}
                          {...ingredient}
                          recipe={true}
                          order={ingredient.order}
                          handleIngredientChange={handleIngredientChange}
                          deleteIngredient={deleteIngredient}
                        />
                      );
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
                    recipe.utensils.map((utensil) => {
                      return (
                        <UtensilInput
                          {...utensil}
                          handleUtensilChange={handleUtensilChange}
                          deleteIngredient={deleteUtensil}
                          key={utensil.id}
                        />
                      );
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
      </section>
    </form>
  );
}
