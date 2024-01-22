## Spring Boot Backend with Gradle

This project utilizes the Spring Boot framework as the backend technology, providing a robust and scalable foundation for building Java-based web applications. Gradle is employed as the build automation tool to manage project dependencies and facilitate the build process.

### Project Structure

The project follows a standard Spring Boot project structure and leverages Gradle for managing dependencies. The main components of the project structure include:sdfsf

```plaintext
src/
|-- main/
|   |-- java/
|       |-- com/
|           |-- kollicon/
|               |-- controller/
|               |-- service/
|               |-- application/
|-- build.gradle
|-- settings.gradle
```

### Figma

Figma prototypes and sketches for Kollicon:

[FIGMA](https://www.figma.com/file/Jsbt9jh0fgHUAIN6QMM3iF/KolliCon---LIA-projekt?type=design&node-id=0%3A1&mode=design&t=whV1YNILGDwatZ9j-1)\
[FIGMA PROTOTYPE](https://www.figma.com/proto/Jsbt9jh0fgHUAIN6QMM3iF/KolliCon---LIA-projekt?type=design&node-id=1-4&t=9sHlTrZK9QCzL3y9-1&scaling=scale-down&page-id=0%3A1&starting-point-node-id=1%3A4&show-proto-sidebar=1&mode=design)

# Prerequisites

```
Docker desktop
Java 20
Java 21
Preferred IDEA of the team is IntelliJ
```

# How to start spring backend

## Getting Started

Follow these steps to start the backend:

### IntelliJ Settings

1. Open project in IntelliJ
2. Go to IntelliJ settings
3. Go to "Build, Execution, Deployment"
4. Select "Build Tools"
5. Select Gradle
6. Under your gradle projects select backend
7. Change Gradle JVM -> Java 20

### Project Settings

1. Right click on the backend folder
2. Select "Open Module Settings"
3. Click on "Projects" on the left side menu
4. Select SDK -> Java 21

Click on run to start the backend

### AWS Account Role

ID: 637423179043 \
Role: OrganizationAccountAccessRole
