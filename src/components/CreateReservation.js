import React, { useState } from 'react';
import './CreateReservation.css';

function CreateReservation() {
    const [userId, setUserId] = useState('');
    const [roomId, setRoomId] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        const reservationData = {
            usuario_id: userId,
            sala_id: roomId,
            data_inicio: startDate,
            data_fim: endDate
        };

        fetch('http://localhost:3001/api/reservations', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(reservationData)
        })
        .then(response => response.json())
        .then(data => {
            alert('Reserva criada com sucesso!');
            console.log(data);
        })
        .catch(error => console.error('Erro ao criar reserva:', error));
    };

    return (
        <form onSubmit={handleSubmit}>
            <h1>Criar Reserva</h1>
            <input type="text" value={userId} onChange={e => setUserId(e.target.value)} placeholder="ID do Usuário" />
            <input type="text" value={roomId} onChange={e => setRoomId(e.target.value)} placeholder="ID da Sala" />
            <input type="datetime-local" value={startDate} onChange={e => setStartDate(e.target.value)} placeholder="Data/Hora Início" />
            <input type="datetime-local" value={endDate} onChange={e => setEndDate(e.target.value)} placeholder="Data/Hora Fim" />
            <button type="submit">Reservar</button>
        </form>
    );
}

export default CreateReservation;
