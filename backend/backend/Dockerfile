# ============================================
# FASE 1: BUILD (Compilação)
# Usa o Maven com JDK 21 para gerar o .jar
# ============================================
FROM maven:3.9-eclipse-temurin-21-alpine AS build

WORKDIR /app

# Copia apenas o pom.xml primeiro para cachear as dependências do Maven
COPY pom.xml .
RUN mvn dependency:go-offline -B

# Agora copia o código-fonte e compila o projeto
COPY src ./src
RUN mvn package -DskipTests -B

# ============================================
# FASE 2: RUN (Execução)
# Usa apenas o JRE 21 alpine (imagem leve ~200MB)
# ============================================
FROM eclipse-temurin:21-jre-alpine

WORKDIR /app

# Copia o .jar gerado na fase de build
COPY --from=build /app/target/*.jar app.jar

# Porta padrão do Spring Boot
EXPOSE 8080

# Comando de inicialização do servidor
ENTRYPOINT ["java", "-jar", "app.jar"]
