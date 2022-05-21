import { ObjectId } from "mongodb";
import dayjs from "dayjs";

import db from "../db.js";

export async function voteValidation(req, res, next){
    const id = req.params.id;

    try{
        const findChoice = await db.collection("choices").findOne({_id: ObjectId(id)});
        if(!findChoice){
            res.sendStatus(404);
            return;
        }
        const findPoll = await db.collection("polls").findOne({_id: ObjectId(findChoice.poolId)});
        const expireDate = dayjs(findPoll.expireAt);
        if(expireDate.diff(dayjs()) < 0){
            res.sendStatus(403);
            return;
        }
    }
    catch(error){
        res.sendStatus(404);
    }
    next();
}