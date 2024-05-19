package web.com.mimente.mimente.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class CorsConfig implements WebMvcConfigurer {

    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/**")
                .allowedOrigins("*") // Permitir solicitudes de todos los dominios
                .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS") // Permitir los métodos HTTP especificados
                .allowedHeaders("*"); // Permitir todas las cabeceras
    }
}
