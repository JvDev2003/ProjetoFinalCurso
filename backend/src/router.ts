import {Router, Request, Response, NextFunction} from "express"

// middleware
import { validate } from "./middleware/handle.validation";
import { createUsuarioValidation } from "./middleware/usuario.validation";
import { validateJWT } from "./middleware/jwt.validation";
import { createDocumentoValidation } from "./middleware/documento.validation";
import { fileUpload } from "../config/multer";

//controllers
import { createUsuario, getUsuario, login } from "./controller/usuario.controller";
import { createDocumento, getDocumentos, deleteDocumento} from "./controller/documento.controller";

const router = Router();

router.get("/test", (req: Request, res: Response) => {
    res.status(200).send("API Working");
})
.get("/usuario/:id", getUsuario)
.post("/usuario", createUsuarioValidation(), validate, createUsuario)
.post("/logar", login)

//professores
.post("/documento", validateJWT, fileUpload.single("documento"), createDocumentoValidation(), validate, createDocumento)
.get("/documento", validateJWT, validate, getDocumentos)
.delete("/documento/:id", validateJWT, validate, deleteDocumento)



export default router