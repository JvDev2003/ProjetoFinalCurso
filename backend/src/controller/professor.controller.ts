import { Request, Response } from "express";
import { ProfessorSchema } from "../models/Professor.model";
import Logger from "../../config/logger";

export const getAllProfessor = async (req: Request, res: Response) => {
  try {
    const professores = await ProfessorSchema.find({});

    if (professores.length === 0) {
      return res.status(404).json({ msg: "Nenhum professor foi encontrado!" });
    }

    return res.status(201).json({ professores: professores });
  } catch (e: any) {
    Logger.error(`Ocorreu um erro: ${e.message}`);
    return res
      .status(500)
      .json({ msg: "Ocorreu um erro, tente novamente mais tarde" });
  }
};

export const getProfessor = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const professor = await ProfessorSchema.findById(id);

    if (!professor) {
      return res.status(404).json({ msg: "Esse professor não existe!" });
    }

    return res.status(201).json({ professor });
  } catch (e: any) {
    Logger.error(`Ocorreu um erro: ${e.message}`);
    return res
      .status(500)
      .json({ msg: "Ocorreu um erro, tente novamente mais tarde" });
  }
};

export const createProfessor = async (req: Request, res: Response) => {
  try {
    const { nome, email } = req.body;

    const professor = await ProfessorSchema.create({ nome, email });

    return res.status(201).json({ professor });
  } catch (e: any) {
    Logger.error(`Ocorreu um erro: ${e.message}`);
    return res
      .status(500)
      .json({ msg: "Ocorreu um erro, tente novamente mais tarde" });
  }
};

export const deleteProfessor = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const professor = await ProfessorSchema.findById(id);

    if (!professor) {
      return res.status(404).json({ msg: "Esse professor não existe" });
    }

    await professor.deleteOne();

    return res.status(201).json({ msg: "Professor deletado com sucesso!" });
  } catch (e: any) {
    Logger.error(`Ocorreu um erro: ${e.message}`);
    return res
      .status(500)
      .json({ msg: "Ocorreu um erro, tente novamente mais tarde" });
  }
};

export const editProfessor = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { nome, email } = req.body;

    const professor = await ProfessorSchema.findById(id);

    if (!professor) {
      return res.status(404).json({ msg: "Esse professor não existe!" });
    }

    await professor.updateOne({ nome, email });

    return res.status(201).json({ msg: "Professor editado com sucesso!" });
  } catch (e: any) {
    Logger.error(`Ocorreu um erro: ${e.message}`);
    return res
      .status(500)
      .json({ msg: "Ocorreu um erro, tente novamente mais tarde" });
  }
};
