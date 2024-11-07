import {BrowserRouter, Routes, Route} from 'react-router-dom'

import Login from './pages/Login';
import Cadastro from './pages/Cadastro';
import FormEnvio from './pages/FormEnvio';
import Documento from './pages/Documento';
import Documentos from './pages/Documentos';

function App() {
    return (
      <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Login />}/>
          <Route path='/cadastro' element={<Cadastro />}/>
          <Route path='/formEnvio' element={<FormEnvio/>} />
          <Route path='/lista' element={<Documentos/>}/>
          <Route path='/documento/:idParam' element={<Documento/>}/>
        </Routes>
      </BrowserRouter>
      </>
    )
}

export default App;
