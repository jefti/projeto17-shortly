import { urlSchema } from "../schemas/url.schema.js";

export function validateURL(req, res,next){
    const validate = urlSchema.validate(req.body, {abortEarly: false});
    if(validate.error){
        const errors = validate.error.details.map((detail)=>detail.message);
        return res.status(422).send(errors);
    }
    next();
}