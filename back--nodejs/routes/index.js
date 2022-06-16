const express = require("express");
const router = express.Router();

const apiRouter = require("./api.routes.js");
const appRouter = require("./app.routes.js");
const guardedApiRouter = require("./guarded.api.routes");

router.use((req, res, next) => {
  // res.locals.pseudo = req.session.pseudo;
  // res.locals.isAdmin = req.session.isAdmin
  next();
});

router.use("/", apiRouter);
router.put("*", guardedApiRouter);
router.post(
  ["/utensils", "/recipes", "/ingredients", "/tags", "/users"],
  guardedApiRouter
);
router.delete("*", guardedApiRouter);
router.use("/auth", appRouter);

module.exports = router;
