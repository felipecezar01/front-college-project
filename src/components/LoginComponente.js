// Arquivo: LoginComponente.js
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './LoginComponente.css'; // Importa o CSS para o login
import loginImage from './bannerlogin.jpg';

function LoginComponente() {
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [mensagem, setMensagem] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:3001/api/users/login', { email, senha });
            localStorage.setItem('token', response.data.token); // Assumindo que o token é retornado aqui
            localStorage.setItem('userName', response.data.user.nome); // Salva o nome do usuário
            console.log("Login bem-sucedido, redirecionando...");
            navigate('/rooms');
        } catch (error) {
            console.log("Erro no login:", error);
            setMensagem("Senha ou Email errado. Tente novamente ou cadastre-se");
        }
    };
    

    return (
        <div className="login-page">
            <div className="login-container">
                <div className="login-image-container">
                    <img src={loginImage} alt="Login Visual" style={{ width: '100%', height: '100%' }} />
                </div>
                <div className="login-form-container">
                    <h1 className="login-title">Aurelia</h1>
                    <h2 className="login-subtitle">Login</h2>
                    <form onSubmit={handleLogin}>
                        <div className="form-group">
                            <label>Email:</label>
                            <input type="email" className="login-input" value={email} onChange={e => setEmail(e.target.value)} required />
                        </div>
                        <div className="form-group">
                            <label>Senha:</label>
                            <input type="password" className="login-input" value={senha} onChange={e => setSenha(e.target.value)} required />
                        </div>
                        <button type="submit" className="login-button">Login</button>
                    </form>
                    {mensagem && <p className={`message ${mensagem.includes("sucesso") ? 'success' : 'error'}`}>{mensagem}</p>}
                </div>
            </div>
        </div>
    );
}

export default LoginComponente;
