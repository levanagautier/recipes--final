const jwt = require("jsonwebtoken");
require("dotenv").config();
const { SECRET_KEY } = process.env;

const { checkUserPassword, getUserByEmail } = require("./user.controller");
const models = require("../models");

const login = async (req, res, next) => {
  console.log(req.body);
  try {
    const { email, password } = req.body;
    const user = await models.Users.findOne({
      where: { email },
    });

    if (!user) {
      res.status(400).json({
        error:
          "Problème d'authentification : nous n'avons aucun utilisateur avec ce mot de passe ou cet email.",
      });

      return;
    }
    const passwordChecked = await checkUserPassword(password, user.password);
    if (passwordChecked) {
      req.session.token = jwt.sign({ userId: user.id }, SECRET_KEY, {
        expiresIn: "24h",
      });

      const token = req.session.token;

      res.status(200).json({ message: "Successful authentication", token });
    } else {
      res.status(403).json({ error: "Incorrect password" });
    }
  } catch (err) {
    throw err;
  }
};

const logout = async (req, res) => {
  req.session.destroy();
};

module.exports = {
  login,
  logout,
};
