import { Router } from "express";
import { validateURL } from "../middlewares/urlValidation.Middleware.js";
import { validateBearerToken } from "../middlewares/bearerToken.Middleware.js";
import { registerUrl } from "../controllers/shortenUrls.controller.js";

const shortenUrlRouter = Router();
shortenUrlRouter.post('/urls/shorten',validateBearerToken, validateURL, registerUrl );

export default shortenUrlRouter;