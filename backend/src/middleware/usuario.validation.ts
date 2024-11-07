import { body } from "express-validator";

export const createUsuarioValidation = () => {
    return [
        body("nome")
            .isString()
            .withMessage("O nome não pode ser vazio!"),
        body("email")
            .isEmail()
            .withMessage("O email não pode ser vazio!"),
        body("senha")
            .isString()
            .withMessage("A senha não pode ser vazia!"),
        body("permissoes")
            .isString()
            .withMessage("A permisssão deve ser uma String")
    ]
}

export const editUsuarioValidation = () => {
    return [
        body("body.nome")
            .isString()
            .withMessage("O nome não pode ser vazio!"),
        body("body.email")
            .isEmail()
            .withMessage("O email não pode ser vazio!"),
        body("body.senha")
            .isEmpty()
            .withMessage("A senha não pode ser altera por aqui!"),
        body("body.uuid")
            .isEmpty()
            .withMessage("O UUID não deve ser iniciado agora"),
        body("body.permissoes")
            .isEmpty()
            .withMessage("Só um administrador pode alterar suas permissões"),
    ]
}

export const updateUsuarioValidation = () => {
    return [
        body("body.nome")
            .isString()
            .withMessage("O nome não pode ser vazio!"),
        body("body.email")
            .isEmail()
            .withMessage("O email não pode ser vazio!"),
        body("body.senha")
            .isString()
            .withMessage("A senha não pode ser vazia!"),
        body("body.uuid")
            .isEmpty()
            .withMessage("O UUID não deve ser iniciado agora"),
        body("permissoes")
            .isString()
            .withMessage("A permisssão deve ser uma String")
    ]
}