import { useState } from 'react';
import { Box, Button, Container, TextField, Typography, Select, MenuItem} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { listaProfessores } from '../dados/ListaProfessores';
import useFormEnvio from '../hooks/useFormEnvio';
import Error from '../components/Error.component';

const FormEnvio = () => {
    const [aluno, setAluno] = useState('')
    const [emails, setEmails] = useState<String[]>([])
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [addSelect, setAddSelect] = useState<number[]>([0])
    const [professores, setProfessores] = useState(listaProfessores)
    const {enviaFormEnvio, loading, error} = useFormEnvio()
    const navigate = useNavigate()

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      if(!event.target.files){
        console.log("Upload vazio")
        return
      }

      setSelectedFile(event.target.files[0]);
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault()

      try {
        await enviaFormEnvio(aluno, emails, selectedFile!)
        navigate("/lista")
      } catch (e: any) {
        setAluno('')
        setEmails([])
        setSelectedFile(null)
      }

    }

    const handleEmail = (e: React.ChangeEvent<{ name?: string; value: unknown }>, index: number) => {
      const novoEmail = e.target.value as string

      //colocar o novo email em posição no array equivalente a key do select a que ele pertence
      setEmails((prevEmails) => {
        prevEmails[index] = novoEmail
        return [...prevEmails]
      });
      
    }

    const handleAddProfessor = () => {
      setAddSelect((prevAddSelect) => [...prevAddSelect, addSelect.reverse()[0] + 1]);
    }

    return (
      <Container component="main" maxWidth="sm" id="container">
        <Box
          sx={{
            height: '100vh',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          {error && <Error texto={error}/>}
          <Typography component="h1" variant='h5'>Formulário de Envio de Documentos</Typography>    
          <Box component="form" onSubmit={handleSubmit}>
              <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  id="name"
                  label="Nome do aluno"
                  name="name"
                  autoComplete="name"
                  autoFocus
                  onChange={(e) => setAluno(e.target.value)}
                  value={aluno}
              />
              {addSelect && addSelect.map((_,index) => (
                    <Select
                    onChange={(e) => handleEmail(e, index)}
                    fullWidth
                    variant='outlined'
                    value={emails[index] || "1"}
                    key={index}
                  >
                    <MenuItem value="1" disabled selected>Escolha um professor(a)</MenuItem>
                    {professores && professores.map((prof) => (
                      !emails.includes(prof.email)?
                      (<MenuItem value={prof.email} key={prof.email}>{prof.nome}</MenuItem>):
                      (<MenuItem value={prof.email} key={prof.email} disabled hidden>{prof.nome}</MenuItem>) 
                    ))}
                  </Select>
              ))}
              <Button
                  type="button"
                  fullWidth
                  variant="outlined"
                  onClick={handleAddProfessor}
                  disabled={loading}
              >
              {loading ? 'Enviando...' : ' Adicionar outro professor'}
              </Button>

              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                type="file"
                onChange={handleFileChange}
              />
              <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  color='primary'
                  disabled={loading}
              >
                  {loading ? 'Enviando...' : 'Enviar'}
              </Button>
          </Box>
        </Box>
      </Container>
    );
}

export default FormEnvio