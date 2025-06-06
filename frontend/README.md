# 📘 Assets Management Frontend

Interfaz de usuario web para la gestión de portafolios personales. Permite agregar, editar y consultar activos, registrar compras y ventas, y visualizar métricas clave como cantidad disponible, PnL, y precios actuales.

---

## 💻 Tecnologías utilizadas

- **Framework:** React  
- **Routing:** React Router DOM  
- **State Management:** Redux Toolkit + Reselect  
- **Estilos:** CSS Modules / Tailwind-ready  
- **Bundler:** Vite  
- **Íconos:** React Icons  
- **Consumo de API:** `fetch()` (REST API)

---

## 🧭 Funcionalidades principales

| Módulo       | Funcionalidad                                      |
|--------------|-----------------------------------------------------|
| Portfolio    | Vista general del portafolio (cards por activo)     |
| Activo       | Detalle, historial, edición y transacciones         |
| Transacciones| Historial global con filtros por tipo y activo      |
| Agregado     | Formulario para registrar nuevo activo + compra     |
| Venta        | Registro de venta, validando stock disponible       |
| Histórico    | Vista detallada con PnL, precios promedio, etc.     |

---

## 📁 Estructura del proyecto

```
frontend/
├── public/
│   └── vite.svg
├── src/
│   ├── app/               # Configuración de Redux store
│   ├── assets/            # Imágenes o íconos
│   ├── components/        # Componentes reutilizables
│   ├── features/          # Slices de Redux (assets, transactions)
│   ├── layout/            # Layout general, footer, topbars
│   ├── pages/             # Vistas principales
│   ├── routes/            # Configuración de rutas
│   ├── styles/            # Estilos generales o temas
│   └── main.jsx           # Entry point de React
├── package.json
└── vite.config.js
```

---

## ⚙️ Scripts de desarrollo

### ▶️ Iniciar servidor de desarrollo

```bash
cd frontend
npm install
npm run dev
```

> Esto inicia la app en `http://localhost:5173` por defecto (Vite).

---

## 🌐 Conexión con backend

- El frontend se conecta al backend vía HTTP (CORS habilitado).
- Todas las peticiones apuntan a `http://localhost:5001/` (Flask).

Ejemplo de fetch para registrar transacción:

```js
await fetch('http://localhost:5001/transacciones', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(transactionData)
});
```

---

## 🔒 Autenticación y protección de rutas (JWT)

- El login obtiene un token JWT desde el backend y lo guarda en localStorage.
- Todas las peticiones protegidas usan la utilidad `authFetch`, que agrega el token en el header `Authorization: Bearer <token>`.
- Las rutas privadas de la app están protegidas con el componente `PrivateRoute`, que solo permite el acceso si hay un token válido.
- Si el token es inválido o expiró, el usuario es redirigido automáticamente a la pantalla de login.

---

## 🧪 Estado actual

- [x] Portfolio completo con activos agrupados  
- [x] CRUD de transacciones (compra y venta)  
- [x] Edición y eliminación de transacciones  
- [x] PnL calculado en tiempo real según precio actual  
- [x] Vista histórica con todos los movimientos  
- [x] Filtros por tipo, nombre y categoría  





## 👤 Autor

**Diego M. Bruno**  
🧑‍💻 *Full Stack Developer*  
📱 +54 387 505 1112  
📧 [dmbruno61@gmail.com](mailto:dmbruno61@gmail.com)  
🔗 [LinkedIn](https://www.linkedin.com/in/diego-martin-bruno/)  
💻 [GitHub](https://github.com/dmbruno)

---

## 🔗 Integración con backend◊

> Ver documentación completa del backend en  
📄 [`/backend/README.md`](../backend/README.md)
