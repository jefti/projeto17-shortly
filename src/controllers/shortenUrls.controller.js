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
            return res.status(201).send({id: id_url, shortUrl:uniqueId});
        } else{
            return res.sendStatus(500);
        }
    }catch(err){
        return res.status(500).send(err.message);
    }
}

export async function getUrlObjectbyId(req,res){
    try{
        const id = req.params.id;
        const search = await db.query('SELECT * FROM urls WHERE id = $1;',[id]);
        if(search.rowCount === 0 ) return res.sendStatus(404);
        const resp = {id,shortUrl:search.rows[0].shorterUrl,url:search.rows[0].url };
        return res.status(200).send(resp);
    }catch(err){
        return res.status(500).send(err.message);
    }
}

export async function acessUrlbyId(req,res){
    try{
        const shortUrl = req.params.shortUrl;
        const search = await db.query('SELECT * FROM urls WHERE "shorterUrl" = $1;',[shortUrl]);
        if(search.rowCount === 0 ) return res.sendStatus(404);
        const {id, url, visitCount} = search.rows[0];
        const views = Number(visitCount) + 1;
        await db.query(`UPDATE urls SET "visitCount" = $1 WHERE id = $2;`,[views,id]);
        return res.redirect(url);    
    }catch(err){
        return res.status(500).send(err.message);
    }
}

export async function deleteUrl(req,res){
    try{
        const user= res.locals.user;
        const id_url = req.params.id;
        const validate = await db.query(`SELECT * FROM urls WHERE id = $1`,[id_url]);
        if(validate.rowCount === 0) return res.sendStatus(404);
        if(validate.rows[0].userId !== user.id) return res.sendStatus(401);
        await db.query(`DELETE FROM urls WHERE id = $1`, [id_url]);
        return res.send(204);
    }catch(err){
        return res.status(500).send(err.message);
    }
}