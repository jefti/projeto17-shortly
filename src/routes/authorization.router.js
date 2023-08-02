import { Router } from "express";

const authorizationRouter = Router();
authorizationRouter.post('/signup');
authorizationRouter.post('/signin');
authorizationRouter.delete('/signout');