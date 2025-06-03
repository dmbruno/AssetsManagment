# 📘 Assets Management API

Backend RESTful para gestión de inversiones personales. Incluye soporte para usuarios, activos y transacciones, con relaciones, cascada y endpoints CRUD completos.

---

## 🔧 Tecnologías utilizadas

- **Lenguaje:** Python 3.x  
- **Framework Backend:** Flask  
- **ORM:** SQLAlchemy  
- **Base de Datos:** SQLite (local), lista para migrar a PostgreSQL  
- **Estilos REST:** CRUD completo  
- **CORS:** habilitado para desarrollo frontend (React)  
- **Frontend planeado:** React + Tailwind (mobile-first)

---

## 📁 Estructura del proyecto

```
backend/
├── app/
│   ├── __init__.py
│   ├── config.py
│   ├── models/
│   │   ├── user.py
│   │   ├── asset.py
│   │   └── transaction.py
│   ├── routes/
│   │   ├── __init__.py
│   │   ├── user_routes.py
│   │   ├── asset_routes.py
│   │   └── transaction_routes.py
├── instance/
│   └── portfolio.db
├── create_db.py
└── run.py
```

---

## 🔌 Endpoints REST por recurso

### 👤 Usuarios (`/usuarios`)

| Método | Ruta               | Descripción              |
|--------|--------------------|--------------------------|
| GET    | `/usuarios`        | Listar todos los usuarios |
| GET    | `/usuarios/<id>`   | Obtener usuario por ID    |
| POST   | `/usuarios`        | Crear nuevo usuario       |
| PUT    | `/usuarios/<id>`   | Editar usuario            |
| DELETE | `/usuarios/<id>`   | Borrar usuario + cascade  |

### 📦 Activos (`/activos`)

| Método | Ruta              | Descripción              |
|--------|-------------------|--------------------------|
| GET    | `/activos`        | Listar activos           |
| GET    | `/activos/<id>`   | Obtener activo por ID    |
| POST   | `/activos`        | Crear nuevo activo       |
| PUT    | `/activos/<id>`   | Editar activo            |
| DELETE | `/activos/<id>`   | Eliminar activo          |

### 💰 Transacciones (`/transacciones`)

| Método | Ruta                   | Descripción               |
|--------|------------------------|---------------------------|
| GET    | `/transacciones`       | Listar transacciones      |
| GET    | `/transacciones/<id>`  | Obtener por ID            |
| POST   | `/transacciones`       | Crear nueva transacción   |
| PUT    | `/transacciones/<id>`  | Editar transacción        |
| DELETE | `/transacciones/<id>`  | Eliminar transacción      |

---

## 🔄 Relación entre modelos

- **User 1:N Asset**
- **User 1:N Transaction**
- **Asset 1:N Transaction**

Con **cascade delete** desde `User → Asset → Transaction`

---

## ⚙️ Configuración de base de datos

```python
SQLALCHEMY_DATABASE_URI = 'sqlite:///instance/portfolio.db'
```

Con foreign key constraints activadas:

```python
@event.listens_for(Engine, "connect")
def enable_sqlite_foreign_keys(...):
```

---

## 🧪 Datos de prueba

### Crear usuario

```json
{
  "email": "usuario1@example.com",
  "password_hash": "123456"
}
```

### Crear activo

```json
{
  "name": "Apple Inc.",
  "symbol": "AAPL",
  "type": "stock",
  "user_id": 1
}
```

### Crear transacción

```json
{
  "asset_id": 1,
  "user_id": 1,
  "type": "buy",
  "quantity": 10,
  "price": 172.5
}
```

---

## 🚀 Script para crear base

Archivo: `create_db.py`

```python
from app import create_app, db
app = create_app()

with app.app_context():
    db.drop_all()
    db.create_all()
    print("✅ Base creada")
```

---

## ✅ Estado actual

- [x] Backend funcional con Flask  
- [x] CRUD completo para User, Asset, Transaction  
- [x] Eliminación en cascada verificada  
- [x] API lista para frontend

---

## 🔒 Autenticación y protección de rutas (JWT)

- El login (`/login`) genera un token JWT firmado con una clave secreta (`SECRET_KEY` del archivo `.env`).
- El token incluye el `user_id` y una expiración.
- El frontend debe enviar el token en el header `Authorization: Bearer <token>` en cada request protegida.
- Todas las rutas sensibles (usuarios, activos, transacciones) están protegidas con un decorador que valida el JWT.
- Si el token es inválido o expiró, la API responde 401.
- Las peticiones preflight (CORS/OPTIONS) están permitidas sin autenticación para compatibilidad con el frontend.

---

## ✅ Tests Automáticos

Este proyecto incluye una suite de tests automáticos con `pytest` para validar el correcto funcionamiento de las rutas principales de la API REST.

### 🧪 Tecnologías utilizadas

- `pytest`
- `Flask` (modo testing)
- `SQLite` en memoria (`sqlite:///:memory:`)

---

### 📁 Estructura de tests

Los tests están organizados por entidad y se ubican dentro del directorio:

    backend/tests/
        test_usuarios.py         # Tests CRUD de usuarios
        test_activos.py          # Tests CRUD de activos
        test_transacciones.py    # Tests CRUD de transacciones
        test_cascade.py          # Test de eliminación en cascada


---

### ▶️ Cómo ejecutar los tests


## 🧪 Tests automatizados

Este proyecto cuenta con pruebas unitarias utilizando `pytest` para validar la funcionalidad de los endpoints de usuarios, activos, transacciones y borrado en cascada.

> ⚙️ Las pruebas usan una base de datos en memoria (`sqlite:///:memory:`), por lo que no afectan la base de datos real.

### ▶️ Ejecutar todos los tests

Desde la raíz del proyecto, con el entorno virtual activado:

```bash
pytest backend/tests
```

### 🔍 Ejecutar tests por módulo

Podés correr un archivo de test individual:

```bash
pytest backend/tests/test_usuarios.py
pytest backend/tests/test_activos.py
pytest backend/tests/test_transacciones.py
pytest backend/tests/test_cascade.py
```





## 👤 Autor

**Diego M. Bruno**  
🧑‍💻 *Full Stack Developer*  
📱 +54 387 505 1112  
📧 [dmbruno61@gmail.com](mailto:dmbruno61@gmail.com)  
🔗 [LinkedIn](https://www.linkedin.com/in/diego-martin-bruno/)  
💻 [GitHub](https://github.com/dmbruno)


---