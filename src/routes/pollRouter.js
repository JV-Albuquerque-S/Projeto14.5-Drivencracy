import { Router } from "express";

import { postPolls } from "./../controllers/pollController.js";

const pollRouter = Router();

pollRouter.post("/poll", postPolls);

export default pollRouter;