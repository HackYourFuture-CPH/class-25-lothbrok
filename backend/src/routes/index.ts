import express, { Router } from "express";
import auth from "./auth";
import dashboard from "./dashboard";

import { validateAuth } from "../helpers/auth";

const router: Router = express.Router();

router.use("/auth", auth);
router.use("/", validateAuth, dashboard);

export default router;
