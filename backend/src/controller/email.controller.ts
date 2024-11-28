import { Request, Response } from "express";
import { sendEmail } from "../../config/emailSender";
import config from "config";
import jwt from "jsonwebtoken";
import Logger from "../../config/logger";
import { DocumentoSchema } from "../models/Documento.model";

export const sendAndReturnListFormatEmail = (
  emails: string[],
  aluno: string,
  documento: string
) => {
  const jwtSecret = config.get<string>("tokenSecret");

  return emails.map((email: string) => {
    const token = jwt.sign(
      {
        email,
      },
      jwtSecret,
      { expiresIn: "7d" }
    );

    sendEmail(email, aluno, documento, token);
    return {
      email,
      token,
      isRead: false,
    };
  });
};

export const verifyEmailToken = async (req: Request, res: Response) => {
  try {
    const { token, documento } = req.body;
    const secret = config.get<String>("tokenSecret");

    //@ts-ignore
    if (!jwt.verify(token, secret)) {
      return res.status(401).json({ msg: "Token invalido" });
    }

    const doc = await DocumentoSchema.findOne({ documento: documento });

    if (!doc) {
      return res.status(404).json({ msg: "Arquivo não encontrado" });
    }

    const email = doc.emails.filter((email) => {
      if (email.token === token) {
        return true;
      }
      return false;
    });

    if (email.length !== 1) {
      return res
        .status(401)
        .json({ msg: "Você não tem permissão para acessar esse documento" });
    }

    return res.status(201).json({ valido: true });
  } catch (e: any) {
    Logger.error(e);
    return false;
  }
};

export const confirmRead = async (req: Request, res: Response) => {
  try {
    const { token, documento } = req.body;
    const secret = config.get<String>("tokenSecret");
    //@ts-ignore
    if (!jwt.verify(token, secret)) {
      return res.status(401).json({ msg: "Token invalido" });
    }

    let doc = await DocumentoSchema.findOne({ documento: documento });

    if (!doc) {
      return res.status(404).json({ msg: "Arquivo não encontrado" });
    }

    const email = doc.emails.filter((email) => {
      if (email.token === token) {
        return true;
      }
      return false;
    });

    if (email.length !== 1) {
      return res.status(401).json({ msg: "Você não tem permissão!" });
    }

    const newEmail = doc.emails.map((emailUser) => {
      let { email, token, isRead } = emailUser;
      if (isRead) {
        return emailUser;
      }

      return {
        email,
        token,
        isRead: !isRead,
      };
    });

    //@ts-ignore
    doc.emails = newEmail;

    await DocumentoSchema.updateOne({ documento: documento }, doc);

    return res.status(201).json({ msg: "Confirmado" });
  } catch (e: any) {
    Logger.error(e);
    return res
      .status(500)
      .json({ msg: "Ocorreu um erro, tente novamente mais tarde" });
  }
};
