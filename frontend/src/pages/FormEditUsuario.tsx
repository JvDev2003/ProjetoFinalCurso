import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Box, Button, Container, TextField, Typography } from '@mui/material';
import useUsuario from '../hooks/useUsuario';
import AdminMenu from '../components/AdminMenu.component';
import Error from '../components/Error.component';

const FormEditUsuario = () => {
    const { id } = useParams()
    const [nome, setNome] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const { editUsuario, getUsuario, loading, error } = useUsuario()
    const navigate = useNavigate()

    useEffect(() => {
        const fetchUsuario = async () => {
            if (!id) { return }
            const { usuario } = await getUsuario(id)
            setNome(usuario.nome)
            setEmail(usuario.email)
        }

        fetchUsuario()
    }, [])

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        try {
            if (!id) { return }

            await editUsuario(id, nome, email, password, 'user')

            // setEmail("")
            // setPassword("")
            // setConfirmPassword("")

            navigate("/usuarios")
        } catch (e: any) {
            console.error(e)
        }
    }

    return (
        <Box>
            <AdminMenu />
            <Container component="main" maxWidth="xs" id="container">
                <Box
                    sx={{
                        height: '100vh',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}
                >
                    <Typography component="h1" variant='h5'>Editar Usuário</Typography>
                    <Box component="form" onSubmit={handleSubmit}>

                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            id="nome"
                            label="Nome"
                            name="nome"
                            autoComplete="nome"
                            autoFocus
                            onChange={(e) => setNome(e.target.value)}
                            value={nome}
                        />
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            label="Email"
                            name="email"
                            disabled
                            autoComplete="email"
                            onChange={(e) => setEmail(e.target.value)}
                            value={email}
                        />
                        <TextField
                            variant="outlined"
                            margin="normal"
                            fullWidth
                            name="Senha"
                            label="Nova Senha"
                            type="password"
                            id="password"
                            autoComplete="current-password"
                            onChange={(e) => setPassword(e.target.value)}
                            value={password}
                        />
                        <TextField
                            variant="outlined"
                            margin="normal"
                            fullWidth
                            name="Confirmar senha"
                            label="Confirmar Nova senha"
                            type="password"
                            id="confirm-password"
                            autoComplete="current-confirm-password"
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            value={confirmPassword}
                        />
                        <Button
                            type="submit"
                            fullWidth
                            variant="outlined"
                            disabled={loading}
                        >
                            {loading ? 'Carregando...' : 'Cadastrar'}
                        </Button>
                    </Box>

                </Box>
            </Container>
            {error && <Error texto={error} />}
        </Box>
    );
}

export default FormEditUsuario