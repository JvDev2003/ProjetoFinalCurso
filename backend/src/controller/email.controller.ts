import { EmailModel } from "../models/Email.model";
import { UsuarioSchema } from "../models/Usuario.model";

type Confirmacao = {
    email: string; 
    isRead: boolean;
};

export async function createEmail (documento: string, emails: [string]) {
    try {

        const inserts = emails.map((email) => ({
            email,
            isRead: false,
        }));

        const view = await EmailModel.create({documento, emails: inserts})

    } catch (e: any) {
        Logger.error(`Ocorreu um erro: ${e.message}`)
    }

}
