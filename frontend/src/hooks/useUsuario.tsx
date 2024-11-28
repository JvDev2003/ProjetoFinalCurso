import { useState, useEffect } from 'react';
import axios from 'axios';

const apiUrl = import.meta.env.VITE_URL;

const useUsuario = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [cancelled, setCancelled] = useState(false)

    function checkIfIsCancelled() {
        if (cancelled) {
            return;
        }
    }

    const getUsuario = async (id: string) => {
        checkIfIsCancelled()
        setLoading(true);
        setError(null);

        try {
            const response = await axios.get(`${apiUrl}/usuario/${id}`,
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

    const getUsuarios = async () => {
        checkIfIsCancelled()
        setLoading(true);
        setError(null);

        try {
            const response = await axios.get(`${apiUrl}/usuario`,
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

    const createUsuario = async (nome: string, email: string, senha: string, permissoes: string) => {
        checkIfIsCancelled()
        setLoading(true);
        setError(null);

        try {
            const response = await axios.post(`${apiUrl}/usuario`,
                { nome, email, senha, permissoes },
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

    const editUsuario = async (id: string, nome: string, email: string, senha: string, permissoes: string) => {
        checkIfIsCancelled()
        setLoading(true);
        setError(null);

        try {
            const response = await axios.put(`${apiUrl}/usuario/${id}`,
                { id, nome, email, senha, permissoes },
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

    const deleteUsuario = async (id: string) => {
        checkIfIsCancelled()
        setLoading(true);
        setError(null);

        try {
            const response = await axios.delete(`${apiUrl}/usuario/${id}`,
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

    return { getUsuarios, getUsuario, createUsuario, editUsuario, deleteUsuario, loading, error };
};

export default useUsuario;
