import { db } from "../database/database.js";
import bcrypt from "bcrypt";

export async function signUp(req,res){
    try{
        const {name, email, password} = req.body;
        const hashedPassword = bcrypt.hashSync(password,10);
        try {
            await db.query(`INSERT INTO users (name, email, password) VALUES ($1,$2,$3);`,[name,email,hashedPassword]);
        }catch(err){
            return res.status(422).send(err.message);
        }
       return res.status(201).send('cadastro realizado com sucesso!');
    }catch(err){
        return res.status(500).send(err.message);
    }
}

export async function signIn(req,res){
    try{
        
    }catch(err){
        return res.status(500).send(err.message);
    }
}

export async function signOut(req,res){
    try{
        
    }catch(err){
        return res.status(500).send(err.message);
    }
}