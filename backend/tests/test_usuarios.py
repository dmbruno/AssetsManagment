import pytest
import sys
import os
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), '..')))

from app import create_app, db

@pytest.fixture
def client():
    app = create_app()
    app.config['TESTING'] = True
    app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///:memory:'

    with app.app_context():
        db.create_all()

    with app.test_client() as client:
        yield client

def test_crear_usuario(client):
    response = client.post('/usuarios', json={
        'email': 'testDeUsuario2@ejemplo.com',
        'password_hash': 'clave123'
    })

    assert response.status_code == 201
    data = response.get_json()
    assert data['email'] == 'testDeUsuario2@ejemplo.com'