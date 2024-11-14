import { Key, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useDocumentos from "../hooks/useDocumentos"
import LoadingComponent from "../components/Loading.component";
import Error from "../components/Error.component";
import { Box, Container, Typography, List, ListItem, ListItemText, Divider, ListItemSecondaryAction, IconButton} from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import useDeleteDocument from "../hooks/useDeleteDocument";

interface Idocumentos {
    _id: String,
    aluno: String,
    emails: [String],
    documento: String,
    createdAt: String,
    updatedAt: String,
    __v: Number
}

const Documentos = () => {
    const {getDocumentos, loading, error } = useDocumentos();
    const [documentos, setDocumentos] = useState<[Idocumentos] | null>(null)
    const navigate = useNavigate()
    const {deleteDocumento, loading: loadingDelete,  error: errorDelete} = useDeleteDocument();
    const permissao = sessionStorage.getItem("permissao") === "admin"

    useEffect(() => {
        
        const fetchDocumentos = async () => {
            setDocumentos(await getDocumentos());
            console.log(documentos)
        };

        fetchDocumentos()

    }, []);

    const handleItemList = (documento: String) => {
        navigate(`/documento/${documento}`)
    }

    const handleEdit = (documento: Idocumentos) => {
        
    }

    const handleDelete = async (id: String) => {
        try {
            await deleteDocumento(id)
            const updatedDocumentos = documentos?.filter(doc => doc._id !== id) || null;
            //@ts-ignore
            setDocumentos(updatedDocumentos)
        } catch (e: any) {
            console.error(e)
        }
    }

    return (
        <Box>
            {loading ? (
                <LoadingComponent />
            ) : (
                <Container component="main" maxWidth="sm" id="container">
                    <Box
                        sx={{
                            marginTop: '10vh',
                            marginBottom: '10vh',
                            textAlign: 'center',
                            minWidth: '50vh',        
                        }}
                    >
                        <Typography component="h1" variant='h5'>Lista de Documentos</Typography>
                        <List>
                            {!documentos && <span>Não existe documentos!</span>}
                            {documentos && documentos.map((documento) => (
                                <div key={documento._id as Key}>
                                <ListItem button onClick={() => handleItemList(documento.documento)}>
                                    <ListItemText primary={documento.aluno} secondary={documento.documento} />
                                    {permissao && (
                                        <ListItemSecondaryAction>
                                            <IconButton edge="end" aria-label="edit" onClick={() => handleEdit(documento)}>
                                                <EditIcon />
                                            </IconButton>
                                            <IconButton edge="end" aria-label="delete" onClick={() => handleDelete(documento._id)}>
                                                <DeleteIcon />
                                            </IconButton>
                                        </ListItemSecondaryAction>
                                    )}
                                </ListItem>
                                <Divider />
                            </div>
                            ))}
                        </List>
                        {error && <Error texto={{error}}/>}
                    </Box>
                </Container>
            )}
        </Box>
    );
}

export default Documentos