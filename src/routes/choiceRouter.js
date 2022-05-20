import { Router } from "express";

import { postChoices } from "./../controllers/choiceController.js";
import { getChoices } from "./../controllers/choiceController.js";
import { choiceValidation } from "../middlewares/choiceValidation.js";

const choiceRouter = Router();

choiceRouter.post("/choice",choiceValidation, postChoices);
choiceRouter.get("/poll/:id/choice", getChoices)

export default choiceRouter;