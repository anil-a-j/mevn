import express from "express";
const router = express.Router();
import { getProviders } from "../controllers/providerController.js";

router.route("/").get(getProviders);

export default router;
