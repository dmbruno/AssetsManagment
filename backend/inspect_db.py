from app import create_app, db
from app.models.user import User
from werkzeug.security import generate_password_hash

app = create_app()

with app.app_context():
    # Mostrar todas las tablas
    from sqlalchemy import inspect
    inspector = inspect(db.engine)
    tables = inspector.get_table_names()
    print("Tablas en la base de datos:", tables)

    # Mostrar todos los usuarios
    users = User.query.all()
    print("Usuarios:")
    for user in users:
        print(f"ID: {user.id}, Email: {user.email}, Password Hash: {user.password_hash}")

    email = "admin@gmail.com"
    new_password = "admin123"
    user = User.query.filter_by(email=email).first()
    if user:
        user.password_hash = generate_password_hash(new_password)
        db.session.commit()
        print(f"Contraseña de {email} actualizada correctamente.")
    else:
        print(f"Usuario {email} no encontrado.")
