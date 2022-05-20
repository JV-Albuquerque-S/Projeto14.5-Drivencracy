import dotenv from "dotenv";
import dayjs from "dayjs";

import { ObjectId } from "mongodb";

import db from "./../db.js";

dotenv.config();

export async function postChoices(req, res){
    const choice = req.body;
    try {
        await db.collection("choices").insertOne({title: choice.title, poolId: choice.poolId});
        res.sendStatus(201);
    }

    catch(error){
        console.log(error);
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