import { Route, Routes, useParams } from "react-router-dom";
import Index from "./IndexPage";
import Home from "./HomePage";
import Buscador from "./Buscador";
import Detalle from "./DetallePage";
import { EmpresaProvider } from "./context/EmpresaContext";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Index />} />
      
      {/* Usando directamente el componente con EmpresaProvider */}
      <Route 
        path="/:empresaId/home" 
        element={<EmpresaRoute Component={Home} />} 
      />
      <Route 
        path="/:empresaId/buscador" 
        element={<EmpresaRoute Component={Buscador} />} 
      />
      <Route 
        path="/:empresaId/detalle/:noticiaId" 
        element={<EmpresaRoute Component={Detalle} />} 
      />
    </Routes>
  );
}

// Componente reusable para envolver cada ruta con EmpresaProvider
function EmpresaRoute({ Component }) {
  const { empresaId } = useParams();
  return (
    <EmpresaProvider idEmpresa={empresaId}>
        <Component />
    </EmpresaProvider>
  );
}

export default App;
