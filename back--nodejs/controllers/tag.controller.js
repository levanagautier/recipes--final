const models = require('../models');

const getAllTags = async (req, res) => {
  try {
    const Tags = await models.Tags.findAll({});
    res.send(Tags);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

const getTag = async (req, res) => {
  try {
    const Tag = await models.Tags.findByPk(req.params.id, {
      attributes: ['id', 'name'],
    });
    res.send(Tag);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

const insertTag = async (req, res) => {
  try {
    const newTag = await models.Tags.insert(req.body);
    res.json(newTag);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

const updateTag = async (req, res) => {
  try {
    let id = Number(req.params.id);
    if (isNaN(id)) res.status(400).json('id mal formaté');

    let tag = await models.Tags.findOne({ where: { id } });
    await tag.update(req.body);
    await tag.save();
    res.status(200).json({ message: 'Resource has been updated' });
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

const deleteTag = async (req, res) => {
  try {
    await models.Tags.destroy({ where: { id: req.params.id } });
    res.status(200).json({ message: 'Tag has been deleted.' });
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

module.exports = {
  getAllTags,
  getTag,
  insertTag,
  updateTag,
  deleteTag,
};
