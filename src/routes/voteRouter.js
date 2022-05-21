import { Router } from "express";

import { postVotes } from "./../controllers/voteController.js";
import { getResult } from "./../controllers/voteController.js";
import { voteValidation } from "../middlewares/voteValidation.js";

const voteRouter = Router();

voteRouter.post("/choice/:id/vote", voteValidation, postVotes);
voteRouter.get("/poll/:id/result", getResult);

export default voteRouter;