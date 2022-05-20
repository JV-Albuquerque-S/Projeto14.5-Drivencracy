import dotenv from "dotenv";
import dayjs from "dayjs";

import db from "./../db.js";

dotenv.config();

export async function postPolls(req, res){
    const poll = req.body;
    try{
        poll.expireAt !== "" ? 
            await db.collection("polls").insertOne({
                title: poll.title,
                expireAt: dayjs(poll.expireAt).format('YYYY/MM/DD hh:mm').toString()
            })
            :
            await db.collection("polls").insertOne({
                title: poll.title,
                expireAt: dayjs().add(30, "day").format('YYYY/MM/DD hh:mm').toString()
            })
        res.sendStatus(201);
    }
    catch(error){
        console.log(`Error => ${error}`); 
        res.sendStatus(500);  
    }
}

export async function getPolls(req, res){
    try {
        const polls = await db.collection("polls").find({}).toArray();
        res.send(polls).status(200);
    }
    catch(error){
        console.log(`Error => ${error}`);
        res.sendStatus(500);
    }
}