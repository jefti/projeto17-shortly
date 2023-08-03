import { registerSchema } from "../schemas/user.schema.js";

export function RegisterValidation (req, res, next){
    const validation = registerSchema.validate(req.body, {abortEarly: false});
    if(validation.error){
        const errors = validation.error.details.map((err)=>{err.message});
        return res.status(422).send(errors);
    }
    next();
}