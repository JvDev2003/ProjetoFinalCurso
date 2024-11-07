//.env
require("dotenv").config()

//express
import express from "express";
import config from "config";

//CORS
import cors from 'cors';

//BD
import db from "../config/db"

//Logger
import Logger from "../config/logger";

const app = express()
const allowedUrl = config.get<String>("allowedUrl")

//CORS middleware
app.use(cors({
    origin: `${allowedUrl}`, // Allow requests from this origin
    methods: ['GET', 'POST', 'DELETE', 'UPDATE', 'PATCH'], // Allow these methods
    credentials: true // Allow credentials (if needed)
}));


//JSON and FormData middleWare
app.use(express.json())

app.use(express.urlencoded({extended: false}))

// router
import router from "./router";
app.use("/api/", router)


//middlewares
import morganMiddleware from "./middleware/morgan.middleware";
app.use(morganMiddleware)

const port = config.get<String>("port")


app.listen(port, async() => {
    await db();

    Logger.info(`O servidor está na porta ${port}`)
})