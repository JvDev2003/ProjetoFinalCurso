import { useState, useEffect} from 'react';
import axios from 'axios';

const apiUrl = import.meta.env.VITE_URL;

const useFormEnvio = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [cancelled, setCancelled] = useState(false)

    function checkIfIsCancelled() {
        if (cancelled) {
            return;
        }
    }

    const enviaFormEnvio = async (aluno: String, emails: String[], documento: File) => {
        checkIfIsCancelled()
        setLoading(true);
        setError(null);

        const stringEmails = JSON.stringify(emails)

        try {
            const response = await axios.post(`${apiUrl}/documento`,{aluno, emails: stringEmails, documento}, {
                headers: {
                    Authorization: `Bearer ${sessionStorage.getItem("token")}`,
                    'Content-Type': 'multipart/form-data', // Optional
                },
            });
            const data = response.data;
            return data.msg;
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

    return { enviaFormEnvio, loading, error };
};

export default useFormEnvio;
