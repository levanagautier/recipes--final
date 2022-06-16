const models = require('../models');
const subrecipe = require('../models/subrecipe');

const getAllSubRecipes = async (req, res) => {
  try {
    const SubRecipes = await models.SubRecipes.findAll({});
    res.send(SubRecipes);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

const getSubRecipe = async (req, res) => {
  try {
    const SubRecipe = await models.SubRecipes.findOne({
      where: { id: req.params.id },
      include: { all: true },
    });
    res.send({ SubRecipe });
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

const insertSubRecipe = async (req, res) => {
  try {
    const newSubRecipe = await models.SubRecipes.insert(req.body);
    res.json(newSubRecipe);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

const updateSubRecipe = async (req, res) => {
  try {
    let id = Number(req.params.id);
    if (isNaN(id)) res.status(400).json('id mal formaté');
    await models.SubRecipes.update(req.body, { where: { id: req.params.id } });
    res.status(200).json({ message: 'Resource has been updated' });
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

const deleteSubRecipe = async (req, res) => {
  try {
    await models.SubRecipes.destroy({ where: { id: req.params.id } });
    res.status(200).json({ message: 'SubRecipe has been deleted.' });
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

module.exports = {
  getAllSubRecipes,
  getSubRecipe,
  insertSubRecipe,
  updateSubRecipe,
  deleteSubRecipe,
};
