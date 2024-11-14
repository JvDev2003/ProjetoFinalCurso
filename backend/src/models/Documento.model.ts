import { model, Schema } from "mongoose";

// Definindo o esquema para o email
const emailSchema = new Schema({
  email: { type: String, required: true },
  hash: { type: String, required: true },
  isRead: { type: Boolean, default: false },
});

// Definindo o esquema do documento
const documentoSchema = new Schema(
  {
    aluno: { type: String, required: true },
    emails: { type: [emailSchema], required: true },
    documento: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

// Criando o modelo para o Documento
export const DocumentoSchema = model("documento", documentoSchema);
