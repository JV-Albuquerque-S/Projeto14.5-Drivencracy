import { Router } from "express";

import { postVotes } from "./../controllers/voteController.js";
//import { getPolls } from "./../controllers/pollController.js";

const voteRouter = Router();

voteRouter.post("/choice/:id/vote", postVotes);
//pollRouter.get("/poll", getPolls);

export default voteRouter;