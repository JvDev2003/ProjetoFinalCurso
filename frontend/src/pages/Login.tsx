import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Button, Container, TextField, Typography, Snackbar} from '@mui/material';
import useLogin from '../hooks/useLogin';
import Error from '../components/Error.component';



function Login() {
    const {login, loading, error } = useLogin()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const navigate = useNavigate()

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        if(!email || !password){
          return 
        }
        try {
          await login(email, password)
          const permissao = sessionStorage.getItem('permissao')
          console.log(permissao)

          permissao !== "admin" ? navigate("/lista") : navigate("/formEnvio")
          
        } catch (e: any) {
          setEmail('')
          setPassword('')
        }
        
    }

    // const handleCadastro = () => {
    //     navigate('/cadastro')
    // }

    return (
      <Container component="main" maxWidth="xs" id="container">
        {error && ( <Error texto={error}/> )}
        <Box
          sx={{
            height: '100vh',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Typography component="h1" variant='h5'>Login</Typography>    
          <Box component="form" onSubmit={handleSubmit}>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
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
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
            />
            {!loading && (
                <Button
                type="submit"
                fullWidth
                variant="outlined"
                >
                  Log In
                </Button>
            )}
            {loading && (
                <Button
                type="submit"
                fullWidth
                variant="outlined"
                disabled
                >
                  Log In
                </Button>
            )}

            {/* <Button
              type="button"
              fullWidth
              variant="outlined"
              onClick={() => handleCadastro()}
            >
              Cadastre-se
            </Button> */}

          </Box>
        
        </Box>
      </Container>
    );
}

export default Login;