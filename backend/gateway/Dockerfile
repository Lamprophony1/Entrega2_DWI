FROM maven:3.9.6-eclipse-temurin-17 AS build
WORKDIR /app
COPY .. /app
RUN mvn -pl gateway -am package -DskipTests

FROM eclipse-temurin:17-jre
WORKDIR /app
COPY --from=build /app/gateway/target/gateway-0.0.1-SNAPSHOT.jar app.jar
ENTRYPOINT ["java","-jar","app.jar"]

