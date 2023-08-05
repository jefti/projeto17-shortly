import { db } from "../database/database.js";

export async function getUserInformation(req, res){
    try{
        const {id, name } = res.locals.user;
        const lst = await db.query(`SELECT id, url, "shorterUrl" AS "shortUrl", "visitCount" FROM urls WHERE "userId" = $1;`,[id]);
        let totalVisitas = 0;
        if(lst.rows.length!== 0){
            lst.rows.forEach((el)=>{totalVisitas+= el.visitCount});
        }
        res.status(200).send({id,name,visitCount:totalVisitas,shortenedUrls:lst.rows})
    }catch(err){
        return res.status(500).send(err.message);
    }
}

export async function getRanking(req,res){
    try{
        const ranking = await db.query(`
    SELECT 	users.id,
        users.name,
        count(urls.id) AS "linksCount",
        COALESCE(SUM(urls."visitCount"),0) AS "visitCount"
    FROM users
    LEFT JOIN urls on urls."userId" = users.id
    GROUP BY users.id
    ORDER BY "visitCount" DESC
    LIMIT 10;
    `);

        return res.status(200).send(ranking.rows);
    }catch(err){
        return res.status(500).send(err.message);
    }   
}