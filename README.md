# 📊 Assets Management - Fullstack App

Gestor de portafolios de inversión personal desarrollado con **Flask** (backend, Python) y **React** (frontend, JavaScript). Permite registrar usuarios, activos, transacciones, y visualizar métricas clave de tu portafolio.

---

## 🏗️ Estructura del Proyecto

```
AssetsManagment/
├── backend/      # API RESTful en Flask (Python)
├── frontend/     # Interfaz de usuario en React (Vite)
├── README.md     # (Este archivo)
```

---

## 🚀 ¿Qué incluye esta app?

- **Autenticación JWT**: Login seguro, protección de rutas y manejo de sesión.
- **Gestión de usuarios**: Registro, edición y eliminación de usuarios.
- **Gestión de activos**: Alta, baja, edición y consulta de activos (acciones, bonos, cripto, etc).
- **Transacciones**: Registro de compras y ventas, historial y edición.
- **Cálculo de métricas**: PnL, valor actual, cantidad disponible, precios promedio, etc.
- **Protección de rutas**: Tanto en backend (Flask) como en frontend (React).
- **CORS seguro**: Comunicación frontend-backend sin problemas de preflight.

---

## ⚙️ Instalación y ejecución

### 1. Clona el repositorio

```bash
# Clona el proyecto
$ git clone <url-del-repo>
$ cd AssetsManagment
```

### 2. Backend (Flask)

```bash
cd backend
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt
# Configura tu .env con SECRET_KEY
python run.py  # o flask run
```

- El backend corre por defecto en `http://localhost:5001`

### 3. Frontend (React + Vite)

```bash
cd frontend
npm install
npm run dev
```

- El frontend corre por defecto en `http://localhost:5173`

---

## 🔒 Seguridad y JWT

- El login genera un token JWT que se guarda en el frontend y se envía en cada request protegida.
- El backend valida el token en cada endpoint privado.
- Las rutas privadas en React solo son accesibles si hay token válido.
- CORS y preflight están correctamente configurados.

---

## 📁 Documentación adicional

- Documentación específica de backend: [`backend/readme.md`](backend/readme.md)
- Documentación específica de frontend: [`frontend/README.md`](frontend/README.md)

---

## 👨‍💻 Autor

- **Diego Bruno**

  - 📞 Teléfono: [387505112](tel:387505112)
  - ✉️ Email: [dmbruno61@gmail.com](mailto:dmbruno61@gmail.com)
  - [![LinkedIn](https://img.shields.io/badge/LinkedIn-blue?logo=linkedin)](https://www.linkedin.com/in/diego-martin-bruno/)
  - [![GitHub](https://img.shields.io/badge/GitHub-black?logo=github)](https://github.com/dmbruno)

---

## 📝 Licencia

MIT
