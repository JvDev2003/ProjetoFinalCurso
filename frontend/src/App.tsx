import { BrowserRouter, Routes, Route } from 'react-router-dom'

import Login from './pages/Login';
import Cadastro from './pages/Cadastro';
import FormEnvio from './pages/FormEnvio';
import Documento from './pages/Documento';
import Documentos from './pages/Documentos';
import Validation from './pages/Validation';
import Confirmado from './pages/Confirmado';
import ListaProfessores from './pages/ListaProfessores';
import { FormProfessores } from './pages/FormProfessores';
import { FormEditProfessores } from './pages/FormEditProfessor';
import ListaUsuarios from './pages/ListaUsuarios';
import FormEditUsuario from './pages/FormEditUsuario';

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Login />} />
          <Route path='/adicionarUsuario' element={<Cadastro />} />
          <Route path='/usuarios' element={<ListaUsuarios />} />
          <Route path='/editarUsuario/:id' element={<FormEditUsuario />} />
          <Route path='/formEnvio' element={<FormEnvio />} />
          <Route path='/lista' element={<Documentos />} />
          <Route path='/documento/:documento' element={<Documento />} />
          <Route path='/validation/:documento/:token' element={<Validation />} />
          <Route path='/doc/:documento' element={<Documento />} />
          <Route path='/confirmado' element={<Confirmado />} />
          <Route path='/professores' element={<ListaProfessores />} />
          <Route path='/adicionarProfessor' element={<FormProfessores />} />
          <Route path='/editarProfessor/:id' element={<FormEditProfessores />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App;
