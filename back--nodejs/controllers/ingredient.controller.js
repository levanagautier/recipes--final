const models = require('../models');
const { Op } = require('sequelize');

const getAllIngredients = async (req, res) => {
  try {
    const ingredients = await models.Ingredients.findAll({});
    res.send(ingredients);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

const getIngredient = async (req, res) => {
  try {
    const ingredient = await models.Ingredients.findByPk(req.params.id, {
      attributes: ['id', 'name'],
    });

    if (ingredient !== null) {
      res.send(ingredient);
      return;
    }

    res.status(400).json({ error: 'ingredient introuvable' });
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

const insertIngredient = async (req, res) => {
  try {
    const newIngredient = await models.Ingredients.create(req.body);
    res.json(newIngredient);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

const updateIngredient = async (req, res) => {
  try {
    let id = Number(req.params.id);
    if (isNaN(id)) {
      res.status(400).json('id mal formaté');
      return;
    }

    let ingredient = await models.Ingredients.findOne({ where: { id } });

    await ingredient.update(req.body);

    await ingredient.save();
    res.status(200).json({ message: 'Resource has been updated' });
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

const deleteIngredient = async (req, res) => {
  try {
    await models.Ingredients.destroy({ where: { id: req.params.id } });
    res.status(200).json({ message: 'Ingredient supprimé.' });
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

const getIngredientsByName = async (req, res) => {
  try {
    const ingredients = await models.Ingredients.findAll({
      where: {
        name: {
          [Op.startsWith]: req.params.ingredientName,
        },
      },
    });

    res.status(200).json({
      data: ingredients,
    });
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

module.exports = {
  getAllIngredients,
  getIngredient,
  insertIngredient,
  updateIngredient,
  deleteIngredient,
  getIngredientsByName,
};
