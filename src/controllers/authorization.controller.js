import { db } from "../database/database.js";
import bcrypt from "bcrypt";
import {v4 as uuid} from 'uuid';

export async function signUp(req,res){
    try{
        const {name, email, password} = req.body;
        const hashedPassword = bcrypt.hashSync(password,10);
        await db.query(`INSERT INTO users (name, email, password) VALUES ($1,$2,$3);`,[name,email,hashedPassword]);
       return res.status(201).send('cadastro realizado com sucesso!');
    }catch(err){
        if(err.code === '23505') return res.status(409).send('e-mail já cadastrado');
        return res.status(500).send(err.message);
    }
}

export async function signIn(req,res){
    try{
        const {email, password} = req.body;
        const user = (await db.query('SELECT * FROM users WHERE email = $1', [email])).rows[0];
        if(!user) return res.sendStatus(401);
        const compare = bcrypt.compareSync(password, user.password);
        if(!compare) return res.sendStatus(401);
        delete req.body.password;

        const token = uuid();
        await db.query('INSERT INTO sessions ("userId",token) VALUES ($1,$2)',[user.id,token])
        return res.send({token}).status(201);
    }catch(err){
        return res.status(500).send(err.message);
    }
}

export async function signOut(req,res){
    try{
        const user = res.locals.user;
        res.send(user);
    }catch(err){
        return res.status(500).send(err.message);
    }
}