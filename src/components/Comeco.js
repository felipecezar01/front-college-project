import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Comeco.css';

function Comeco() {
    const navigate = useNavigate();

    return (
        <div className="pagina-inicial">
            <header className="cabecalho">
                <div className="nome-empresa">Aurelia</div>
                <nav>
                    <ul className="navegacao">
                        <li onClick={() => navigate('/login')}>Login</li>
                        <li onClick={() => navigate('/register')}>Cadastrar</li>
                    </ul>
                </nav>
            </header>
        </div>
    );
}

export default Comeco;
