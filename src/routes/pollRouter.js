import { Router } from "express";

import { postPolls } from "./../controllers/pollController.js";
import { getPolls } from "./../controllers/pollController.js";

const pollRouter = Router();

pollRouter.post("/poll", postPolls);
pollRouter.get("/poll", getPolls);

export default pollRouter;