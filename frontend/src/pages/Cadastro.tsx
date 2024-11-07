import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Button, Container, TextField, Typography } from '@mui/material';

const Cadastro = () => {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')

    const navigate =  useNavigate()

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        // console.log(email)
        // console.log(password)
        // console.log(confirmPassword)

        // Aqui vai a logica do cadastro
        // poderia ser criado um custom hook apenas para isso

        

        setEmail("")
        setPassword("")
        setConfirmPassword("")
    }

    const handleLogin = () => {
        navigate('/')
    }

    return (
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
            <Typography component="h1" variant='h5'>Cadastro</Typography>    
            <Box component="form" onSubmit={handleSubmit}>

                <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    id="email"
                    label="Email"
                    name="email"
                    autoComplete="email"
                    autoFocus
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
                    type="confirm-password"
                    id="confirm-password"
                    autoComplete="current-confirm-password"
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    value={confirmPassword}
                />
                <Button
                    type="submit"
                    fullWidth
                    variant="outlined"
                >
                    Cadastrar-se
                </Button>
                <Button
                    type="button"
                    fullWidth
                    variant="outlined"
                    onClick={() => handleLogin()}
                >
                    Já possui cadastro?
                </Button>
  
            </Box>
          
          </Box>
        </Container>
      );
}

export default Cadastro