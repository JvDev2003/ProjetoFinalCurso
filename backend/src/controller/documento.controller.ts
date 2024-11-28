import { Request, Response } from "express";
import { DocumentoSchema } from "../models/Documento.model";
import fs from "fs";
import Logger from "../../config/logger";
import { UsuarioSchema } from "../models/Usuario.model";
import { sendAndReturnListFormatEmail } from "./email.controller";

const deleteFile = (filePath: string) => {
  fs.unlink(filePath, (err) => {
    if (err) {
      Logger.error("Error deleting file:", err);
      return;
    }
    Logger.info("File deleted successfully");
  });
};

export async function createDocumento(req: Request, res: Response) {
  try {
    const data = req.body;
    const { aluno, emails } = data;
    const documento = req.file?.filename;
    const arrayEmails: string[] = JSON.parse(emails);

    const formatEmail = sendAndReturnListFormatEmail(
      arrayEmails,
      aluno,
      documento!
    );

    const documentoData = {
      aluno,
      emails: formatEmail,
      documento,
    };

    await DocumentoSchema.create(documentoData);

    return res.status(201).json(documentoData);
  } catch (e: any) {
    Logger.error(`Ocorreu um erro: ${e.message}`);
    return res.status(500).json({ error: "Por favor, tente mais tarde!" });
  }
}

export async function getDocumentos(req: Request, res: Response) {
  try {
    //recebe o id do usuario atual
    const id = req.query.id;

    //recebe o usuario atual
    const usuario = await UsuarioSchema.findById(id);

    let todos = null;

    // a partir do nivel de permissão do usuario realiza uma determinada query
    if (usuario?.permissoes === "admin") {
      // caso admin busca todos os documentos
      todos = await DocumentoSchema.find({});
    } else {
      // caso user busca somente os documentos correlatos a ele
      todos = await DocumentoSchema.find({
        emails: { $in: [usuario?.email] },
      });
    }

    if (!todos) {
      return res.status(404).json({ msg: "Não existem documentos!" });
    }

    return res.status(201).json(todos);
  } catch (e: any) {
    Logger.error(`Ocorreu um erro: ${e.message}`);
    return res.status(500).json({ error: "Por favor, tente mais tarde!" });
  }
}

export async function deleteDocumento(req: Request, res: Response) {
  try {
    const { id } = req.params;
    const documento = await DocumentoSchema.findById({ _id: id });

    if (!documento) {
      return res.status(404).json({ msg: "Esse documento não existe" });
    }

    deleteFile(
      `C:\\Users\\jvspl\\Desktop\\ProjetoFinalCurso\\frontend\\public\\documentos\\${documento.documento}`
    );

    await DocumentoSchema.deleteOne({ _id: id });

    return res.status(201).json({ msg: "Documento excluido com sucesso!" });
  } catch (e: any) {
    Logger.error(`Ocorreu um erro: ${e.message}`);
    return res.status(500).json({ error: "Por favor, tente mais tarde!" });
  }
}
