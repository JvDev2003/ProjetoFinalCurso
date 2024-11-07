import { useParams } from "react-router-dom"
import { Box, Container, Typography, Button } from '@mui/material';
import Pdf from "../components/Pdf"

const Documento = () => {
  
  const {idParam} = useParams()

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
        <Pdf fileUrl={`/documentos/${idParam}`}/>
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
        >
            Confirmar Leitura
        </Button>  
      </Box>
    </Container>
  )
}

export default Documento