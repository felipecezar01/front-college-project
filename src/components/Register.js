// Arquivo: Register.js
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Register.css';

function Register() {
    const [formData, setFormData] = useState({
        nome: '',
        email: '',
        senha: ''
    });
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    const { nome, email, senha } = formData;

    const onChange = e => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const onSubmit = async e => {
        e.preventDefault();
        try {
            const config = {
                headers: {
                    'Content-Type': 'application/json'
                }
            };
            const body = JSON.stringify({ nome, email, senha });
            const response = await axios.post('http://localhost:3001/api/users/register', body, config);

            setMessage("Cadastro realizado com sucesso!");
            setTimeout(() => {
                navigate('/rooms'); // Navega para a página de salas após o cadastro
            }, 2000); // Espera 2 segundos antes de redirecionar
        } catch (err) {
            console.error('Erro no registro:', err.response.data);
            setMessage("Erro no cadastro. Tente novamente.");
        }
    };

    return (
        <div className="register-container">
            <h2>Registrar</h2>
            <form onSubmit={onSubmit}>
                <div className="register-field">
                    <label>Nome:</label>
                    <input type="text" name="nome" value={nome} onChange={onChange} required />
                </div>
                <div className="register-field">
                    <label>Email:</label>
                    <input type="email" name="email" value={email} onChange={onChange} required />
                </div>
                <div className="register-field">
                    <label>Senha:</label>
                    <input type="password" name="senha" value={senha} onChange={onChange} required />
                </div>
                <button type="submit" className="register-button">Registrar</button>
            </form>
            {message && <p className="message-info">{message}</p>}
        </div>
    );
}

export default Register;
