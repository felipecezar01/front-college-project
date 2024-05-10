import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import RoomList from './components/RoomList'; // Certifique-se de que o caminho está correto
import Register from './components/Register'; // Supondo que você tenha um componente de registro
import Home from './components/Comeco'; // Supondo que você tenha uma página inicial
import LoginComponente from './components/LoginComponente';
import { isUserAuthenticated } from './utils/auth'; // Ajuste o caminho conforme necessário

function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<LoginComponente />} />
          <Route path="/rooms" element={
            isUserAuthenticated() ? <RoomList /> : <Navigate to="/login" />
          } />
          <Route path="/register" element={<Register />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
