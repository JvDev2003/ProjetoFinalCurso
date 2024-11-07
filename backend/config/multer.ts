import { randomUUID } from "crypto";
import multer from "multer";
import path from "path";
import Logger from "./logger";

const fileStorege = multer.diskStorage({
  destination(req, file, callback) {
    callback(
      null,
      "C:\\Users\\jvspl\\Desktop\\ProjetoFinalCurso\\frontend\\public\\documentos"
    );
  },
  filename(req, file, callback) {
    const uuid = randomUUID();
    callback(null, `${Date.now()}${uuid}${path.extname(file.originalname)}`);
  },
});

export const fileUpload = multer({
  storage: fileStorege,
  fileFilter(req, file, callback) {
    if (!file.originalname.match(/\.pdf$/)) {
      //upload only pdf
      return callback(new Error("Por favor envie apenas pdf."));
    }
    callback(null, true);
  },
});
