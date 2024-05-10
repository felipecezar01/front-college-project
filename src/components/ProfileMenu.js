// ProfileMenu.js
import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './ProfileMenu.css'; // Certifique-se de ter este arquivo CSS
import perfil from "./usuario-de-perfil.png";

function ProfileMenu() {
    const [isOpen, setIsOpen] = useState(false);
    const navigate = useNavigate();
    const menuRef = useRef();

    // Função para obter o nome do usuário armazenado
    const getUserName = () => {
        const userName = localStorage.getItem('userName'); // Obtém o nome do usuário do localStorage
        return userName;
    };

    // Estado para armazenar o nome do usuário
    const [userName, setUserName] = useState(getUserName());

    // Atualiza o nome do usuário no estado quando ele muda no localStorage
    useEffect(() => {
        const handleStorageChange = () => {
            setUserName(getUserName());
        };

        window.addEventListener('storage', handleStorageChange);

        return () => {
            window.removeEventListener('storage', handleStorageChange);
        };
    }, []);

    // Função para lidar com o logout
    const handleLogout = () => {
        console.log('Usuário deslogado');
        localStorage.removeItem('token'); // Remove o token de autenticação
        localStorage.removeItem('userName'); // Remove o nome do usuário do localStorage
        navigate('/'); // Redireciona para a página inicial
    };

    // Fecha o menu quando clica fora dele
    const handleClickOutside = (event) => {
        if (menuRef.current && !menuRef.current.contains(event.target)) {
            setIsOpen(false);
        }
    };

    // Adiciona listeners para clique fora do menu
    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <div className="profile-menu" ref={menuRef}>
            <div onClick={() => setIsOpen(!isOpen)} className="profile-trigger">
                <img src={perfil} alt="Perfil" />
                {userName || "Perfil"}
            </div>
            {isOpen && (
                <div className="menu-dropdown">
                    <ul>
                        <li onClick={() => { navigate('/profile'); setIsOpen(false); }}>
                            {userName || "Informações do Usuário"}
                        </li>
                        <li onClick={() => { navigate('/support'); setIsOpen(false); }}>
                            Suporte
                        </li>
                        <li onClick={handleLogout} className="logout">
                            Log out <span className="logout-icon">🚪</span>
                        </li>
                    </ul>
                </div>
            )}
        </div>
    );
}

export default ProfileMenu;
