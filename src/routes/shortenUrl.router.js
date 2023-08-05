import { Router } from "express";
import { validateURL } from "../middlewares/urlValidation.Middleware.js";
import { validateBearerToken } from "../middlewares/bearerToken.Middleware.js";
import { registerUrl,getUrlObjectbyId,acessUrlbyId, deleteUrl } from "../controllers/shortenUrls.controller.js";

const shortenUrlRouter = Router();
shortenUrlRouter.post('/urls/shorten',validateBearerToken, validateURL, registerUrl );
shortenUrlRouter.get("/urls/:id",getUrlObjectbyId);
shortenUrlRouter.get("/urls/open/:shortUrl",acessUrlbyId);
shortenUrlRouter.delete("/urls/:id",validateBearerToken,deleteUrl);


export default shortenUrlRouter;