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

