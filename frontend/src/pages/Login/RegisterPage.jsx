// src/pages/Register/RegisterPage.jsx
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import './RegisterPage.css';
import PageTopBar from '../../components/layout/PageTopBar';
import { authFetch } from '../../app/api'; // Asegúrate de importar authFetch

const RegisterPage = () => {
  const { id } = useParams();
  const isEditMode = Boolean(id); 
  const currentUser = useSelector(state => state.users.currentUser);
  const navigate = useNavigate();

  const [formValues, setFormValues] = useState({
    nombre: '',
    apellido: '',
    email: '',
    telefono_celular: '',
    password: ''
  });

  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  // ⚡ Cargar datos si está en modo edición
  useEffect(() => {
    if (id) {
      authFetch(`/usuarios/${id}`)
        .then(res => res.json())
        .then(data => setFormValues(data))
        .catch(err => console.error('Error cargando usuario:', err));
    }
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(false);
  
    const payload = { ...formValues };
  
    // Si es edición, y no se cambió la contraseña, eliminá el campo password
    if (isEditMode && (!payload.password || payload.password.trim() === "")) {
      delete payload.password;
    }
  
    const endpoint = isEditMode
      ? `/usuarios/${id}`
      : `/usuarios`;
  
    const method = isEditMode ? "PUT" : "POST";
  
    try {
      const response = await authFetch(endpoint, {
        method,
        body: JSON.stringify(payload)
      });
      console.log('Respuesta del backend:', response);
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        console.error('Error al guardar usuario:', errorData);
        throw new Error(errorData.error || "Error al guardar el usuario.");
      }
      setSuccess(true);
      setTimeout(() => navigate('/usuarios'), 1000);
    } catch (err) {
      setError(err.message);
      console.error('Error en handleSubmit:', err);
    }
  };

  return (
    <div className="register-container">
      <PageTopBar title={id ? 'Edit User' : 'User Register'} />
      <div className="register-content">
        <h1 className="register-title">{id ? 'Editar Usuario' : 'Registro de Usuario'}</h1>
        <form onSubmit={handleSubmit} className="register-form">
          <input name="nombre" placeholder="Nombre" value={formValues.nombre} onChange={handleChange} required />
          <input name="apellido" placeholder="Apellido" value={formValues.apellido} onChange={handleChange} required />
          <input name="email" type="email" placeholder="Email" value={formValues.email} onChange={handleChange} required />
          <input name="telefono_celular" placeholder="Teléfono Celular" value={formValues.telefono_celular} onChange={handleChange} />
          <input name="password" type="password" placeholder="Contraseña" value={formValues.password} onChange={handleChange} required />
          {error && <p className="error">{error}</p>}
          {success && <p className="success">Usuario {id ? 'actualizado' : 'registrado'} correctamente</p>}
          <div className="register-action-buttons">
            <button type="submit" className="register-btn">{id ? 'Actualizar' : 'Registrar'}</button>
            <button
              className="register-view-users-btn"
              type="button"
              onClick={() => navigate('/usuarios')}
            >
              Ver Usuarios
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RegisterPage;