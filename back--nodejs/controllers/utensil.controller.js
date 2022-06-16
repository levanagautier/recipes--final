const { Op } = require("sequelize");
const models = require("../models");

const getAllUtensils = async (req, res) => {
  try {
    const Utensils = await models.Utensils.findAll({});
    res.send(Utensils);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

const getUtensil = async (req, res) => {
  try {
    const Utensil = await models.Utensils.findByPk(req.params.id, {
      attributes: ["id", "name"],
    });
    res.send(Utensil);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

const insertUtensil = async (req, res) => {
  try {
    const newUtensil = await models.Utensils.create(req.body);
    res.json(newUtensil);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

const updateUtensil = async (req, res) => {
  try {
    let id = Number(req.params.id);
    if (isNaN(id)) res.status(400).json("id mal formaté");
    let utensil = await models.Utensils.findOne({ where: { id } });
    await utensil.update(req.body);
    await utensil.save();
    res.status(200).json({ message: "Resource has been updated" });
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

const deleteUtensil = async (req, res) => {
  try {
    await models.Utensils.destroy({ where: { id: req.params.id } });
    res.status(200).json({ message: "Utensil has been deleted." });
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

const getUtensilsByName = async (req, res) => {
  try {
    const utensils = await models.Utensils.findAll({
      where: {
        name: {
          [Op.startsWith]: req.params.utensilName,
        },
      },
    });

    res.status(200).json({
      data: utensils,
    });
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

module.exports = {
  getAllUtensils,
  getUtensil,
  insertUtensil,
  updateUtensil,
  deleteUtensil,
  getUtensilsByName,
};
