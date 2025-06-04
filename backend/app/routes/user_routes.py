from flask import Blueprint, request, jsonify, abort
from app.models.user import User
from app import db
import jwt
import datetime
from functools import wraps
import os
from dotenv import load_dotenv

# Cargar variables de entorno desde .env
load_dotenv(os.path.join(os.path.dirname(__file__), '..', '.env'))
SECRET_KEY = os.getenv("SECRET_KEY")

# Decorador para proteger rutas con JWT
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
            data = jwt.decode(token, SECRET_KEY, algorithms=["HS256"])
        except jwt.ExpiredSignatureError:
            return jsonify({'message': 'Token expirado'}), 401
        except Exception:
            return jsonify({'message': 'Token inválido'}), 401
        return f(*args, **kwargs)
    return decorated

user_routes = Blueprint('user_routes', __name__)

@user_routes.route('/usuarios', methods=['GET', 'OPTIONS'])
@token_required
def get_usuarios():
    if request.method == 'OPTIONS':
        return '', 200
    usuarios = User.query.all()
    return jsonify([u.serialize() for u in usuarios])

@user_routes.route('/usuarios/<int:id>', methods=['GET', 'OPTIONS'])
@token_required
def get_usuario(id):
    if request.method == 'OPTIONS':
        return '', 200
    usuario = db.session.get(User, id)
    if not usuario:
        abort(404)
    return jsonify(usuario.serialize())




@user_routes.route('/login', methods=['POST'])
def login():
    data = request.get_json()

    email = data.get('email')
    password = data.get('password')

    if not email or not password:
        return jsonify({'error': 'Email y password son requeridos'}), 400

    user = User.query.filter_by(email=email).first()
    if user is None:
        return jsonify({'error': 'Usuario no encontrado'}), 404

    if not user.check_password(password):
        return jsonify({'error': 'Contraseña incorrecta'}), 401

    # Generar token JWT
    token = jwt.encode({
        'user_id': user.id,
        'exp': datetime.datetime.utcnow() + datetime.timedelta(hours=2)
    }, SECRET_KEY, algorithm="HS256")

    return jsonify({'token': token, 'user': user.serialize()}), 200





@user_routes.route('/usuarios', methods=['POST', 'OPTIONS'])
def create_usuario():
    if request.method == 'OPTIONS':
        return '', 200
    data = request.get_json()

    if User.query.filter_by(email=data['email']).first():
        return jsonify({'error': 'Email ya registrado'}), 409

    nuevo = User(
        nombre=data['nombre'],
        apellido=data['apellido'],
        email=data['email'],
        telefono_celular=data.get('telefono_celular', '')
    )
    nuevo.set_password(data['password'])

    db.session.add(nuevo)
    db.session.commit()
    return jsonify(nuevo.serialize()), 201

@user_routes.route('/usuarios/<int:id>', methods=['PUT', 'OPTIONS'])
@token_required
def update_usuario(id):
    if request.method == 'OPTIONS':
        return '', 200
    user = User.query.get(id)
    if not user:
        return jsonify({'error': 'Usuario no encontrado'}), 404

    data = request.get_json()

    user.nombre = data.get('nombre', user.nombre)
    user.apellido = data.get('apellido', user.apellido)
    user.email = data.get('email', user.email)
    user.telefono_celular = data.get('telefono_celular', user.telefono_celular)

    if 'password' in data and data['password'].strip():
        user.set_password(data['password'])  

    db.session.commit()
    return jsonify(user.serialize()), 200

@user_routes.route('/usuarios/<int:id>', methods=['DELETE', 'OPTIONS'])
@token_required
def delete_usuario(id):
    if request.method == 'OPTIONS':
        return '', 200
    usuario = db.session.get(User, id)
    if not usuario:
        abort(404)

    db.session.delete(usuario)
    db.session.commit()
    return jsonify({'message': 'Usuario eliminado'})