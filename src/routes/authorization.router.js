import { Router } from "express";
import { loginValidate } from "../middlewares/loginValidation.Middleware.js";
import { RegisterValidation } from "../middlewares/registerValidation.Middleware.js";
import { signUp, signIn, signOut } from "../controllers/authorization.controller.js";
import { validateBearerToken } from "../middlewares/bearerToken.Middleware.js";

const authorizationRouter = Router();
authorizationRouter.post('/signup',RegisterValidation, signUp);
authorizationRouter.post('/signin',loginValidate, signIn);
authorizationRouter.delete('/signout',validateBearerToken, signOut );

export default authorizationRouter;