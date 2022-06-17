import React, { useState, useEffect } from 'react';
import { IngredientInput } from './ingredientInput';
import { UtensilInput } from './utensilInput';
import { useSelector } from 'react-redux';

export function RecipeForm() {
  const token =
    useSelector((state) => state.token) || localStorage.getItem('token');
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
    recipe.instructions = steps;
    console.log(steps);
    fetch(`http://localhost:8080/recipes`, {
      method: 'POST',
      headers: {
        'x-access-token': token,
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
      body: JSON.stringify({
        recipe,
      }),
    })
      .then((response) => response.json())
      .then(console.log);
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
    ingredientId,
    ingredientOrder
  ) => {
    setRecipe((prevState) => ({
      ...prevState,
      ingredients: prevState.ingredients.map((ingredient) => {
        if (+ingredient.order === +ingredientOrder) {
          return {
            ...ingredient,
            [name]: value,
          };
        }
        return ingredient;
      }),
    }));
  };

  const addIngredient = (subrecipeId) => {
    setRecipe((prevState) => ({
      ...prevState,
      ingredients: [
        ...prevState.ingredients,
        {
          order: prevState.ingredients.length + 1,
          name: '',
          qty: '',
          unit: '',
          prepNotes: '',
        },
      ],
    }));
  };

  const addUtensil = (subrecipeId) => {
    setRecipe((prevState) => ({
      ...prevState,
      utensils: [
        ...prevState.utensils,
        { order: prevState.utensils.length + 1, name: '' },
      ],
    }));
  };
  const handleUtensilChange = (
    { target: { name, value } },
    utensilId,
    utensilOrder
  ) => {
    setRecipe((prevState) => ({
      ...prevState,
      utensils: [
        ...prevState.utensils.map((utensil) => {
          if (+utensil.order === +utensilOrder) {
            return {
              ...utensil,
              name: value,
            };
          }
          return utensil;
        }),
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
      (ingredient) => +ingredient.order !== +order
    );
    setRecipe((prevState) => ({
      ...prevState,
      ingredients,
    }));
  };

  const deleteUtensil = (e, utensilId, order) => {
    let { utensils } = recipe;
    utensils = utensils.filter((utensil) => +utensil.order !== +order);
    setRecipe((prevState) => ({
      ...prevState,
      utensils,
    }));
  };

  const handleStepChange = (e, stepIndex) => {
    setSteps((prevState) => {
      return prevState.map((step) => {
        console.log(stepIndex, step.order);
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
                          deleteUtensil={deleteUtensil}
                          order={utensil.order}
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
