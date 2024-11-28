import { useEffect, useState } from "react"
import { Container, Box, List, ListItem, ListItemText, Typography, IconButton, Divider } from "@mui/material"
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import LoadingComponent from "../components/Loading.component"
import AdminMenu from "../components/AdminMenu.component";
import Error from "../components/Error.component";
import { useNavigate } from "react-router-dom";
import useUsuario from "../hooks/useUsuario";

interface Iprofessor {
    id: string
    nome: string
    email: string
    permissoes: string
}

const ListaUsuarios = () => {
    const [usuarios, setUsuarios] = useState<Iprofessor[]>([])

    const { getUsuarios, deleteUsuario, loading, error } = useUsuario()
    const navigate = useNavigate()

    useEffect(() => {
        const fetchUsuario = async () => {
            try {
                const fetchedProfessor = await getUsuarios();
                setUsuarios(fetchedProfessor.usuarios); // Ensure it's never undefined
            } catch (err) {
                console.error("Error fetching Usuarios:", err);
            }
        }

        fetchUsuario()
    }, [])

    const handleEdit = (usuario: Iprofessor) => {
        try {
            navigate(`/editarUsuario/${usuario.id}`)
        } catch (e: any) {
            console.error(e)
        }
    }

    const handleDelete = async (id: string) => {
        try {
            await deleteUsuario(id)

            const filterUsuario = usuarios.filter((usuario) => {
                return usuario.id !== id ? true : false
            })

            setUsuarios(filterUsuario)

        } catch (e: any) {
            console.error(e)
        }
    }

    return (
        <Box>
            <AdminMenu />

            <Container
                maxWidth="md"
                id="container"
                sx={{
                    textAlign: "center"
                }}>
                <Typography component="h1" variant="h3" mb={2}>
                    Lista de Usuários
                </Typography>
                {error && <Error texto={error} />}
                {loading && <LoadingComponent />}
                <List>
                    {loading ? (
                        <LoadingComponent />
                    ) : usuarios.length === 0 ? (
                        <Typography variant="h6" color="textSecondary">
                            No professors found.
                        </Typography>
                    ) : (
                        usuarios.map((usuario, index) => (
                            <ListItem component="div" key={usuario.email} style={index % 2 === 0 ? { backgroundColor: "#cacbcc" } : { backgroundColor: "white" }}>
                                <ListItemText primary={`${usuario.nome} (${usuario.permissoes})`} secondary={usuario.email} />
                                <>
                                    <IconButton edge="end" aria-label="edit" onClick={() => handleEdit(usuario)}>
                                        <EditIcon />
                                    </IconButton>
                                    <IconButton edge="end" aria-label="delete" onClick={() => handleDelete(usuario.id)}>
                                        <DeleteIcon />
                                    </IconButton>
                                </>
                                <Divider variant="fullWidth" sx={{ marginY: 1 }} />
                            </ListItem>

                        ))
                    )}
                </List>
            </Container>
        </Box>
    )
}

export default ListaUsuarios