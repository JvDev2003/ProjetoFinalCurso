import {model, Schema} from "mongoose";

const usuarioSchema = new Schema(
    {
        nome: {type: String},
        email: {type: String},
        senha: {type: String},
        permissoes: {type: String}
    },
    {
        timestamps: true
    }
)

export const UsuarioSchema = model("usuario", usuarioSchema);