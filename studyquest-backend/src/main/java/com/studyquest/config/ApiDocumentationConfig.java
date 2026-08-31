package com.studyquest.config;

import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Info;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class ApiDocumentationConfig {
    @Bean
    public OpenAPI apiDocumentation() {
        return new OpenAPI().info(
                new Info()
                        .title("STUDY:QUEST API")
                        .version("1.0")
                        .description("Spring Boot를 이용한 STUDY QUEST API 문서")
        );
    }
}
