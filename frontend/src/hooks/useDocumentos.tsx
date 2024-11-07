import { useState, useEffect} from 'react';
import axios from 'axios';

const apiUrl = import.meta.env.VITE_URL;

const useDocumentos = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [cancelled, setCancelled] = useState(false)

    function checkIfIsCancelled() {
        if (cancelled) {
            return;
        }
    }

    const getDocumentos = async () => {
        checkIfIsCancelled()
        setLoading(true);
        setError(null);

        const id = sessionStorage.getItem("id")

        try {
            const response = await axios.get(`${apiUrl}/documento`,
                {
                params: { id },
                headers: {
                    Authorization: `Bearer ${sessionStorage.getItem("token")}`,
                },
            });
            const dados = response.data;
            return dados;
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

    return { getDocumentos, loading, error };
};

export default useDocumentos;
