import { Router } from "express";
import { validateBearerToken } from "../middlewares/bearerToken.Middleware.js";
import { getUserInformation, getRanking } from "../controllers/infoAcess.controller.js";

const infoAcessRouter = Router();
infoAcessRouter.get('/users/me',validateBearerToken,getUserInformation);
infoAcessRouter.get('/ranking',getRanking);

export default infoAcessRouter;