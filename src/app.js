import express from "express";
import cors from "cors";
import authorizationRouter from "./routes/authorization.router.js";

const app = express();
app.use(cors());
app.use(express.json());

app.use(authorizationRouter);

const Port = 5000;
app.listen(Port, ()=>{console.log(`Servidor rodando na porta ${Port}`)});