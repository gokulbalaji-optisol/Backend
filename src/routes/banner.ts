import { Router } from "express";
import BannerController from "../controllers/BannerController";

const router = Router();

router.get("/getAllBanner", BannerController.getAll);
router.post("/add", BannerController.add);
router.get("/get/:id", BannerController.getByID);
export default router;
