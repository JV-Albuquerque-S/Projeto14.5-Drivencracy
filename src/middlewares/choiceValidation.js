import { ObjectId } from "mongodb";
import dayjs from "dayjs";

import db from "../db.js";

export function choiceValidation(req, res, next){
    const choice = req.body;
    if(!choice.title){
        res.sendStatus(422);
        return;
    }
    const findPoll = await db.collection("polls").findOne({_id: ObjectId(choice.poolId)});
    if(!findPoll){
        res.sendStatus(404);
        return;
    }
    const alreadyExist = await db.collection("choices").findOne({title: choice.title});
    if(alreadyExist){
        res.sendStatus(409);
        return;
    }
    const expireDate = dayjs(findPoll.expireAt);
    if(expireDate.diff(dayjs()) < 0){
        res.sendStatus(403);
        return;
    }
    next();
}