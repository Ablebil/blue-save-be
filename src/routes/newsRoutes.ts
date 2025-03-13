import { Router } from "express";
import { getAllNews, getNewsById } from "../controllers/newsController";
import {
  getAllNewsValidator,
  getNewsValidator,
} from "../validators/newsValidator";
import { validationResultHandler } from "../middlewares/validationResultHandler";

const router = Router();

router.get("/", getAllNewsValidator, validationResultHandler, getAllNews);

router.get("/:id", getNewsValidator, validationResultHandler, getNewsById);

export default router;
