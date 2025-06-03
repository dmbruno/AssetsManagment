from flask import Blueprint, request, jsonify, abort
from app.models.transaction import Transaction
from app import db
from datetime import datetime
import os
import jwt
from functools import wraps
from dotenv import load_dotenv

# Cargar variables de entorno desde .env
load_dotenv(os.path.join(os.path.dirname(__file__), '..', '.env'))
SECRET_KEY = os.getenv("SECRET_KEY")

# Decorador para proteger rutas con JWT (igual que en user_routes)
def token_required(f):
    @wraps(f)
    def decorated(*args, **kwargs):
        if request.method == 'OPTIONS':
            return '', 200
        token = None
        if 'Authorization' in request.headers:
            parts = request.headers['Authorization'].split()
            if len(parts) == 2 and parts[0] == 'Bearer':
                token = parts[1]
        if not token:
            return jsonify({'message': 'Token requerido'}), 401
        try:
            jwt.decode(token, SECRET_KEY, algorithms=["HS256"])
        except jwt.ExpiredSignatureError:
            return jsonify({'message': 'Token expirado'}), 401
        except Exception:
            return jsonify({'message': 'Token inválido'}), 401
        return f(*args, **kwargs)
    return decorated

transaction_routes = Blueprint('transaction_routes', __name__, url_prefix='/transacciones')

@transaction_routes.route('', methods=['GET', 'OPTIONS'])
@transaction_routes.route('/', methods=['GET', 'OPTIONS'])
@token_required
def get_transacciones():
    if request.method == 'OPTIONS':
        return '', 200

    user_id = request.args.get('user_id', type=int)
    if user_id:
        query = Transaction.query.filter_by(user_id=user_id)
    else:
        query = Transaction.query
    transacciones = query.all()
    return jsonify([t.serialize() for t in transacciones])

@transaction_routes.route('/<int:id>', methods=['GET', 'OPTIONS'])
@token_required
def get_transaccion(id):
    if request.method == 'OPTIONS':
        return '', 200

    transaccion = db.session.get(Transaction, id)
    if not transaccion:
        abort(404)
    return jsonify(transaccion.serialize())

@transaction_routes.route('', methods=['POST', 'OPTIONS'])
@transaction_routes.route('/', methods=['POST', 'OPTIONS'])
@token_required
def create_transaccion():
    if request.method == 'OPTIONS':
        return '', 200

    data = request.get_json()
    if data.get('type') not in ['buy', 'sell']:
        return jsonify({"error": "Tipo inválido. Debe ser 'buy' o 'sell'"}), 400
    try:
        quantity = float(data.get('quantity', 0))
        price = float(data.get('price', 0))
        if quantity <= 0 or price <= 0:
            raise ValueError
    except (TypeError, ValueError):
        return jsonify({"error": "Cantidad y precio deben ser números positivos"}), 400
    try:
        data['date'] = datetime.strptime(data['date'], "%Y-%m-%d").date()
    except (KeyError, ValueError):
        return jsonify({"error": "Fecha inválida. Usa formato YYYY-MM-DD"}), 400
    nueva = Transaction(**data)
    db.session.add(nueva)
    db.session.commit()
    return jsonify(nueva.serialize()), 201

@transaction_routes.route('/<int:id>', methods=['PUT', 'OPTIONS'])
@token_required
def update_transaccion(id):
    if request.method == 'OPTIONS':
        return '', 200

    transaccion = db.session.get(Transaction, id)
    if not transaccion:
        abort(404)
    data = request.get_json()
    if data.get('type') not in ['buy', 'sell']:
        return jsonify({"error": "Tipo inválido. Debe ser 'buy' o 'sell'"}), 400
    try:
        quantity = float(data.get('quantity', 0))
        price = float(data.get('price', 0))
        if quantity <= 0 or price <= 0:
            raise ValueError
    except (TypeError, ValueError):
        return jsonify({"error": "Cantidad y precio deben ser números positivos"}), 400
    try:
        data['date'] = datetime.strptime(data['date'], "%Y-%m-%d").date()
    except (KeyError, ValueError):
        return jsonify({"error": "Fecha inválida. Usa formato YYYY-MM-DD"}), 400
    for key, value in data.items():
        setattr(transaccion, key, value)
    db.session.commit()
    return jsonify(transaccion.serialize())

@transaction_routes.route('/<int:id>', methods=['DELETE', 'OPTIONS'])
@token_required
def delete_transaccion(id):
    if request.method == 'OPTIONS':
        return '', 200

    transaccion = db.session.get(Transaction, id)
    if not transaccion:
        abort(404)
    db.session.delete(transaccion)
    db.session.commit()
    return jsonify({'message': 'Transacción eliminada'})