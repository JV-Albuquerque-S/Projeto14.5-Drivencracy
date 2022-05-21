import dotenv from "dotenv";
import dayjs from "dayjs";

import { ObjectId } from "mongodb";

import db from "./../db.js";

dotenv.config();

export async function postVotes(req, res){
    const id = req.params.id;

    try{
        await db.collection("votes").insertOne({
            createdAt: dayjs().format('YYYY/MM/DD hh:mm').toString(),
            choiceId: ObjectId(id)
        });
        res.sendStatus(201);
    }
    catch(error){
        console.log(error);
        res.sendStatus(404);
    }
}

export async function getResult(req, res){
    const id = req.params.id;

    try{
        let count = [];
        let winnerChoice;
        const poll = await db.collection("polls").findOne({_id: ObjectId(id)});
        const choices = await db.collection("choices").find({poolId: poll._id.toString()}).toArray();
        for(let i=0; i<choices.length; i++){
            let compare = await db.collection("votes").find({choiceId: choices[i]._id}).toArray();
            if(compare.length > count.length){
                count = compare;
                winnerChoice = choices[i];
            }
        }
        const winner = {
            _id: id,
            title: poll.title,
            expireAt: poll.expireAt,
            result: {
                title: winnerChoice.title,
                votes: count.length
            }
        }
        res.send(winner).status(200);
    }
    catch(error){
        console.log(error);
        res.sendStatus(500);
    }
}