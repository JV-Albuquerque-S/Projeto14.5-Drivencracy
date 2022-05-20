import dotenv from "dotenv";
import dayjs from "dayjs";

import { ObjectId } from "mongodb";

import db from "./../db.js";

dotenv.config();

export async function postChoices(req, res){
    const choice = req.body;
    try {
        if(choice.title){
            const findPoll = await db.collection("polls").findOne({_id: ObjectId(choice.poolId)});
            if(findPoll){
                const alreadyExist = await db.collection("choices").findOne({title: choice.title});
                if(!alreadyExist){
                    //const alreadyExpired = await db.collection("polls").findOne({});
                    const expireDate = dayjs(findPoll.expireAt);
                    if(expireDate.diff(dayjs()) > 0){
                        await db.collection("choices").insertOne({title: choice.title, poolId: choice.poolId});
                        //console.log(await db.collection("choices").find({}).toArray());
                        //console.log(choice.title);
                        //console.log(await db.collection("choices").findOne({title: choice.title}));
                        res.sendStatus(201);
                    }
                    else{
                        res.sendStatus(403);
                    }
                }
                else{
                    res.sendStatus(409);
                }
            }
            else{
                res.sendStatus(404);
            }
        }
        else{
            res.sendStatus(422);
        }
    }
    catch(error){
        console.log(`Error => ${error}`);
        res.sendStatus(404);
    }
}

export async function getChoices(req, res){
    const id = req.params.id;

    try{
        const choices = await db.collection("choices").find({poolId: id}).toArray();
        if(choices.length !== 0){
            console.log(choices)
            res.send(choices).status(200);
        }
        else{
            res.sendStatus(404);
        }
    }
    catch(error){
        console.log(error);
        res.sendStatus(500);
    }
}