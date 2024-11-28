import { Router, Request, Response, NextFunction } from "express";

// middleware
import { validate } from "./middleware/handle.validation";
import { createUsuarioValidation } from "./middleware/usuario.validation";
import { validateJWT } from "./middleware/jwt.validation";
import { createDocumentoValidation } from "./middleware/documento.validation";
import { fileUpload } from "../config/multer";

//controllers
import {
  createUsuario,
  getUsuario,
  getUsuarios,
  editUsuario,
  deleteUsuario,
  login,
} from "./controller/usuario.controller";
import {
  createDocumento,
  getDocumentos,
  deleteDocumento,
} from "./controller/documento.controller";
import { verifyEmailToken, confirmRead } from "./controller/email.controller";
import {
  createProfessor,
  deleteProfessor,
  editProfessor,
  getAllProfessor,
  getProfessor,
} from "./controller/professor.controller";

const router = Router();

router
  .get("/usuario", validateJWT, validate, getUsuarios)
  .get("/usuario/:id", validateJWT, validate, getUsuario)
  .put("/usuario/:id", validateJWT, validate, editUsuario)
  .delete("/usuario/:id", validateJWT, validate, deleteUsuario)
  .post(
    "/usuario",
    validateJWT,
    createUsuarioValidation(),
    validate,
    createUsuario
  )
  .post("/logar", login)

  //admin
  .post(
    "/documento",
    validateJWT,
    fileUpload.single("documento"),
    createDocumentoValidation(),
    validate,
    createDocumento
  )
  .get("/documento", validateJWT, validate, getDocumentos)
  .delete("/documento/:id", validateJWT, validate, deleteDocumento)

  //professores
  .get("/professor", validateJWT, validate, getAllProfessor)
  .get("/professor/:id", validateJWT, validate, getProfessor)
  .post("/professor", validateJWT, validate, createProfessor)
  .delete("/professor/:id", validateJWT, validate, deleteProfessor)
  .put("/professor/:id", validateJWT, validate, editProfessor)

  //Acesso documentos
  .post("/verifyEmailToken", verifyEmailToken)
  .post("/confirm", confirmRead);

export default router;
