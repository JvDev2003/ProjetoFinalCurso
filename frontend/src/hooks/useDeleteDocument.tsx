import { useState, useEffect} from 'react';
import axios from 'axios';

const apiUrl = import.meta.env.VITE_URL;

const useDeleteDocument = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [cancelled, setCancelled] = useState(false)

    function checkIfIsCancelled() {
        if (cancelled) {
            return;
        }
    }

    const deleteDocumento = async (id: String) => {
        checkIfIsCancelled()
        setLoading(true);
        setError(null);

        try {
            const response = await axios.delete(`${apiUrl}/documento/${id}`, {
                headers: {
                    Authorization: `Bearer ${sessionStorage.getItem("token")}`,
                },
            });
            const dados = response.data;
            return dados.msg;
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

    return { deleteDocumento, loading, error };
};

export default useDeleteDocument;
