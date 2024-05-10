import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './RoomList.css';
import ProfileMenu from './ProfileMenu';
import { ReactComponent as ArrowIcon } from './arrow.svg';
import { isUserAuthenticated } from '../utils/auth';

function RoomList() {
    const [rooms, setRooms] = useState([]);
    const [availableRoomCount, setAvailableRoomCount] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const [searchTerm, setSearchTerm] = useState('');
    const [filters, setFilters] = useState({
        Centro: false,
        'Zona Norte': false,
        'Zona Sul': false,
        'Zona Leste': false,
        'Zona Oeste': false,
        Subúrbio: false
    });
    const [showLocalidades, setShowLocalidades] = useState(false);
    const [onlyAvailable, setOnlyAvailable] = useState(false);
    const navigate = useNavigate();

    // Fetch both rooms and available count on component mount and whenever dependencies change
    useEffect(() => {
        if (!isUserAuthenticated()) {
            navigate('/login');
        } else {
            fetchRooms();
            fetchAvailableRoomCount();
        }
    }, [currentPage, searchTerm, filters, onlyAvailable]);

    const fetchRooms = () => {
        const activeFilters = Object.keys(filters).filter(key => filters[key]);
        const queryParams = new URLSearchParams({
            page: currentPage,
            search: searchTerm,
            localidades: activeFilters.join(','),
            available: onlyAvailable
        }).toString();

        axios.get(`http://localhost:3001/api/rooms?${queryParams}`, {
            headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        })
        .then(response => {
            setRooms(response.data.rooms);
            setTotalPages(response.data.totalPages);
        })
        .catch(error => console.error('Erro ao buscar salas:', error));
    };

    const fetchAvailableRoomCount = () => {
        axios.get(`http://localhost:3001/api/rooms/count-available`, {
            headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        })
        .then(response => {
            setAvailableRoomCount(response.data.availableRoomCount);
        })
        .catch(error => {
            console.error('Erro ao obter contagem de salas disponíveis:', error);
        });
    };

    const handleRent = (id) => {
        axios.post(`http://localhost:3001/api/rooms/rent/${id}`, {}, {
            headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        })
        .then(() => {
            fetchRooms();
            fetchAvailableRoomCount();
        })
        .catch(error => console.error('Erro ao alugar sala:', error));
    };

    const handleUnrent = (id) => {
        axios.post(`http://localhost:3001/api/rooms/unrent/${id}`, {}, {
            headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        })
        .then(() => {
            fetchRooms();
            fetchAvailableRoomCount();
        })
        .catch(error => console.error('Erro ao desalugar sala:', error));
    };

    const changePage = (page) => setCurrentPage(page);

    const handleCheckboxChange = (key, event) => {
        event.stopPropagation();
        setFilters(prev => ({ ...prev, [key]: !prev[key] }));
    };

    const toggleLocalidadesVisibility = (event) => {
        event.stopPropagation();
        setShowLocalidades(prev => !prev);
    };

    const handleGenerateReport = () => {
        axios.get(`http://localhost:3001/api/rooms/generate-report`, {
            responseType: 'blob',
            headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        })
        .then(response => {
            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', 'room_report.txt');
            document.body.appendChild(link);
            link.click();
            link.parentNode.removeChild(link);
        })
        .catch(error => {
            console.error('Erro ao gerar relatório:', error);
            alert("Falha ao gerar relatório. Verifique o console para mais detalhes.");
        });
    };

    const handleDownloadDoc = () => {
        const link = document.createElement('a');
        link.href = '/documentacaoapsgeral.pdf'; // Caminho acessível na raiz do servidor
        link.setAttribute('download', 'Documentacao_Projeto.pdf'); // Define o nome do arquivo para download
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      };      
      

    return (
        <div className="room-list-container">
            <ProfileMenu />
            <div className="side-panel">
                <h3>Filtros</h3>
                <div className="filter-category" onClick={toggleLocalidadesVisibility}>
                    Localidade <ArrowIcon className={`arrow ${showLocalidades ? 'up' : 'down'}`} />
                </div>
                {showLocalidades && (
                    <div className="filter-options">
                        {Object.keys(filters).map(key => (
                            <label key={key} onClick={(event) => event.stopPropagation()}>
                                <input 
                                    type="checkbox" 
                                    checked={filters[key]} 
                                    onChange={(event) => handleCheckboxChange(key, event)} 
                                /> {key}
                            </label>
                        ))}
                    </div>
                )}
            </div>
            <div className="room-list">
                <h1>Lista de Salas Disponíveis</h1>
                <div className="search-container">
                    <input 
                        type="text" 
                        placeholder="Pesquisar sala..." 
                        value={searchTerm} 
                        onChange={e => setSearchTerm(e.target.value)} 
                        className="search-input" 
                    />
                    <label className="availability-filter">
                        <input
                            type="checkbox"
                            checked={onlyAvailable}
                            onChange={e => {
                                setOnlyAvailable(e.target.checked);
                                fetchAvailableRoomCount();
                            }}
                        /> Somente Disponíveis ({availableRoomCount})
                    </label>
                    <button onClick={handleGenerateReport} className="generate-report-button">Gerar Relatório</button>
                    <button className="download-doc-button" onClick={handleDownloadDoc}>Documentação</button>

                </div>
                <div className="room-grid">
                    {rooms.map(room => (
                        <div key={room.id} className="room-item">
                            <img src={`http://localhost:3001${room.imagem_url}`} alt={`Sala ${room.nome}`} className="room-image" />
                            <h2>{room.nome}</h2>
                            <p>Localidade: {room.localidade}</p>
                            <p>Capacidade: {room.capacidade} pessoas</p>
                            <p>Quantidade de Aluguéis: {room.quantidade_alugueis || 0}</p>
                            <p className={`availability ${room.disponibilidade ? 'available' : 'unavailable'}`}>
                                {room.disponibilidade ? 'Disponível' : 'Indisponível'}
                            </p>
                            {room.disponibilidade ? (
                                <button onClick={() => handleRent(room.id)} className="rent-button">Alugar</button>
                            ) : (
                                <button onClick={() => handleUnrent(room.id)} className="unrent-button">Desalugar</button>
                            )}
                        </div>
                    ))}
                </div>
                {totalPages > 1 && (
                    <div className="pagination">
                        {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                            <button key={page} onClick={() => changePage(page)} disabled={page === currentPage} className="page-button">
                                {page}
                            </button>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );    
}

export default RoomList;
