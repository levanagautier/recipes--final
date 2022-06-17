const models = require('../models');

const getAllRecipes = async (req, res) => {
  try {
    const Recipes = await models.Recipes.findAll({
      include: [
        {
          model: models.SubRecipes,
          as: 'SubRecipes',
          through: {
            attributes: [],
          },
          include: [
            {
              model: models.Ingredients,
              as: 'Ingredient',
              through: {
                attributes: ['subrecipeId', 'qty', 'unit', 'prepNotes'],
              },
            },
            {
              model: models.Utensils,
              as: 'Utensil',
              through: {
                attributes: ['subrecipeId'],
              },
            },
          ],
        },
      ],
    });
    res.send(Recipes);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

const getRecipe = async (req, res) => {
  /*

  ---------------- BEFORE -----------------------------------
   {
        "id": 1,
        "title": "Earl Grey Pound Cake",
        "date": "2022-06-14T13:15:32.000Z",
        "picture": "earl-grey-pound-cake.jpg",
        "published": 1,
        "createdAt": "2022-06-14T13:15:32.000Z",
        "updatedAt": "2022-06-17T08:53:55.000Z",
        "SubRecipes": [
            {
                "id": 2,
                "title": "White Pesto",
                "instructions": {
                    "1": "ca va le faire tkt",
                    "2": "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
                    "3": "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
                    "4": "Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum"
                },
                "createdAt": "2022-06-14T13:15:32.000Z",
                "updatedAt": "2022-06-16T20:58:26.000Z",
                "Ingredient": [
                    {
                        "id": 3,
                        "name": "ricotta",
                        "createdAt": "2022-06-14T13:15:32.000Z",
                        "updatedAt": "2022-06-14T13:15:32.000Z",
                        "subrecipes-ingredients": {
                            "subrecipeId": 2,
                            "qty": 250,
                            "unit": "g",
                            "prepNotes": "room temp"
                        }
                    }
                ],
                "Utensil": []
            }
        ]
    }



    --------------- AFTER ------------------------
    {
    "id": "1",
    "title": "Earl Grey Pound Cake",
    "date": "2022-06-14T13:15:32.000Z",
    "picture": "earl-grey-pound-cake.jpg",
    "published": 1,
    "subRecipes": [
        {
            "id": 2,
            "title": "White Pesto",
            "instructions": {
                "1": "ca va le faire tkt",
                "2": "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
                "3": "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
                "4": "Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum"
            }
        }
    ],
    "ingredients": [
        {
            "id": 3,
            "name": "ricotta",
            "qty": 250,
            "unit": "g",
            "prepNotes": "room temp",
            "subrecipeId": 2
        }
    ],
    "utensils": [],
    "utensilsCount": 9,
    "ingredientsCount": 4
}


  */
  const { id } = req.params;
  try {
    const Recipe = await models.Recipes.findOne({
      include: [
        {
          model: models.SubRecipes,
          as: 'SubRecipes',
          attributes: {
            exclude: ['createdAt', 'updatedAt'],
          },
          through: {
            attributes: [],
          },
          include: [
            {
              model: models.Ingredients,
              as: 'Ingredient',
              attributes: {
                exclude: ['createdAt', 'updatedAt'],
              },
              through: {
                attributes: ['subrecipeId', 'qty', 'unit', 'prepNotes'],
              },
            },
            {
              model: models.Utensils,
              as: 'Utensil',
              attributes: {
                exclude: ['createdAt', 'updatedAt'],
              },
              through: {
                attributes: ['subrecipeId'],
              },
            },
          ],
        },
      ],
      where: {
        id,
      },
    });

    let { title, date, picture, published } = Recipe;

    let [...subRecipes] = Recipe.SubRecipes;

    let ingredients = [];
    let utensils = [];
    let utensilsCount = await models.Utensils.count();
    let ingredientsCount = await models.Ingredients.count();

    Recipe.SubRecipes.forEach((subrecipe) => {
      subrecipe.Ingredient.forEach((ingredient) => {
        let { id, name } = ingredient;
        let { subrecipeId, qty, prepNotes, unit } =
          ingredient.dataValues['subrecipes-ingredients'].dataValues;
        ingredients.push({
          id,
          name,
          qty,
          unit,
          prepNotes,
          subrecipeId,
        });
      });
      subrecipe.Utensil.forEach((utensil) => {
        let { id, name } = utensil;
        let { subrecipeId } =
          utensil.dataValues['subrecipes-utensils'].dataValues;
        utensils.push({
          id,
          name,
          subrecipeId,
        });
      });
    });

    subRecipes.forEach((subrecipe) => {
      delete subrecipe.dataValues.Ingredient;
      delete subrecipe.dataValues.Utensil;
    });

    let response = {
      id,
      title,
      date,
      picture,
      published,
      subRecipes,
      ingredients,
      utensils,
      utensilsCount,
      ingredientsCount,
    };

    await res.send(response);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

const insertRecipe = async (req, res) => {
  let recipe = req.body.recipe;
  let { ingredients, utensils } = recipe;
  let instructions = {};
  recipe.instructions.forEach((instruction) => {
    instructions[instruction.order] = instruction.instructions;
  });

  recipe.date = new Date();
  try {
    const newRecipe = await models.Recipes.create(recipe);

    let subrecipe = {
      title: recipe.title,
      instructions,
      recipeId: newRecipe.id,
    };

    const newSubRecipe = await models.SubRecipes.create(subrecipe);

    ingredients.forEach(async (ingredient) => {
      let oldIngredient = await models.Ingredients.findOne({
        where: {
          name: ingredient.name,
        },
      });
    });
    res.json(newRecipe);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

const updateRecipe = async (req, res) => {
  try {
    let id = Number(req.params.id);
    if (isNaN(id)) {
      res.status(400).json('id mal formaté');
      return;
    }

    let recipe = await models.Recipes.findOne({ where: { id } });

    let {
      subRecipes,
      utensils,
      ingredients,
      title,
      picture,
      published,
      instructions,
    } = req.body.updatedRecipe;
    await recipe.update({ title, picture, published });
    await recipe.save();

    ingredients.forEach(async (ingredient) => {
      let oldIngredient = await models.Ingredients.findOne({
        where: { id: ingredient.id },
      });

      if (oldIngredient !== null) {
        await oldIngredient.update(ingredient);
        await oldIngredient.save();
      } else {
        let newIngredient = await models.Ingredients.build(ingredient);
      }
    });

    utensils.forEach(async (utensil) => {
      let oldUtensil = await models.Utensils.findOne({
        where: { id: utensil.id },
      });

      if (oldUtensil !== null) {
        await oldUtensil.update(utensil);
        await oldUtensil.save();
      } else {
        let newUtensil = await models.Utensils.build(utensil);
      }
    });

    subRecipes.forEach(async (subRecipe) => {
      let oldSubRecipe = await models.SubRecipes.findOne({
        where: { id: subRecipe.id },
      });

      req.body.updatedRecipe.instructions.forEach((element) => {
        if (+element.subRecipeId === +subRecipe.id) {
          subRecipe.instructions[element.order] = element.instructions;
        }
      });

      if (oldSubRecipe !== null) {
        await oldSubRecipe.update(subRecipe);
        await oldSubRecipe.save();
      } else {
        let newSubRecipe = await models.SubRecipes.insert(subRecipe);
      }
    });
    res.status(200).json({ message: 'Modification enregistrée.' });
  } catch (error) {
    res.status(400).json({ error });
  }
};

const deleteRecipe = async (req, res) => {
  try {
    await models.Recipes.destroy({ where: { id: req.params.id } });
    res.status(200).json({ message: 'Recette supprimée.' });
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

module.exports = {
  getAllRecipes,
  getRecipe,
  insertRecipe,
  updateRecipe,
  deleteRecipe,
};
