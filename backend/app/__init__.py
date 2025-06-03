from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS

# Agregado para activar claves foráneas en SQLite
from sqlalchemy import event
from sqlalchemy.engine import Engine
import sqlite3

db = SQLAlchemy()

# Activar PRAGMA foreign_keys = ON en SQLite
@event.listens_for(Engine, "connect")
def enable_sqlite_foreign_keys(dbapi_connection, connection_record):
    if isinstance(dbapi_connection, sqlite3.Connection):
        cursor = dbapi_connection.cursor()
        cursor.execute("PRAGMA foreign_keys=ON")
        
        cursor.close()

def create_app():
    app = Flask(__name__)
    app.config.from_object("app.config.Config")

    db.init_app(app)
    CORS(app)

    # ✅ Importar modelos
    from app.models.user import User
    from app.models.asset import Asset
    from app.models.transaction import Transaction

    # ✅ Registrar cada blueprint explícitamente
    from app.routes.transaction_routes import transaction_routes
    from app.routes.asset_routes import asset_routes
    from app.routes.user_routes import user_routes

    app.register_blueprint(transaction_routes)
    app.register_blueprint(asset_routes)
    app.register_blueprint(user_routes)

    with app.app_context():
        db.create_all()

    return app