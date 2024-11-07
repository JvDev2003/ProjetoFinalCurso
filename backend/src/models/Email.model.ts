import { model, Schema } from "mongoose";

type Confirmacao = {
    email: string; 
    isRead: boolean;
};

const confirmacaoSchema = new Schema<Confirmacao>(
    {
        email: { type: String, required: true },
        isRead: { type: Boolean, default: false }
    },
    { _id: false } 
);

const emailSchema = new Schema(
    {
        documento: { type: String, required: true },
        emails: { type: [confirmacaoSchema], default: [] }, 
    },
    {
        timestamps: true
    }
);

export const EmailModel = model("Email", emailSchema); 
