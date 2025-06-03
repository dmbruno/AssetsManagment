import pytest
import sys
import os
import uuid

# Ajustar el path para importar desde /backend/app
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

def test_delete_usuario_cascada(client):
    # 1. Crear usuario con email único
    email = f"{uuid.uuid4()}@test.com"
    response_user = client.post('/usuarios', json={
        'email': email,
        'password_hash': 'clave123'
    })
    assert response_user.status_code == 201
    user_id = response_user.get_json()['id']

    # 2. Crear asset para ese usuario
    response_asset = client.post('/activos', json={
        'name': 'Apple',
        'symbol': 'AAPL',
        'type': 'acción',
        'user_id': user_id
    })
    assert response_asset.status_code == 201
    asset_id = response_asset.get_json()['id']

    # 3. Crear transacción vinculada al asset
    response_trx = client.post('/transacciones', json={
        'asset_id': asset_id,
        'user_id': user_id,
        'type': 'buy',
        'quantity': 5,
        'price': 150
    })
    assert response_trx.status_code == 201

    # 4. Eliminar usuario
    delete_response = client.delete(f'/usuarios/{user_id}')
    assert delete_response.status_code == 200

    # 5. Confirmar que el usuario no existe
    check_user = client.get(f'/usuarios/{user_id}')
    assert check_user.status_code == 404

    # 6. Confirmar que el asset no existe
    check_asset = client.get(f'/activos/{asset_id}')
    assert check_asset.status_code == 404

    # Si en el futuro implementás un GET /transacciones/{id}, podrías validar también que la transacción fue eliminada