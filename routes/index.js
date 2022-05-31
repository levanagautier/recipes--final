import express from "express";
const router = express.Router();
// import authRouter from "./auth.routes.js"
// import userRouter from "./user.routes.js"
// import appRouter from "./app.routes.js"
// import adminRouter from "./admin/admin.routes.js"
// import { authMiddleware, authAdminMiddleware } from "../middlewares/auth.middleware.js";


router.use((req, res, next) => {
  res.locals.pseudo = req.session.pseudo;
  res.locals.isAdmin = req.session.isAdmin
  next();
});
// router.use("/app", appRouter)
// router.use("/auth", authRouter);
// router.use("/user", authMiddleware, userRouter);
// router.use("/admin", authAdminMiddleware, adminRouter)



router.get("*", (req, res, next) => {
  res.render("main/layout", {
    template: "error",
    error: "404 — La page que vous avez demandé n'existe pas",
  });
  return;
});

export default router;