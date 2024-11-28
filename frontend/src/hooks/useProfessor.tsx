import { useState, useEffect } from 'react';
import axios from 'axios';

const apiUrl = import.meta.env.VITE_URL;

const useProfessor = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [cancelled, setCancelled] = useState(false)

    function checkIfIsCancelled() {
        if (cancelled) {
            return;
        }
    }

    const getProfessor = async (id: string) => {
        checkIfIsCancelled()
        setLoading(true);
        setError(null);

        try {
            const response = await axios.get(`${apiUrl}/professor/${id}`,
                {
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

    const getProfessores = async () => {
        checkIfIsCancelled()
        setLoading(true);
        setError(null);

        try {
            const response = await axios.get(`${apiUrl}/professor`,
                {
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

    const createProfessor = async (nome: string, email: string) => {
        checkIfIsCancelled()
        setLoading(true);
        setError(null);

        try {
            const response = await axios.post(`${apiUrl}/professor/`,
                { nome, email },
                {
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

    const editProfessor = async (id: string, nome: string, email: string) => {
        checkIfIsCancelled()
        setLoading(true);
        setError(null);

        try {
            const response = await axios.put(`${apiUrl}/professor/${id}`,
                { nome, email },
                {
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

    const deleteProfessor = async (id: string) => {
        checkIfIsCancelled()
        setLoading(true);
        setError(null);

        try {
            const response = await axios.delete(`${apiUrl}/professor/${id}`,
                {
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

    return { getProfessores, getProfessor, createProfessor, editProfessor, deleteProfessor, loading, error };
};

export default useProfessor;
