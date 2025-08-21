# OpenAPI Specification Generation

Generate OpenAPI specifications from existing REST APIs using Amp.

**Stack:** Express.js, Spring Boot, OpenAPI 3.0  
**Thread:** [Express OpenAPI Generation](https://ampcode.com/threads/T-b6961337-c62b-4237-9516-6a5f1f255112)

## Amp Prompt

For Express.js applications:
```bash
amp -x "Analyze all Express routes in src/routes/ and generate OpenAPI documentation"
```

For Spring Boot applications:
```bash
amp -x "Analyze this application's RestControllers, add the https://springdoc.org/ plugin and ensure all endpoints are properly annotated"
```

## Result

- Complete OpenAPI 3.0 specification generated from existing code
- Automatic detection of endpoints, parameters, and response schemas
- Integration with springdoc for Spring Boot applications
- Ready-to-use documentation for API consumers

## Try it locally

### For Express.js Projects

1. Navigate to your Express project directory
2. Run the Express OpenAPI generation prompt above
3. Amp will analyze your routes and generate `openapi.yaml`

### For Spring Boot Projects  

1. Navigate to your Spring Boot project directory  
2. Run the Spring Boot prompt above ([Example Thread](https://ampcode.com/threads/T-8ad6b9be-3e3c-492e-ab19-30e989076933))
3. Amp will add springdoc dependencies and annotations
4. Access documentation at `/swagger-ui.html` after running your app
