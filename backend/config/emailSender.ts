import nodemailer from "nodemailer";
import config from "config";
import Logger from "./logger";
const user = config.get<string>("email");
const pass = config.get<string>("senha");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user,
    pass,
  },
});

export const sendEmail = (
  dest: string,
  aluno: string,
  arquivo: string,
  token: string
) => {
  transporter.sendMail(
    {
      from: user, // Endereço de quem envia
      to: "jvsplayer1227@gmail.com", // Endereço de quem recebe
      subject: "Documento Importante", // Assunto do e-mail
      html: `
                <html>
                    <h1>Documentação</h1>
                    <p>Aluno: ${aluno}</p>
                    <a href="http://localhost:5173/validation/${arquivo}/${token}">Acesse o documento aqui!</a>
                </html>
                `,
    },
    (error: any, info: any) => {
      if (error) {
        Logger.error("Erro ao enviar e-mail:", error);
      } else {
        Logger.info("E-mail enviado: " + info.response);
      }
    }
  );
};
