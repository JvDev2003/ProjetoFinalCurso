import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Button, Container, TextField, Typography } from '@mui/material';
import useUsuario from '../hooks/useUsuario';
import AdminMenu from '../components/AdminMenu.component';

const Cadastro = () => {

    const [nome, setNome] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const { createUsuario, loading, error } = useUsuario()


    const navigate = useNavigate()

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        try {
            await createUsuario(nome, email, password, 'user')

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
                    <Typography component="h1" variant='h5'>Cadastrar Novo Usuário</Typography>
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
                            autoComplete="email"
                            onChange={(e) => setEmail(e.target.value)}
                            value={email}
                        />
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            name="Senha"
                            label="Senha"
                            type="password"
                            id="password"
                            autoComplete="current-password"
                            onChange={(e) => setPassword(e.target.value)}
                            value={password}
                        />
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            name="Confirmar senha"
                            label="Confirmar senha"
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
        </Box>
    );
}

export default Cadastro