import { useParams } from "react-router-dom";
import { Box, Container, Typography, Button } from '@mui/material';
import { useNavigate } from "react-router-dom";
import useValidation from "../hooks/useValidation";

const Validation = () => {
  const {validation, loading, error} = useValidation()
  const navigate = useNavigate()
  const { documento, token } = useParams();

  const handleValidation = async() => {
    try {
        const valid = await validation(documento!, token!)
        if(valid){
            navigate(`/doc/${documento}`)
        }
    } catch (error) {
        console.error(error)
    }
  }

  return (
    <Container component="main" maxWidth="md" id="container">
      <Box
        sx={{
          margin: '2em 0',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center', // Center content vertically
          alignItems: 'center', // Center content horizontally
          height: '100vh', // Use full viewport height
        }}
      >
        <Typography component="h1" variant="h5" mb={2}>Documento</Typography>
        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          sx={{
            maxWidth: '300px', // Optional: Limit button width
          }}
          onClick={handleValidation}
        >
          Abrir Documento
        </Button>
      </Box>
    </Container>
  );
};

export default Validation;
