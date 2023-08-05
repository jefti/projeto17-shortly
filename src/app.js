import express from "express";
import cors from "cors";
import authorizationRouter from "./routes/authorization.router.js";
import shortenUrlRouter from "./routes/shortenUrl.router.js";
import infoAcessRouter from "./routes/infoAcess.router.js";
import dotenv from 'dotenv';

const app = express();
app.use(cors());
app.use(express.json());

app.use(authorizationRouter);
app.use(shortenUrlRouter);
app.use(infoAcessRouter);

dotenv.config();
app.post("/ping", (req,res)=>{res.send('ping')});

const port = process.env.PORT || 5000;
app.listen(port, ()=>{console.log(`Servidor rodando na porta ${port}`)});