# Pet Store API

A Spring Boot application implementing the OpenAPI Pet Store specification. This
project demonstrates a RESTful API for managing pets, categories, and tags with
automatic OpenAPI client generation.

## Prerequisites

- **Java 21** (required)
- **Git** (for version control)

## Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/sourcegraph/training-cody-spring-boot.git
cd pet-store-api
```

### 2. Build the Application

The project uses Gradle with wrapper, so no separate Gradle installation is needed:

```bash
./gradlew build
```

This command will:

- Download dependencies
- Generate OpenAPI client code from the Pet Store specification
- Compile the application
- Run tests
- Apply code formatting checks

### 3. Run the Application

```bash
./gradlew bootRun
```

The application will start on `http://localhost:8080`.

### 4. Explore the API

Once running, you can access:

- **Swagger UI**: <http://localhost:8080/swagger-ui.html>
- **OpenAPI Docs**: <http://localhost:8080/api-docs>
- **H2 Database Console**: <http://localhost:8080/h2-console>
  - URL: `jdbc:h2:mem:testdb`
  - Username: `sa`
  - Password: `password`

## Development Workflow

### Code Formatting

This project uses [Spotless](https://github.com/diffplug/spotless) for automatic
code formatting:

```bash
# Check formatting
./gradlew spotlessCheck

# Apply formatting
./gradlew spotlessApply
```

### Pre-commit Hook

Install the pre-commit hook to automatically format code before commits:

```bash
./gradlew installPreCommitHook
```

### Running Tests

```bash
# Run all tests
./gradlew test

# Run tests with detailed output
./gradlew test --info
```

### Clean Build

```bash
# Clean and rebuild everything
./gradlew clean build
```

## Project Structure

```text
src/
├── main/
│   ├── java/com/sourcegraph/petstore/
│   │   ├── App.java                    # Main Spring Boot application
│   │   ├── controller/                 # REST controllers
│   │   ├── service/                    # Business logic services
│   │   ├── model/                      # Data models
│   │   └── repository/                 # Data access layer
│   └── resources/
│       ├── application.properties      # Application configuration
│       └── pet-store.json             # OpenAPI specification
├── test/                              # Test classes
└── build/                             # Generated files (excluded from git)

petstore-openapi-client/               # Generated OpenAPI client (auto-generated)
```

## Key Technologies

- **Spring Boot 3.4.3** - Application framework
- **Spring Security** - Authentication and authorization
- **Spring Data JPA** - Data persistence
- **H2 Database** - In-memory database for development
- **SpringDoc OpenAPI** - API documentation
- **OpenAPI Generator** - Client code generation
- **Spotless** - Code formatting
- **JUnit 5** - Testing framework

## Making Changes

### Adding New Features

1. **Update the OpenAPI specification** in `src/main/resources/pet-store.json`
2. **Regenerate client code** by running `./gradlew build`
3. **Implement controllers** in `src/main/java/com/sourcegraph/petstore/controller/`
4. **Add business logic** in `src/main/java/com/sourcegraph/petstore/service/`
5. **Write tests** in `src/test/java/`

### Database Changes

The application uses H2 in-memory database with `create-drop` strategy, so schema
changes are automatically applied on restart. For production, you would
configure a persistent database.

### Configuration

Modify `src/main/resources/application.properties` to change:

- Database settings
- Server port
- Logging levels
- OpenAPI documentation paths

## Useful Commands

```bash
# Start application in development mode
./gradlew bootRun

# Run with specific profile
./gradlew bootRun --args='--spring.profiles.active=dev'

# Generate OpenAPI client only
./gradlew openApiGenerate

# Check dependencies for updates
./gradlew dependencyUpdates

# View project dependencies
./gradlew dependencies
```

## Troubleshooting

### Build Issues

- **Java version**: Ensure you're using Java 21
- **Clean build**: Run `./gradlew clean build` to resolve dependency issues
- **Generated code**: The `petstore-openapi-client/` directory is auto-generated
and should not be manually edited

### Runtime Issues

- **Port conflicts**: Change `server.port` in `application.properties`
- **Database issues**: Access H2 console to inspect data
- **API errors**: Check Swagger UI for proper request format

## Contributing

1. Install the pre-commit hook: `./gradlew installPreCommitHook`
2. Make your changes
3. Run tests: `./gradlew test`
4. Format code: `./gradlew spotlessApply`
5. Commit and push your changes

The pre-commit hook will automatically format your code before each commit.

