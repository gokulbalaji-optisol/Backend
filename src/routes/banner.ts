import { Router } from "express";
import BannerController from "../controllers/BannerController";

const router = Router();

router.get("/getAllBanner" , BannerController.getAll);
router.post("/add",BannerController.add);

export default router;