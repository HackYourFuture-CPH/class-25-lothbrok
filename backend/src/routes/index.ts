import express, { Router } from "express";
import auth from "./auth";
import dashboard from "./dashboard";
import userRoute from "./user";

import { validateAuth } from "../helpers/auth";

const router: Router = express.Router();

router.use("/auth", auth);
router.use("/dashboard", validateAuth, dashboard);
router.use("/user", userRoute);

export default router;
