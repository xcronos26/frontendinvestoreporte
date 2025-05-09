import React from 'react';
import ReactDOM from 'react-dom/client';
import Template from './Template.jsx';
import App from './App.jsx';
import Lista from './Lista.jsx';
import Report from './Report';
import TemplateReport from './TemplateReport.jsx'; 
import TodasInformacoes from './TodasInformacoes.jsx';
import { ChakraProvider } from '@chakra-ui/react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';


import Register from '../src/pages/Login/Registro.jsx';
import Login from '../src/pages/Login/Login.jsx';
import LoginAdm from '../src/pages/Login/LoginAdm.jsx';

import Step1 from './pages/Steps/Step1.jsx'
import Step2 from './pages/Steps/Step2.jsx'
import Step3 from './pages/Steps/Step3.jsx'
import Step4 from './pages/Steps/Step4.jsx'
import Step5 from './pages/Steps/Step5.jsx'
import Step6 from './pages/Steps/Step6.jsx'
import Step7 from './pages/Steps/Step7.jsx'
import Step8 from './pages/Steps/Step8.jsx'
import Step9 from './pages/Steps/Step9.jsx'

import Perguntas from './Perguntas';
import Formulario from "./FormularioPerguntas";


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ChakraProvider>
      <BrowserRouter>
        <Routes>

          <Route path="/template" element={<Template />} />
          <Route path="/lista" element={<Lista />} />
          <Route path="/report" element={<Report />} />
          <Route path="/investor-report/:id" element={<TemplateReport />} />
          <Route path="/todas-informacoes/:id" element={<TodasInformacoes />} />
          <Route path="/perguntas" element={<Perguntas />} />
          <Route path="/formularioPerguntas" element={<Formulario />} />


          <Route path="/registro" element={<Register />} />
          <Route path="/" element={<Login />} />
          <Route path="/LoginAdm" element={<LoginAdm />} />

          <Route path="/Step1" element={< Step1/>} />
          <Route path="/Step2" element={< Step2/>} />
          <Route path="/Step3" element={< Step3/>} />
          <Route path="/Step4" element={< Step4/>} />
          <Route path="/Step5" element={< Step5/>} />
          <Route path="/Step6" element={< Step6/>} />
          <Route path="/Step7" element={< Step7/>} />
          <Route path="/Step8" element={< Step8/>} />
          <Route path="/Step9" element={< Step9/>} />
        </Routes>
      </BrowserRouter>
    </ChakraProvider>
  </React.StrictMode>
);
