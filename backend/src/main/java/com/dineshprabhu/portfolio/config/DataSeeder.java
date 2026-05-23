package com.dineshprabhu.portfolio.config;

import com.dineshprabhu.portfolio.entity.CodeSnippet;
import com.dineshprabhu.portfolio.entity.Project;
import com.dineshprabhu.portfolio.repository.CodeSnippetRepository;
import com.dineshprabhu.portfolio.repository.ProjectRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

@Component
public class DataSeeder implements CommandLineRunner {

    private static final Logger logger = LoggerFactory.getLogger(DataSeeder.class);

    private final ProjectRepository projectRepository;
    private final CodeSnippetRepository snippetRepository;

    public DataSeeder(ProjectRepository projectRepository, CodeSnippetRepository snippetRepository) {
        this.projectRepository = projectRepository;
        this.snippetRepository = snippetRepository;
    }

    @Override
    public void run(String... args) {
        seedProjects();
        seedSnippets();
    }

    private void seedProjects() {
        if (projectRepository.count() > 0) {
            logger.info("Projects already seeded, skipping...");
            return;
        }

        projectRepository.save(new Project(
                "E-Commerce Backend System",
                "A robust RESTful backend for an e-commerce platform with user authentication, product management, cart operations, and order processing.",
                "Java,Spring Boot,MySQL,REST API,Spring Security",
                "https://github.com/dineshprabhu-a",
                "#",
                "\uD83D\uDED2",
                true, 1
        ));

        projectRepository.save(new Project(
                "URL Shortener Application",
                "A high-performance URL shortening service with custom aliases, click analytics, and expiration features built with Spring Boot.",
                "Java,Spring Boot,PostgreSQL,REST API,Docker",
                "https://github.com/dineshprabhu-a",
                "#",
                "\uD83D\uDD17",
                true, 2
        ));

        projectRepository.save(new Project(
                "Employee Management System",
                "A full-stack employee management application with CRUD operations, role-based access, department management, and reporting.",
                "Java,Spring Boot,Hibernate,MySQL,REST API",
                "https://github.com/dineshprabhu-a",
                "#",
                "\uD83D\uDC65",
                true, 3
        ));

        projectRepository.save(new Project(
                "Secure Healthcare Communication",
                "Encrypted data transfer system for healthcare using ECDH key exchange and AES encryption. Published in IJNRD journal.",
                "Java,JDBC,MySQL,Apache Server,Cryptography",
                "https://github.com/dineshprabhu-a",
                "#",
                "\uD83D\uDD10",
                true, 4
        ));

        logger.info("Seeded 4 projects");
    }

    private void seedSnippets() {
        if (snippetRepository.count() > 0) {
            logger.info("Snippets already seeded, skipping...");
            return;
        }

        snippetRepository.save(new CodeSnippet(
                "REST Controller with Pagination",
                "Java",
                "@RestController\n@RequestMapping(\"/api/products\")\npublic class ProductController {\n\n    @Autowired\n    private ProductService productService;\n\n    @GetMapping\n    public Page<Product> getAll(\n            @RequestParam(defaultValue = \"0\") int page,\n            @RequestParam(defaultValue = \"10\") int size) {\n        return productService.findAll(\n            PageRequest.of(page, size));\n    }\n}",
                "Spring Boot REST controller with pagination support",
                "Spring Boot"
        ));

        snippetRepository.save(new CodeSnippet(
                "Stream API — Filter & Collect",
                "Java",
                "List<Employee> seniorDevs = employees.stream()\n    .filter(e -> e.getExperience() > 5)\n    .filter(e -> e.getRole().equals(\"Developer\"))\n    .sorted(Comparator.comparing(Employee::getSalary).reversed())\n    .collect(Collectors.toList());",
                "Java Stream API for filtering and sorting collections",
                "Core Java"
        ));

        snippetRepository.save(new CodeSnippet(
                "Custom Exception Handler",
                "Java",
                "@ControllerAdvice\npublic class GlobalExceptionHandler {\n\n    @ExceptionHandler(ResourceNotFoundException.class)\n    public ResponseEntity<ErrorResponse> handleNotFound(\n            ResourceNotFoundException ex) {\n        ErrorResponse error = new ErrorResponse(\n            HttpStatus.NOT_FOUND.value(),\n            ex.getMessage(),\n            LocalDateTime.now());\n        return new ResponseEntity<>(error, HttpStatus.NOT_FOUND);\n    }\n}",
                "Global exception handling with @ControllerAdvice",
                "Spring Boot"
        ));

        snippetRepository.save(new CodeSnippet(
                "JPA Repository with Custom Query",
                "Java",
                "@Repository\npublic interface OrderRepository\n        extends JpaRepository<Order, Long> {\n\n    @Query(\"SELECT o FROM Order o WHERE o.status = :status \"\n         + \"AND o.createdAt > :date ORDER BY o.total DESC\")\n    List<Order> findRecentByStatus(\n        @Param(\"status\") OrderStatus status,\n        @Param(\"date\") LocalDateTime date);\n\n    List<Order> findByCustomerIdOrderByCreatedAtDesc(\n        Long customerId);\n}",
                "Spring Data JPA with JPQL custom queries",
                "Spring Data"
        ));

        snippetRepository.save(new CodeSnippet(
                "Docker Compose — Spring Boot + MySQL",
                "YAML",
                "version: '3.8'\nservices:\n  app:\n    build: .\n    ports:\n      - \"8080:8080\"\n    environment:\n      - SPRING_DATASOURCE_URL=jdbc:mysql://db:3306/mydb\n      - SPRING_DATASOURCE_USERNAME=root\n      - SPRING_DATASOURCE_PASSWORD=secret\n    depends_on:\n      - db\n  db:\n    image: mysql:8.0\n    environment:\n      MYSQL_ROOT_PASSWORD: secret\n      MYSQL_DATABASE: mydb\n    ports:\n      - \"3306:3306\"",
                "Docker Compose setup for Spring Boot with MySQL",
                "DevOps"
        ));

        logger.info("Seeded 5 code snippets");
    }
}
