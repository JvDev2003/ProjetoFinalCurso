import { useEffect, useState } from "react"
import { Container, Box, List, ListItem, ListItemText, Typography, IconButton, Divider } from "@mui/material"
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import useProfessor from "../hooks/useProfessor"
import LoadingComponent from "../components/Loading.component"
import AdminMenu from "../components/AdminMenu.component";
import Error from "../components/Error.component";
import { useNavigate } from "react-router-dom";

interface Iprofessor {
    _id: string
    nome: string
    email: string
}

const ListaProfessores = () => {
    const [professores, setProfessores] = useState<Iprofessor[]>([])

    const { getProfessores, deleteProfessor, loading, error } = useProfessor()
    const navigate = useNavigate()

    useEffect(() => {
        const fetchProfessor = async () => {
            try {
                const fetchedProfessor = await getProfessores();
                setProfessores(fetchedProfessor.professores); // Ensure it's never undefined
            } catch (err) {
                console.error("Error fetching professors:", err);
            }
        }

        fetchProfessor()
    }, [])

    const handleEdit = (professor: Iprofessor) => {
        try {
            navigate(`/editarProfessor/${professor._id}`)
        } catch (e: any) {
            console.error(e)
        }
    }

    const handleDelete = async (id: string) => {
        try {
            await deleteProfessor(id)

            const filterProfessores = professores.filter((professor) => {
                return professor._id !== id ? true : false
            })

            setProfessores(filterProfessores)

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
                    Lista de Professores
                </Typography>
                {error && <Error texto={error} />}
                {loading && <LoadingComponent />}
                <List>
                    {loading ? (
                        <LoadingComponent />
                    ) : professores.length === 0 ? (
                        <Typography variant="h6" color="textSecondary">
                            No professors found.
                        </Typography>
                    ) : (
                        professores.map((professor, index) => (
                            <ListItem component="div" key={professor.email} style={index % 2 === 0 ? { backgroundColor: "#cacbcc" } : { backgroundColor: "white" }}>
                                <ListItemText primary={professor.nome} secondary={professor.email} />
                                <>
                                    <IconButton edge="end" aria-label="edit" onClick={() => handleEdit(professor)}>
                                        <EditIcon />
                                    </IconButton>
                                    <IconButton edge="end" aria-label="delete" onClick={() => handleDelete(professor._id)}>
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

export default ListaProfessores