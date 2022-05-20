import dotenv from "dotenv";
import dayjs from "dayjs";

import { ObjectId } from "mongodb";

import db from "./../db.js";

dotenv.config();

export async function postVotes(req, res){
    const id = req.params.id;

    try{
        const findChoice = await db.collection("choices").findOne({_id: ObjectId(id)});
        if(findChoice){
            const findPoll = await db.collection("polls").findOne({_id: ObjectId(findChoice.poolId)});
            const expireDate = dayjs(findPoll.expireAt);
            if(expireDate.diff(dayjs()) > 0){
                await db.collection("votes").insertOne({
                    createdAt: dayjs().format('YYYY/MM/DD hh:mm').toString(),
                    choiceId: ObjectId(id)
                });
                res.sendStatus(201);
            }
            else{
                res.sendStatus(403);
            }
        }
        else{
            res.sendStatus(404);
        }
    }
    catch(error){
        console.log(error);
        res.sendStatus(404);
    }
}

export async function getResult(req, res){
    const id = req.params.id;

    try{

    }
    catch(error){
        console.log(error);
        res.sendStatus(500);
    }
}