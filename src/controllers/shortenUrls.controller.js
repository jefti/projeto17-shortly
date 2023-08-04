import { db } from "../database/database.js";
import { nanoid } from "nanoid";

export async function registerUrl(req,res){
    try{
        const{id} = res.locals.user;
        const {url} = req.body;
        const uniqueId = nanoid();
        const insert = await db.query(`INSERT INTO urls ("userId", url, "shorterUrl") VALUES ($1,$2,$3) RETURNING id;`, [id, url,uniqueId]);
        if(insert.rowCount === 1){
            const id_url = insert.rows[0].id;
            return res.send({id: id_url, shortUrl:uniqueId});
        } else{
            return res.sendStatus(500);
        }
    }catch(err){
        return res.status(500).send(err.message);
    }
}