# 🛒 Ecommerce — Frontend + Backend

Proyecto fullstack compuesto por un **frontend React** y un **backend basado en microservicios Spring Boot**. El microservicio
`buscador` utiliza **Elasticsearch** para ofrecer búsquedas avanzadas (full‑text, search‑as‑you‑type y facets) y el frontend
consume la API a través del **API Gateway**.

## 📦 Requisitos previos

- [Node.js 22+](https://nodejs.org/en/download)
- [Java JDK 17+](https://www.oracle.com/java/technologies/downloads/)
- [Maven 3.9+](https://maven.apache.org/)
- [Docker & Docker Compose](https://docs.docker.com/get-docker/)

Comprueba cada instalación:

```bash
node -v
java -version
mvn -version
docker -v
docker compose version
```

## 🚀 Puesta en marcha con Docker

1. **Clonar el repositorio**

   ```bash
   git clone <URL_DEL_REPO>
   cd Entrega2_DWI
   ```

2. **Levantar backend + Elasticsearch**

   Desde la raíz del proyecto:

   ```bash
   docker-compose up --build
   ```

   Se lanzarán los siguientes contenedores:

   | Servicio        | Puerto |
   |----------------|--------|
   | Elasticsearch  | 9200   |
   | Eureka Server  | 8761   |
   | Buscador       | 8081   |
   | Operador       | 8082   |
   | API Gateway    | 8080   |

3. **Iniciar el frontend**

   En otra terminal:

   ```bash
   npm install
   npm run dev
   ```

   La web quedará disponible en [http://localhost:5173](http://localhost:5173) consumiendo la API del gateway.

## 🔍 Microservicio Buscador con Elasticsearch

El modelo `Item` está mapeado a un índice de Elasticsearch con los siguientes tipos:

| Campo       | Tipo               |
|-------------|--------------------|
| `name`      | `search_as_you_type` |
| `description` | `text`             |
| `brand`     | `keyword`          |
| `company`   | `keyword`          |
| `category`  | `keyword`          |

### Endpoints principales

- `GET /items` – Lista todos los ítems
- `GET /items/search?name=...&description=...` – Búsqueda full‑text
- `POST /items` – Crea ítem
- `POST /orders` – Registra una compra

El frontend consume estos endpoints desde `src/services/api.js`.

## 🧪 Pruebas

Cada microservicio posee tests JUnit mínimos. Ejecuta los siguientes comandos desde la raíz del proyecto (requieren acceso a
internet para descargar dependencias):

```bash
mvn -f backend/buscador-service test
mvn -f backend/operador-service test
mvn -f backend/eureka-server test
mvn -f backend/gateway test
```

El frontend no dispone de pruebas automatizadas; el comando `npm test` no está definido.

## ☁️ Despliegue en Railway y Vercel

### Backend en Railway
1. Conecta tu cuenta de GitHub en [Railway](https://railway.app/) y crea un proyecto nuevo.
2. Añade un servicio por cada componente del backend usando su directorio como **Root Directory**:
   - `backend/eureka-server` (puerto `8761`)
   - `backend/buscador-service` (puerto `8081`)
   - `backend/operador-service` (puerto `8082`)
   - `backend/gateway` (puerto `8080`)
   - `Elasticsearch` desde la imagen `docker.elastic.co/elasticsearch/elasticsearch:8.15.0` con `discovery.type=single-node` y `xpack.security.enabled=false`.
3. Configura variables de entorno según corresponda:
   - `SPRING_ELASTICSEARCH_URIS` → URL interna de Elasticsearch.
   - `EUREKA_CLIENT_SERVICEURL_DEFAULTZONE` → `http://<eureka-service>:8761/eureka`.
4. Activa **Deploy on Commit** para desplegar automáticamente tras cada push a la rama principal.

### Frontend en Vercel
1. Importa este repositorio en Vercel y selecciona la raíz del proyecto.
2. Usa como comando de build `npm run build` y como directorio de salida `dist`.
3. Define la variable `VITE_API_BASE` con el dominio público del gateway desplegado en Railway.
4. Ejecuta el despliegue; Vercel generará una URL pública para el frontend.

## 🛠️ Uso manual de la API

Con los servicios en marcha puedes probar la API con `curl` o Postman mediante el gateway (`http://localhost:8080`). Ejemplos:

```bash
# Buscar productos (search-as-you-type)
curl "http://localhost:8080/items/search?name=lap"

# Crear pedido
curl -X POST http://localhost:8080/orders \
  -H "Content-Type: application/json" \
  -d '{"name":"Ana","email":"ana@mail.com","items":[],"total":0,"date":"2024-01-01T00:00:00Z"}'
```

---

Con estos pasos tendrás todo el entorno funcionando y listo para realizar búsquedas potentes y registrar compras a través del
backend desplegado en contenedores Docker.

