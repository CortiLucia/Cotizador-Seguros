import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from './componentes/Header';
import Formulario from './componentes/Formulario';
import Historial from './componentes/Historial';
import './App.css'

function App() {

  return (
    <>
    <Header titulo="Seguros de Hogar 🏡"/>
    <div className="container">
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Formulario />} />
            <Route path="/cotizacion" element={<Formulario />} />
            <Route path="/cotizacion/historial" element={<Historial />} />
          </Routes>
        </BrowserRouter>
      </div>
    </>
  )
}

export default App
