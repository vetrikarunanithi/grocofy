import express from "express";
import authMiddleware from "../middleware/auth.js";
import { getProfile, updateProfile, addAddress, deleteAddress } from "../controllers/profileController.js";

const profileRouter = express.Router();

profileRouter.post("/get", authMiddleware, getProfile);
profileRouter.put("/update", authMiddleware, updateProfile);
profileRouter.post("/address", authMiddleware, addAddress);
profileRouter.delete("/address/:index", authMiddleware, deleteAddress);

export default profileRouter;
