from app import create_app, db

app = create_app()

with app.app_context():
    try:
        db.create_all()
        print("✅ Base de datos y tablas creadas correctamente.")
    except Exception as e:
        print("❌ Error al crear la base de datos:", e)