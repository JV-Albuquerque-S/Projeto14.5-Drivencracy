import express, {json} from "express";
import cors from "cors";
import dotenv from "dotenv";

import pollRouter from "./routes/pollRouter.js";
import choiceRouter from "./routes/choiceRouter.js";

const app = express();
app.use(json());
app.use(cors());
dotenv.config();

app.use(pollRouter);
app.use(choiceRouter);

app.listen(process.env.PORT, () => {
    console.log(`Servidor de pé, porta ${process.env.PORT}`)
})