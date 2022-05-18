import dotenv from "dotenv";
import dayjs from "dayjs";

import db from "./../db.js";

dotenv.config();

export async function postPolls(req, res){
    const poll = req.body;
    try{
        if(poll.title){
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
            //console.log(dayjs(poll.expireAt).format('YYYY/MM/DD hh:mm').toString());
        }
        else{
            res.sendStatus(422);
        }
    }
    catch(error){
        console.log(`Error => ${error}`); 
        res.sendStatus(500);  
    }
}