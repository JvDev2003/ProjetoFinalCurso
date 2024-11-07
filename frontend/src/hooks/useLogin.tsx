import { useState, useEffect} from 'react';
import axios from 'axios';
const apiUrl = import.meta.env.VITE_URL;

const useLogin = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [cancelled, setCancelled] = useState(false)

    function checkIfIsCancelled() {
        if (cancelled) {
            return;
        }
    }

    const login = async (email: string, senha: string) => {
        checkIfIsCancelled()
        setLoading(true);
        setError(null);

        try {
            const response = await axios.post(`${apiUrl}/logar`, { email, senha });
            const {token, id, nome, permissao} = response.data;


            sessionStorage.setItem("token", token);
            sessionStorage.setItem("id", id);
            sessionStorage.setItem("permissao", permissao);
            sessionStorage.setItem("nome", nome);
            return response.data.msg;
        } catch (error: any) {
            setError(error.response?.data?.msg || error.message);
            console.log(`Error: ${error.response?.data?.msg || error.message}`);
            throw error; 
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        return () => setCancelled(true)
    }, [])

    return { login, loading, error };
};

export default useLogin;
