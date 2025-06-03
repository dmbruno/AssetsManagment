from flask import Blueprint, request, jsonify, abort
from app.models.asset import Asset
from app import db
import os
import jwt
from functools import wraps
from dotenv import load_dotenv

# Cargar variables de entorno desde .env
load_dotenv(os.path.join(os.path.dirname(__file__), '..', '..', '.env'))
SECRET_KEY = os.getenv("SECRET_KEY")
print("SECRET_KEY:", SECRET_KEY)

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

asset_routes = Blueprint('asset_routes', __name__, url_prefix='/activos')

@asset_routes.route('', methods=['GET', 'OPTIONS'])
@asset_routes.route('/', methods=['GET', 'OPTIONS'])
@token_required
def get_activos():
    if request.method == 'OPTIONS':
        return '', 200

    user_id = request.args.get('user_id', type=int)
    query = Asset.query
    if user_id:
        query = query.filter_by(user_id=user_id)
    activos = query.all()
    return jsonify([a.serialize() for a in activos])

@asset_routes.route('/<int:id>', methods=['GET', 'OPTIONS'])
@token_required
def get_activo(id):
    if request.method == 'OPTIONS':
        return '', 200

    activo = db.session.get(Asset, id)
    if not activo:
        abort(404)
    return jsonify(activo.serialize())

@asset_routes.route('', methods=['POST', 'OPTIONS'])
@asset_routes.route('/', methods=['POST', 'OPTIONS'])
@token_required
def create_activo():
    if request.method == 'OPTIONS':
        return '', 200

    data = request.get_json()
    nuevo = Asset(**data)
    db.session.add(nuevo)
    db.session.commit()
    return jsonify(nuevo.serialize()), 201

@asset_routes.route('/<int:id>', methods=['PUT', 'OPTIONS'])
@token_required
def update_activo(id):
    if request.method == 'OPTIONS':
        return '', 200

    activo = db.session.get(Asset, id)
    if not activo:
        abort(404)

    data = request.get_json()
    for key, value in data.items():
        setattr(activo, key, value)

    db.session.commit()
    return jsonify(activo.serialize())

@asset_routes.route('/<int:id>', methods=['DELETE', 'OPTIONS'])
@token_required
def delete_activo(id):
    if request.method == 'OPTIONS':
        return '', 200

    activo = db.session.get(Asset, id)
    if not activo:
        abort(404)

    db.session.delete(activo)
    db.session.commit()
    return jsonify({'message': 'Activo eliminado'})