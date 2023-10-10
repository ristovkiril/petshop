# Use a base image with OpenJDK (choose an appropriate version)
FROM maven:3.8-amazoncorretto-17

# Set the working directory inside the container
WORKDIR /app

# Copy the JAR file (you may need to adjust the JAR filename)
COPY . .

# Expose the port your Spring Boot application listens on (default is 8080)
RUN mvn clean -DskipTests=true package

EXPOSE 8080

# Command to run your Spring Boot application
ENTRYPOINT exec java ${JAVA_OPTS} -jar target/petshop-backend-0.0.1-SNAPSHOT.jar