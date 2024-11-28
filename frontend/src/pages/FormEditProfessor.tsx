import { useEffect, useState } from 'react';
import { Box, Button, Container, TextField, Typography } from '@mui/material';
import AdminMenu from '../components/AdminMenu.component';
import useProfessor from '../hooks/useProfessor';
import { useNavigate, useParams } from 'react-router-dom';
import Error from '../components/Error.component';


export const FormEditProfessores = () => {
    const { id } = useParams()
    const [nome, setNome] = useState('')
    const [email, setEmail] = useState('')
    const { editProfessor, getProfessor, error, loading } = useProfessor()
    const navigate = useNavigate()

    useEffect(() => {
        const fetchProfessor = async () => {
            const { professor } = await getProfessor(id!)
            setNome(professor.nome)
            setEmail(professor.email)
        }

        fetchProfessor()
    }, [])

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        try {
            await editProfessor(id!, nome, email)
            navigate(-1)
        } catch (e: any) {
            console.error(e)
        }
    }

    return (
        <>
            <AdminMenu />
            <Container
                component="main"
                id="container"
                sx={{
                    height: '100vh',
                    width: '100vw',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}>
                <Box
                    maxWidth="sm"
                    sx={{
                        height: '100vh',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}
                >
                    <Typography component="h1" variant='h5'>Formulário de Edição de Professores</Typography>
                    <Box component="form" onSubmit={handleSubmit}>
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            id="name"
                            label="Nome do professor"
                            name="name"
                            autoComplete="name"
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
                            label="Email do professor"
                            name="email"
                            autoComplete="email"
                            autoFocus
                            onChange={(e) => setEmail(e.target.value)}
                            value={email}
                        />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color='primary'
                            disabled={loading}
                        >
                            {loading ? 'Enviando...' : 'Editar'}
                        </Button>
                    </Box>
                    {error && <Error texto={error} />}
                </Box>
            </Container>
        </>
    )
}
