import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useDocumentos from "../hooks/useDocumentos";
import LoadingComponent from "../components/Loading.component";
import Error from "../components/Error.component";
import { Box, Container, Typography, List, ListItem, ListItemText, Divider, IconButton, Button } from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import useDeleteDocument from "../hooks/useDeleteDocument";
import Menu from "../components/Menu.component";

interface Idocumentos {
    _id: string;
    aluno: string;
    emails: string[];
    documento: string;
    createdAt: string;
    updatedAt: string;
    __v: number;
}

const Documentos = () => {
    const { getDocumentos, loading, error } = useDocumentos();
    const [documentos, setDocumentos] = useState<Idocumentos[] | null>(null);
    const navigate = useNavigate();
    const { deleteDocumento, loading: loadingDelete, error: errorDelete } = useDeleteDocument();
    const permissao = sessionStorage.getItem("permissao") === "admin";

    useEffect(() => {
        const fetchDocumentos = async () => {
            const fetchedDocumentos = await getDocumentos();
            setDocumentos(fetchedDocumentos);
        };

        fetchDocumentos();
    }, []);

    const handleItemList = (documento: string) => {
        navigate(`/documento/${documento}`);
    };

    const handleEdit = (documento: Idocumentos) => {
        // Add edit logic here
        console.log("Editing documento", documento);
    };

    const handleDelete = async (id: string) => {
        try {
            await deleteDocumento(id);
            const updatedDocumentos = documentos?.filter(doc => doc._id !== id) || [];
            setDocumentos(updatedDocumentos);
        } catch (e) {
            console.error(e);
        }
    };

    return (
        <Box>
            <Menu />

            {loading ? (
                <LoadingComponent />
            ) : (
                <Container
                    component="main"
                    id="container"
                    sx={{
                        height: '100vh',
                        width: '100vw',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}>
                    <Box
                        maxWidth="md"
                        sx={{
                            marginTop: '10vh',
                            marginBottom: '10vh',
                            textAlign: 'center',
                            minWidth: '50vh',
                        }}
                    >
                        <Typography component="h1" variant="h5" mb={2}>
                            Lista de Documentos
                        </Typography>


                        <List>
                            {!documentos || documentos.length === 0 ? (
                                <Typography variant="body1">Não existem documentos!</Typography>
                            ) : (
                                documentos.map((documento) => (
                                    <div key={documento._id}>
                                        <ListItem component="button" onClick={() => handleItemList(documento.documento)}>
                                            <ListItemText primary={documento.aluno} secondary={documento.documento} />
                                            {permissao && (
                                                <>
                                                    <IconButton edge="end" aria-label="edit" onClick={() => handleEdit(documento)}>
                                                        <EditIcon />
                                                    </IconButton>
                                                    <IconButton edge="end" aria-label="delete" onClick={() => handleDelete(documento._id)}>
                                                        <DeleteIcon />
                                                    </IconButton>
                                                </>
                                            )}
                                        </ListItem>
                                        <Divider />
                                    </div>
                                ))
                            )}
                        </List>

                        {error && <Error texto={error} />}
                        {errorDelete && <Error texto={errorDelete} />}
                    </Box>
                </Container>
            )}
        </Box>
    );
};

export default Documentos;
