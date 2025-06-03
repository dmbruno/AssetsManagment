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

def test_crear_transaccion(client):
    # Crear usuario y activo
    client.post('/usuarios', json={
        'email': 'trx_test_002@ejemplo.com',
        'password_hash': 'abc'
    })

    client.post('/activos', json={
        'name': 'Ethereum',
        'symbol': 'ETH',
        'type': 'crypto',
        'user_id': 1
    })

    response = client.post('/transacciones', json={
        'asset_id': 1,
        'user_id': 1,
        'type': 'buy',
        'quantity': 2.5,
        'price': 2200.00
    })

    assert response.status_code == 201
    data = response.get_json()
    assert data['type'] == 'buy'
    assert data['quantity'] == 2.5