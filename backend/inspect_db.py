from app import create_app, db
from app.models.user import User

app = create_app()

with app.app_context():
    # Mostrar todas las tablas
    tables = db.engine.table_names() if hasattr(db.engine, 'table_names') else db.engine.table_names()
    print("Tablas en la base de datos:", tables)

    # Mostrar todos los usuarios
    users = User.query.all()
    print("Usuarios:")
    for user in users:
        print(f"ID: {user.id}, Email: {user.email}, Password Hash: {user.password_hash}")
