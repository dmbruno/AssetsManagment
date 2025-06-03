import React, { useEffect, useState } from 'react';
import { FaEdit, FaTrash } from 'react-icons/fa';
import './UsersListPage.css';
import PageTopBar from '../../components/layout/PageTopBar';
import { useNavigate } from 'react-router-dom';




const UserListPage = () => {
  const navigate = useNavigate();
  const [usuarios, setUsuarios] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5001/usuarios')
      .then(res => res.json())
      .then(data => setUsuarios(data))
      .catch(err => console.error('Error:', err));
  }, []);

  const handleEdit = (id) => {
    navigate(`/register/${id}`); 
  };

  const handleDelete = async (id) => {
    const confirm = window.confirm('¿Estás seguro de eliminar este usuario?');
    if (!confirm) return;

    try {
      const res = await fetch(`http://localhost:5001/usuarios/${id}`, {
        method: 'DELETE'
      });
      if (res.ok) {
        setUsuarios(prev => prev.filter(u => u.id !== id));
      }
    } catch (err) {
      console.error('Error eliminando usuario:', err);
    }
  };

  return (
    <div className="user-list-container">
      <PageTopBar title="User Registered" />

      <div className="user-list-content">
        <h2>Usuarios Registrados</h2>
        <div className="user-table-wrapper">
          <table className="user-table">
            <thead>
              <tr>
                <th>Nombre</th>
                <th>Apellido</th>
                <th>Email</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {usuarios.map((user) => (
                <tr
                  key={user.id}
                  className={user.email === 'admin@gmail.com' ? 'admin-row' : ''}
                >
                  <td>{user.nombre}</td>
                  <td>{user.apellido}</td>
                  <td>{user.email}</td>
                  <td>
                    <div className="user-action-group">
                      <button className="user-action-btn user-action-bt-edit" onClick={() => handleEdit(user.id)} title="Editar">
                        <FaEdit />
                      </button>
                      <button className="user-action-btn user-action-btn-delete" onClick={() => handleDelete(user.id)} title="Eliminar">
                        <FaTrash />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default UserListPage;