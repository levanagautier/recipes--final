const bcrypt = require("bcrypt");
const models = require("../models");

const getAllUsers = async (req, res) => {
  try {
    console.log(models.Users);
    const Users = await models.Users.findAll({});
    res.send(Users);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

const getUser = async (req, res) => {
  try {
    const User = await models.Users.findByPk(req.params.id, {
      attributes: ["id", "name"],
    });
    res.send(User);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

const getUserByEmail = async (email) => {
  try {
    const User = await models.Users.findOne({
      where: {
        email: email,
      },
    });
    return User;
  } catch (error) {}
};

const insertUser = async (req, res) => {
  try {
    const { password } = req.body;
    const hash = bcrypt.hashSync(password, 5);
    const { ...user } = req.body;
    user.password = hash;
    const newUser = await models.Users.create(user);
    res.json(newUser);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

const updateUser = async (req, res) => {
  try {
    let id = Number(req.params.id);
    if (isNaN(id)) res.status(400).json("Ill-formatted ID");
    let user = await models.Users.findOne({ where: { id } });
    await user.update(req.body);
    await user.save();
    res.status(200).json({ message: "Resource has been updated" });
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

const deleteUser = async (req, res) => {
  try {
    await models.Users.destroy({ where: { id: req.params.id } });
    res.status(200).json({ message: "User has been deleted" });
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

const checkUserPassword = (reqPassword, userPassword) => {
  try {
    return bcrypt.compare(reqPassword, userPassword);
  } catch (error) {
    throw error;
  }
};

module.exports = {
  checkUserPassword,
  getAllUsers,
  getUser,
  getUserByEmail,
  insertUser,
  updateUser,
  deleteUser,
};
