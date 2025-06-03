import os

# Crear la carpeta 'instance/' si no existe (necesario para SQLite en Render y otros hosts)
instance_path = os.path.join(os.path.dirname(__file__), 'instance')
os.makedirs(instance_path, exist_ok=True)

from app import create_app

app = create_app()


if __name__ == "__main__":
    app.run(debug=True, port=5001)