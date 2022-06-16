const express = require('express');
const appRouter = express.Router();
const controllers = require('../controllers');

appRouter.post('/login', controllers.login)
appRouter.post('/logout', controllers.logout)

module.exports = appRouter;