import { db } from "../database/database.js";

export async function validateBearerToken(req, res,next){
    try{
        const {authorization} = req.headers;
        const token = authorization?.replace("Bearer ","");
        if(!token) return res.status(401).send('Token necessário.');
        const request = await db.query(`SELECT s.id AS "idSessao", s."createData" AS "dataSessao", u.* from sessions AS s JOIN users u ON u.id = s."userId" WHERE token = $1;`, [token]);
        const user = request.rows[0];
        if(!user) return res.status(404).send('Usuario não encontrado.');
        delete user.password;
        const {password, ...userSempassword} = user;
        res.locals.user= userSempassword;
        next();
    }catch(err){
        res.send(err.message).status(500);
    }

}