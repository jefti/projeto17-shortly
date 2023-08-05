import express from "express";
import cors from "cors";
import authorizationRouter from "./routes/authorization.router.js";
import shortenUrlRouter from "./routes/shortenUrl.router.js";
import infoAcessRouter from "./routes/infoAcess.router.js";

const app = express();
app.use(cors());
app.use(express.json());

app.use(authorizationRouter);
app.use(shortenUrlRouter);
app.use(infoAcessRouter);
app.post("/ping", (req,res)=>{res.send('ping')});

const Port = 5000;
app.listen(Port, ()=>{console.log(`Servidor rodando na porta ${Port}`)});