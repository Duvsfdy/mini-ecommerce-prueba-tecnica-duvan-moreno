# Mini Ecommerce

Aplicación de comercio electrónico desarrollada como prueba técnica. Incluye un catálogo de productos, carrito de compras con persistencia local, y almacenamiento de compras en base de datos SQLite.

## Tech Stack

### Frontend

- **React 19.2.0** - Biblioteca de UI
- **TypeScript** - Tipado estático
- **Vite 7.2.4** - Build tool y dev server
- **CSS3** - Estilos personalizados (sin frameworks)

### Backend

- **Python 3.x** - Lenguaje de programación
- **FastAPI** - Framework web moderno y rápido
- **SQLite** - Base de datos para persistencia
- **Uvicorn** - Servidor ASGI
- **Pydantic** - Validación de datos

## Estructura del Proyecto

```
mini-ecommerce/
├── backend/
│   ├── main.py           # API FastAPI con endpoints
│   ├── ecommerce.db      # Base de datos SQLite
│   └── venv/             # Entorno virtual de Python
│
└── frontend/
    ├── src/
    │   ├── components/
    │   │   ├── Cart.tsx           # Componente del carrito
    │   │   ├── CartItem.tsx       # Item individual del carrito
    │   │   ├── Header.tsx         # Encabezado de la app
    │   │   ├── MisComprasModal.tsx # Modal de compras guardadas
    │   │   ├── ProductCard.tsx    # Tarjeta de producto
    │   │   ├── ProductList.tsx    # Grid de productos
    │   │   └── Toast.tsx          # Notificaciones
    │   ├── App.tsx        # Componente principal con lógica
    │   ├── App.css        # Estilos globales
    │   ├── types.ts       # Tipos TypeScript
    │   └── main.tsx       # Punto de entrada
    ├── index.html
    ├── package.json
    └── vite.config.ts
```

## Instalación

### Backend

1. Navega a la carpeta del backend:

```bash
cd backend
```

2. Crea un entorno virtual de Python:

```bash
python -m venv venv
```

3. Activa el entorno virtual:

**Windows (PowerShell):**

```powershell
.\venv\Scripts\Activate.ps1
```

**Windows (CMD):**

```cmd
venv\Scripts\activate.bat
```

**Linux/Mac:**

```bash
source venv/bin/activate
```

4. Instala las dependencias:

```bash
pip install fastapi uvicorn pydantic
```

### Frontend

1. Navega a la carpeta del frontend:

```bash
cd frontend
```

2. Instala las dependencias con npm:

```bash
npm install
```

## Ejecución

### Backend

1. Asegúrate de estar en la carpeta `backend` con el entorno virtual activado
2. Ejecuta el servidor:

```bash
python -m uvicorn main:app --reload
```

El backend estará disponible en: `http://127.0.0.1:8000`

### Frontend

1. En otra terminal, navega a la carpeta `frontend`
2. Ejecuta el servidor de desarrollo:

```bash
npm run dev
```

El frontend estará disponible en: `http://localhost:5173`

## 📡 API Endpoints

### `GET /products`

Obtiene la lista de productos disponibles.

**Response:**

```json
[
  { "id": 1, "name": "Producto A", "price": 100.0 },
  { "id": 2, "name": "Producto B", "price": 150.0 },
  { "id": 3, "name": "Producto C", "price": 200.0 }
]
```

### `POST /cart`

Guarda un carrito de compras en la base de datos.

**Request Body:**

```json
{
  "items": [
    { "product_id": 1, "quantity": 2 },
    { "product_id": 3, "quantity": 1 }
  ]
}
```

**Response:**

```json
{
  "message": "Carrito guardado exitosamente",
  "cart_id": 1,
  "total": 400.0
}
```

### `GET /carts`

Obtiene todos los carritos guardados, ordenados por fecha descendente.

**Response:**

```json
[
  {
    "id": 1,
    "items": [
      { "product_id": 1, "quantity": 2 },
      { "product_id": 3, "quantity": 1 }
    ],
    "total": 400.0,
    "created_at": "2026-01-09T10:30:00"
  }
]
```

## ✨ Funcionalidades

### Implementadas

**Catálogo de productos** - Grid con diseño de cards moderno
**Carrito de compras** - Agregar, quitar y modificar cantidades
**Persistencia local** - El carrito se guarda en `localStorage`
**Guardar compras** - Almacenamiento en base de datos SQLite
**Historial de compras** - Modal "Mis Compras" con scroll controlado
**Notificaciones** - Toast personalizado con animaciones
**Responsive design** - Interfaz adaptable a diferentes pantallas
**Arquitectura de componentes** - Código modular y reutilizable

### Características Técnicas

- **Auto-eliminación**: Los productos con cantidad 1 se eliminan automáticamente al decrementar
- **Scroll bloqueado**: Al abrir el modal, el scroll de fondo se bloquea
- **Límite visual**: El modal muestra 4 registros inicialmente, el resto es scrolleable
- **Validación de datos**: Pydantic valida los datos en el backend
- **CORS configurado**: Permite peticiones desde `localhost:5173`
- **Hot reload**: Tanto frontend como backend se actualizan automáticamente

## Decisiones de Arquitectura

### Frontend

1. **React + TypeScript**: Elegidos por tipado estático, mejor experiencia de desarrollo y detección temprana de errores.

2. **Vite**: Build tool moderno con HMR ultrarrápido, configuración mínima y excelente DX.

3. **Arquitectura de componentes**:

   - Separación de responsabilidades (presentación vs lógica)
   - Componentes reutilizables y testables
   - Props tipadas para mayor seguridad
   - Un componente por archivo para mejor organización

4. **CSS sin frameworks**:

   - Control total sobre los estilos
   - Sin dependencias adicionales
   - Diseño personalizado con animaciones suaves
   - Nomenclatura semántica de clases

5. **localStorage**: Persiste el carrito entre sesiones sin necesidad de autenticación.

### Backend

1. **FastAPI**:

   - Framework moderno con tipado automático
   - Documentación automática (Swagger UI)
   - Alto rendimiento (basado en ASGI)
   - Validación de datos con Pydantic

2. **SQLite**:

   - Base de datos embebida sin configuración
   - Perfecta para prototipos y pruebas técnicas
   - Almacenamiento JSON nativo para items del carrito

3. **Estructura simple**:
   - Un solo archivo `main.py` para facilitar revisión
   - Inicialización automática de la BD al arrancar
   - Endpoints RESTful siguiendo convenciones

### Mejoras Futuras

- Autenticación de usuarios (JWT)
- Paginación en el historial de compras
- Filtros y búsqueda de productos
- Confirmación de compra con generación de PDF
- Tests unitarios y de integración
- Despliegue en la nube (Azure, AWS, etc.)
- Migracion a PostgreSQL para producción

## Notas

- La base de datos se crea automáticamente en `backend/ecommerce.db` al iniciar el servidor por primera vez
- Los datos del carrito se almacenan en `localStorage` del navegador
- El total se calcula automáticamente en el backend basándose en los precios actuales de los productos

## Autor

Desarrollado como prueba técnica por Duvan Santiago Moreno Sanchez - 9 de Enero de 2026
