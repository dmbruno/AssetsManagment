from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
from sqlalchemy import event
from sqlalchemy.engine import Engine
import sqlite3

db = SQLAlchemy()

# Activar claves foráneas en SQLite
@event.listens_for(Engine, "connect")
def enable_sqlite_foreign_keys(dbapi_connection, connection_record):
    if isinstance(dbapi_connection, sqlite3.Connection):
        cursor = dbapi_connection.cursor()
        cursor.execute("PRAGMA foreign_keys=ON")
        cursor.close()

def create_app():
    app = Flask(__name__)
    app.config.from_object("app.config.Config")  # Asegurate que apunta al config.py correcto

    db.init_app(app)
    # Configuración CORS para permitir requests desde el frontend
    CORS(app, supports_credentials=True, resources={r"/*": {"origins": ["http://localhost:5173"]}})

    # Importar modelos (estos deben existir)
    from app.models.user import User
    from app.models.asset import Asset
    from app.models.transaction import Transaction

    # Registrar blueprints
    from app.routes import routes
    app.register_blueprint(routes)

    with app.app_context():
        db.create_all()  # <--- Este comando crea las tablas

    return app