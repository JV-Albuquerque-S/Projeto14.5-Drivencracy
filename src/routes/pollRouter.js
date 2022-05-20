import { Router } from "express";

import { postPolls } from "./../controllers/pollController.js";
import { getPolls } from "./../controllers/pollController.js";
import { pollValidation } from "../middlewares/pollValidation.js";

const pollRouter = Router();

pollRouter.post("/poll", pollValidation, postPolls);
pollRouter.get("/poll", getPolls);

export default pollRouter;