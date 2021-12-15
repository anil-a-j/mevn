import express from "express";
const router = express.Router();
import {
  getClients,
  addNewClient,
  deleteClient,
  updateClient,
} from "../controllers/clientController.js";

router.route("/").get(getClients);
router.post("/add", addNewClient);
router.put("/update", updateClient);
router.route("/delete/:id").delete(deleteClient);

export default router;
