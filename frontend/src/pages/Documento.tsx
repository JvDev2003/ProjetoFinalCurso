import { useParams } from "react-router-dom"
import { Box, Container, Typography, Button } from '@mui/material';
import useConfirm from "../hooks/useConfirm";
import Pdf from "../components/Pdf"
import { useNavigate } from "react-router-dom";

const Documento = () => {
  const { documento } = useParams()
  const navigate = useNavigate()
  const { confirm, loading, error } = useConfirm()
  const token = sessionStorage.getItem("token")
  // Criar a validação da sessão do usuario

  const handleConfirm = async () => {
    if (!documento) { return }
    if (!token) { return }

    try {
      await confirm(documento, token)
      navigate("/confirmado")
    } catch (e: any) {
      console.error(e)
    }
  }

  return (
    <Container component="main" maxWidth="md" id="container">
      <Box
        sx={{
          margin: '2em 0',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Typography component="h1" variant='h5'>Documento</Typography>
      </Box>
      <Pdf fileUrl={`/documentos/${documento}`} />
      <Box
        sx={{
          margin: '2em 0',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          sx={{
            maxWidth: '300px', // Optional: Limit button width
          }}
          onClick={handleConfirm}
        >
          Confirmar Leitura
        </Button>
      </Box>
    </Container>
  )
}

export default Documento