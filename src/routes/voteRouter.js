import { Router } from "express";

import { postVotes } from "./../controllers/voteController.js";
import { getResult } from "./../controllers/voteController.js";

const voteRouter = Router();

voteRouter.post("/choice/:id/vote", postVotes);
voteRouter.get("/poll/:id/result", getResult);

export default voteRouter;