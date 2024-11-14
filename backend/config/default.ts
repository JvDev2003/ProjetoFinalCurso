import dotenv from "dotenv";
dotenv.config();

const env = process.env.ENV;
const port = process.env.PORT;
const salt = process.env.SALT;
const dburl = process.env.DBURL;
const jwtSecret = process.env.JWT_SECRET;
const allowedUrl = process.env.ALLOWED_URL;
const email = process.env.EMAIL;
const senha = process.env.SENHA;

export default {
  port,
  env,
  salt: Number(salt),
  dbUri: dburl,
  jwtSecret,
  allowedUrl,
  email,
  senha,
};
