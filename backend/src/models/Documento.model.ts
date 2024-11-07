import {model, Schema} from "mongoose";

const documentoSchema = new Schema(
    {
        aluno: {type: String},
        emails: {type: [String]},
        documento: {type: String},
    },
    {
        timestamps: true
    }
)

export const DocumentoSchema = model("documento", documentoSchema);