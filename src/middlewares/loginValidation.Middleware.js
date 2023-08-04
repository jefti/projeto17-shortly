import { loginSchema } from "../schemas/login.schema.js";

export function loginValidate(req,res,next){
    const validate = loginSchema.validate(req.body,{abortEarly: false});
    if(validate.error){
        const errors = validate.error.details.map((err)=>err.message);
        return res.status(422).send(errors);
    }
    next();
}