import {Request, Response} from "express";

import { UsuarioSchema } from "../models/Usuario.model";
import { comparePassword, hashPassword } from "../../config/hashFunctions";
import config from "config";

import Logger from "../../config/logger";
import jwt from "jsonwebtoken";


export async function createUsuario (req: Request, res: Response) {
    try {
        const data = req.body;
        const {nome, email, senha, permissoes} = data
        const hashSenha = await hashPassword(senha)

        const usuarioData = {
            nome,
            email,
            senha: hashSenha,
            permissoes
        }

        UsuarioSchema.create(usuarioData)

        return res.status(201).json(usuarioData)
    } catch (e: any) {
        Logger.error(`Ocorreu um erro: ${e.message}`)
        return res.status(500).json({error: "Por favor, tente mais tarde!"})
    }
}

export async function getUsuario (req: Request, res: Response) {
    try {
        const id = req.params.id;
        const usuario = await UsuarioSchema.findById(id);
        if(!usuario){
            return res.status(404).json("Esse usuário não existe")
        }

        return res.status(201).json(usuario)

    } catch (e: any) {
        Logger.error(`Ocorreu um erro: ${e.message}`)
        return res.status(500).json({error: "Por favor, tente mais tarde!"})
    }
}

export async function editUsuario(req: Request, res: Response) {
    try {
        const id = req.params.id
        const {nome, email, senha, permissoes} = req.body.body
        const usuario = await UsuarioSchema.findById(id)

        if(!usuario){
           return res.status(404).json({error: "Esse usuário não existe!"}) 
        }

        const hashSenha = await hashPassword(senha)

        const newUser = {
            nome: nome,
            email: email,
            senha: hashSenha,
            permissoes: permissoes
        }

        await UsuarioSchema.updateOne({_id: id}, newUser)

        return res.status(201).json(newUser)
    } catch (e: any) {
        Logger.error(`Ocorreu um erro: ${e.message}`)
        return res.status(500).json({error: "Por favor, tente mais tarde!"})
    }
}

export async function deleteUsuario(req: Request, res: Response) {
    try {
        const id = req.params.id
        const usuario = UsuarioSchema.findById(id)

        if(!usuario){
           return res.status(404).json({error: "Esse usuário não existe!"}) 
        }

        await usuario.deleteOne()

        return res.status(201).json({msg: "Usuario deletado com sucesso!"})
    } catch (e: any) {
        Logger.error(`Ocorreu um erro: ${e.message}`)
        return res.status(500).json({error: "Por favor, tente mais tarde!"})
    }
}

export async function login(req: Request, res: Response) {
    try {
        const data = req.body
        const {email, senha} = data
        const usuario = await UsuarioSchema.findOne({email: email})
        
        if(!usuario){
            return res.status(401).json({msg: "Usuário e/ou senha incorretos!"})
        }
        //console.log(usuario)
        
        const jwtSecret = config.get<string>("jwtSecret")

        const hash = usuario.senha!

        const logar = await comparePassword(senha, hash)

        if(logar){
            const token = jwt.sign({ 
                id: usuario._id,
                permissao: usuario.permissoes!,
                nome: usuario.nome!,
            }, jwtSecret, { expiresIn: '4h' })
            return res.status(201).json({
                msg: "Login realizado com sucesso!", 
                token,
                id: usuario._id,
                permissao: usuario.permissoes!,
                nome: usuario.nome!,
            })
        }else{
            return res.status(401).json({msg: "Usuário e/ou senha incorretos!"})
        }

    } catch (e: any) {
        Logger.error(`Ocorreu um erro: ${e.message}`)
        return res.status(500).json({error: "Por favor, tente mais tarde!"})
    }
}

export async function logout(req: Request, res: Response) {
    try {
        const data = req.body
        const {uuid} = data
        const usuario = UsuarioSchema.findOne({uuid: uuid})

        if(!usuario){
            return res.status(404).json({error:"Essa sessão não existe"})
        }

        await UsuarioSchema.updateOne({uuid: uuid}, {uuid: null})

        return res.status(201).json({msg: "Usuário deslogado!"})

    } catch (e: any) {
        Logger.error(`Ocorreu um erro: ${e.message}`)
        return res.status(500).json({error: "Por favor, tente mais tarde!"})
    }
}