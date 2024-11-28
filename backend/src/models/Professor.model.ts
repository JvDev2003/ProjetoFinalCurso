import { model, Schema } from "mongoose";

const professoreSchema = new Schema(
  {
    nome: { type: String },
    email: { type: String },
  },
  {
    timestamps: true,
  }
);

export const ProfessorSchema = model("professores", professoreSchema);
