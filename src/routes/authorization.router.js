import { Router } from "express";
import { loginValidate } from "../middlewares/loginValidation.Middleware.js";
import { RegisterValidation } from "../middlewares/registerValidation.Middleware.js";
import { signUp, signIn, signOut } from "../controllers/authorization.controller.js";

const authorizationRouter = Router();
authorizationRouter.post('/signup',RegisterValidation, signUp);
authorizationRouter.post('/signin',loginValidate);
authorizationRouter.delete('/signout');

export default authorizationRouter;