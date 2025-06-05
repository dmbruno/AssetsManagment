// src/pages/Login/LoginPage.jsx
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setCurrentUser } from '../../features/users/usersSlice';
import './LoginPage.css';

import { loadAssets } from '../../features/assets/assetsSlice';
import { loadTransactions } from '../../features/transactions/transactionsSlice';
import { MdAccountBalanceWallet } from 'react-icons/md';

const LoginPage = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);

        try {
            // Usa la API base para producción
            const baseUrl = import.meta.env.VITE_API_URL || 'http://localhost:5001';
            const response = await fetch(`${baseUrl}/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email, password })
            });

            if (!response.ok) {
                throw new Error('Credenciales incorrectas');
            }

            // La respuesta ahora es { token, user }
            const { token, user } = await response.json();
            // Guardar el token JWT en localStorage para usarlo en futuras requests
            localStorage.setItem('token', token);
            // Guardar el usuario actual (opcional, para mostrar datos en el frontend)
            localStorage.setItem('currentUser', JSON.stringify(user));
            // Actualizar el estado global de usuario
            dispatch(setCurrentUser(user));

            // Cargar datos protegidos (estos fetchs deben usar el token)
            dispatch(loadAssets());
            dispatch(loadTransactions());

            navigate('/portfolio');
        } catch (err) {
            setError(err.message);
        }
    };

    return (
        <div className="login-container">
            <div className="login-logo">
                <MdAccountBalanceWallet className="login-logo-icon" />
                <span className="login-logo-text">Asset Manager</span>
            </div>
            <form onSubmit={handleSubmit} className="login-form">
                <label htmlFor="email">Email</label>
                <input
                    id="email"
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <label htmlFor="password">Contraseña</label>
                <input
                    id="password"
                    type="password"
                    placeholder="Contraseña"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                {error && <p className="error">{error}</p>}
                <button type="submit">Ingresar</button>
                <div className="login-help">
                    <p>
                        ¿Necesitás ayuda para ingresar?
                    </p>
                </div>
            </form>
        </div>
    );
};

export default LoginPage;
