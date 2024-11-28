import { useState, useEffect} from 'react';
import axios from 'axios';

const apiUrl = import.meta.env.VITE_URL;

const useConfirm = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [cancelled, setCancelled] = useState(false)

    function checkIfIsCancelled() {
        if (cancelled) {
            return;
        }
    }

    const confirm = async (documento: string, token: string) => {
        checkIfIsCancelled()
        setLoading(true);
        setError(null);

        try {
            const response = await axios.post(`${apiUrl}/confirm`, {
                documento,
                token
            });

            if(response.status === 201){
                return true
            }

            return false
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

    return { confirm, loading, error };
};

export default useConfirm;
