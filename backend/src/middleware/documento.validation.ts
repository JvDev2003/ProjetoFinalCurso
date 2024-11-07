import { body } from "express-validator";

export const createDocumentoValidation = () => {
    return [
        body("aluno")
            .not()
            .equals("undefined")
            .withMessage("O nome não pode ser vazio")
            .isString()
            .withMessage("O nome não pode ser vazio")
            .isLength({min: 3})
            .withMessage("O nome do arquivo deve ter pelo menos 3 caracteres"),
        body("emails")
            .not()
            .equals("undefined")
            .withMessage("O email não pode ser vazio")
            .isString()
            .withMessage("Deve existir pelo menos um email!")
            .custom((value) => {
                value.split(',').map((email: string) => {
                    if(/\@utfpr.com.br/.test(email)){
                        throw new Error("Existe algum email invalido!")
                    }
                })
                return true;
            }),
        body("documento")
            .custom((value, {req}) => {
                if(!req.file){
                    throw new Error("Não existe arquivo!")
                }
                return true;
            })
    ]
}