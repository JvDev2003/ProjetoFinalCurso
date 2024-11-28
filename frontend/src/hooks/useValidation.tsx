import { useState, useEffect} from 'react';
import axios from 'axios';

const apiUrl = import.meta.env.VITE_URL;

const useValidation = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [cancelled, setCancelled] = useState(false)

    function checkIfIsCancelled() {
        if (cancelled) {
            return;
        }
    }

    const validation = async (documento: string, token: string) => {
        checkIfIsCancelled()
        setLoading(true);
        setError(null);

        try {
            const response = await axios.post(`${apiUrl}/verifyEmailToken`, {
                documento,
                token
            });
            const {valido} = response.data;
            
            if(valido){
                sessionStorage.setItem("token", token);
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

    return { validation, loading, error };
};

export default useValidation;
