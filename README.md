# 🛒 Ecommerce — React + Vite

Este proyecto es una **aplicación de frontend** construida en React que simula una tienda online con las siguientes funcionalidades:

- Visualización de productos.
- Filtro de búsqueda por distintos campos.
- Compra de productos.
- Devolución de productos por unidad.
- Persistencia de datos mediante localStorage y Zustand.

## ⚙️ Requisitos previos

- Tener instalado **Node.js v22 o superior**:  
  Descargalo desde [nodejs.org](https://nodejs.org/en/download).

## 🚀 Instalación y ejecución

1. **Instalar dependencias**  
   En la terminal, ubicarse en la raíz del proyecto y ejecutar:

   ```bash
   npm install
   ```

2. **Iniciar el proyecto en modo desarrollo**

   ```bash
   npm run dev
   ```

   El proyecto se abrirá automáticamente en `http://localhost:5173`.

## 📦 Librerías utilizadas

- **React Router DOM**  
  Para el manejo de rutas y navegación entre vistas.  
  [https://reactrouter.com](https://reactrouter.com)

- **Zustand**  
  Para gestión de estado global con persistencia en localStorage.  
  [https://zustand-demo.pmnd.rs](https://zustand-demo.pmnd.rs)

## 🧩 Componentes y funcionalidades

### `App.jsx`
- Configura las rutas principales de la aplicación.
- Usa `React Router` para navegación entre vistas.

### `main.jsx`
- Punto de entrada de la aplicación.
- Renderiza `<App />`.

### `Navbar.jsx`
- Muestra la navegación principal.
- Incluye links a páginas y contador de productos en el carrito.

### `ProductCard.jsx`
- Componente para renderizar cada producto con:
  - Nombre, marca, empresa, categoría.
  - Descripción truncada con **"Ver más"** usando `ExpandableText`.
  - Precio destacado.
  - Botón para agregar al carrito.

### `ExpandableText.jsx`
- Custom component para truncar un texto largo y expandirlo con un botón "Ver más / Ver menos".

### `Home.jsx`
- Página principal.
- Lista todos los productos disponibles.
- Usa el **custom hook `useSearch`** para filtrar productos por nombre, marca, empresa, categoría y descripción.

### `Checkout.jsx`
- Muestra el carrito con productos seleccionados.
- Permite modificar cantidades o eliminar productos.
- Al confirmar la compra:
  - Se genera un pedido (order).
  - Se limpia el carrito.

### `Orders.jsx`
- Lista todos los pedidos realizados por el usuario.
- Cada pedido muestra su código, fecha y total.
- Link para ver detalles.

### `OrderDetail.jsx`
- Muestra los productos comprados en un pedido.
- Permite seleccionar cantidades a devolver por producto.
- Si un producto es devuelto completamente, se elimina del pedido.
- Las devoluciones se registran en el estado `returns`.

### `Returns.jsx`
- Lista todos los productos devueltos, agrupados por código de pedido.
- Muestra la fecha de cada devolución y los productos incluidos.

### `useSearch.js`
- **Custom hook** reutilizable que permite buscar dinámicamente en cualquier array de objetos por múltiples campos.
- Utilizado actualmente en `Home.jsx`.

### `useShopStore.js`
- Store global creado con Zustand.
- Maneja el estado de:
  - Carrito (`cart`)
  - Pedidos (`orders`)
  - Devoluciones (`returns`)
- Incluye persistencia automática con `localStorage`.

### `selectors.js`
- Proporciona funciones auxiliares (`selectTotalItems`, `selectTotalPrice`, etc.) para calcular valores derivados del estado.

### `products.js`
- Archivo de datos con productos mock.
- Contiene atributos como `id`, `name`, `brand`, `company`, `category`, `description`, `price`, `image`.

### Estilos CSS (`styles/*.css`)
- Todos los componentes están estilizados con **CSS + metodología BEM**.
- Estilos separados por vista y componente para facilitar el mantenimiento.

## 🧪 Bonus
- El código está preparado para escalar fácilmente.
- Si se desea agregar autenticación o backend real, puede integrarse sin romper la estructura actual.

---

# 🖥️ Backend — Java + Spring Boot

Este proyecto incorpora un **backend basado en microservicios** desarrollado con Java y el ecosistema Spring. La arquitectura se compone de:

1. **Eureka Server** – Registro de servicios (puerto `8761`).
2. **API Gateway** – Punto de entrada único que enruta a los microservicios (puerto `8080`).
3. **Buscador Service** – Gestiona los ítems de la tienda y permite buscarlos por cualquiera de sus atributos.
4. **Operador Service** – Registra compras y consulta al buscador para validar stock.

## ✅ Requisitos previos

- [Java JDK 17+](https://adoptium.net/) 
- [Maven 3.9+](https://maven.apache.org/)
- Node.js 22+ para el frontal.

Comprueba las instalaciones con:

```bash
java -version
mvn -version
node -v
```

## 🗄️ Bases de datos

Por defecto ambos microservicios utilizan **H2 en memoria**, por lo que no es necesario instalar nada adicional. Para usar MySQL o PostgreSQL:

1. Instalar el motor correspondiente.
2. Crear las bases de datos:
   ```sql
   -- MySQL
   CREATE DATABASE buscadordb;
   -- PostgreSQL
   CREATE DATABASE operadordb;
   ```
3. Actualizar las propiedades `spring.datasource.url`, `username` y `password` en:
   - `backend/buscador-service/src/main/resources/application.yml`
   - `backend/operador-service/src/main/resources/application.yml`

## 🚀 Ejecución de los servicios

En terminales independientes y desde la raíz del proyecto, ejecutar:

```bash
# 1. Servidor de registro
mvn -f backend/eureka-server spring-boot:run

# 2. Microservicio buscador
mvn -f backend/buscador-service spring-boot:run

# 3. Microservicio operador
mvn -f backend/operador-service spring-boot:run

# 4. Gateway
mvn -f backend/gateway spring-boot:run
```

Cada servicio se registrará automáticamente en Eureka y el gateway expondrá la API en `http://localhost:8080`.

## 📡 Endpoints principales

### Buscador (`/items`)
- `POST /items` – Crear ítem.
- `GET /items` – Listar todos.
- `GET /items/{id}` – Obtener por ID.
- `PUT /items/{id}` – Actualizar.
- `DELETE /items/{id}` – Eliminar.
- `GET /items/search?name=...&description=...&minPrice=...&maxPrice=...&inStock=...` – Búsqueda avanzada.

### Operador (`/orders`)
- `POST /orders` – Registrar compra (valida stock en el buscador).
- `GET /orders` – Listar compras.
- `GET /orders/{id}` – Detalle de compra.

## 🖥️ Frontend

El frontal React continúa funcionando como antes:

```bash
npm install
npm run dev
```

Con los servicios en marcha, la aplicación completa estará disponible en `http://localhost:5173` consumiendo el backend a través del gateway.
