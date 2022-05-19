import { Router } from "express";

import { postChoices } from "./../controllers/choiceController.js";

const choiceRouter = Router();

choiceRouter.post("/choice", postChoices);

export default choiceRouter;