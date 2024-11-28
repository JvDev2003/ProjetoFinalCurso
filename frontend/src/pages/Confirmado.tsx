import { Box, Container, Typography } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle'; // Ícone de sucesso

const Confirmado = () => {
  return (
    <Container component="main" maxWidth="md" sx={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          textAlign: 'center',
          padding: 3,
          boxShadow: 3,
          borderRadius: 2,
          backgroundColor: '#fff',
        }}
      >
        <CheckCircleIcon sx={{ fontSize: 70, color: 'green', marginBottom: 2 }} />
        <Typography variant="h4" component="h1" gutterBottom>
          Documento Confirmado com Sucesso!
        </Typography>
        <Typography variant="body1" sx={{ marginBottom: 3 }}>
          A leitura do Documento foi confimada você já pode fechar essa aba.
        </Typography>
      </Box>
    </Container>
  );
};

export default Confirmado;
