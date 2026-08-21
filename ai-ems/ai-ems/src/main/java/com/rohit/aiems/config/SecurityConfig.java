package com.rohit.aiems.config;

import com.rohit.aiems.auth.security.JwtAuthenticationFilter;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.util.Arrays;
import java.util.List;

@Configuration
@EnableWebSecurity
@EnableMethodSecurity
@RequiredArgsConstructor
public class SecurityConfig {

    private final JwtAuthenticationFilter jwtAuthenticationFilter;

    /**
     * Frontend origins are configured through an environment variable.
     *
     * Development:
     * APP_CORS_ALLOWED_ORIGINS=http://localhost:5173
     *
     * Production example:
     * APP_CORS_ALLOWED_ORIGINS=https://your-frontend-domain.com
     *
     * Multiple origins can be separated by commas.
     */
    @Value("${app.cors.allowed-origins:http://localhost:5173}")
    private String allowedOrigins;


    // =========================================================================
    // Password Encoder
    // =========================================================================

    @Bean
    public BCryptPasswordEncoder passwordEncoder() {

        return new BCryptPasswordEncoder();
    }


    // =========================================================================
    // Authentication Manager
    // =========================================================================

    @Bean
    public AuthenticationManager authenticationManager(
            AuthenticationConfiguration configuration
    ) throws Exception {

        return configuration.getAuthenticationManager();
    }


    // =========================================================================
    // Security Filter Chain
    // =========================================================================

    @Bean
    public SecurityFilterChain securityFilterChain(
            HttpSecurity http
    ) throws Exception {

        http

                // -------------------------------------------------------------
                // CORS
                // -------------------------------------------------------------

                .cors(cors ->
                        cors.configurationSource(
                                corsConfigurationSource()
                        )
                )


                // -------------------------------------------------------------
                // CSRF
                //
                // The application uses stateless JWT authentication.
                // -------------------------------------------------------------

                .csrf(csrf ->
                        csrf.disable()
                )


                // -------------------------------------------------------------
                // Session Management
                // -------------------------------------------------------------

                .sessionManagement(session ->
                        session.sessionCreationPolicy(
                                SessionCreationPolicy.STATELESS
                        )
                )


                // -------------------------------------------------------------
                // Authorization
                // -------------------------------------------------------------

                .authorizeHttpRequests(auth -> auth

                        // =====================================================
                        // Public Authentication APIs
                        // =====================================================

                        .requestMatchers(
                                "/api/auth/**"
                        ).permitAll()


                        // =====================================================
                        // Public Profile Images
                        //
                        // These are kept public because normal <img> requests
                        // do not automatically attach the Axios JWT header.
                        // =====================================================

                        .requestMatchers(
                                "/uploads/**"
                        ).permitAll()


                        // =====================================================
                        // Everything else requires authentication
                        //
                        // Admin/Employee authorization should then be enforced
                        // by controller/service method rules where applicable.
                        // =====================================================

                        .anyRequest()
                        .authenticated()
                )


                // -------------------------------------------------------------
                // JWT Authentication Filter
                // -------------------------------------------------------------

                .addFilterBefore(
                        jwtAuthenticationFilter,
                        UsernamePasswordAuthenticationFilter.class
                );


        return http.build();
    }


    // =========================================================================
    // CORS Configuration
    // =========================================================================

    @Bean
    public CorsConfigurationSource corsConfigurationSource() {

        CorsConfiguration configuration =
                new CorsConfiguration();


        // ---------------------------------------------------------------------
        // Allowed Origins
        // ---------------------------------------------------------------------

        List<String> origins =
                Arrays.stream(
                                allowedOrigins.split(",")
                        )
                        .map(String::trim)
                        .filter(origin ->
                                !origin.isBlank()
                        )
                        .toList();


        configuration.setAllowedOrigins(
                origins
        );


        // ---------------------------------------------------------------------
        // Allowed HTTP Methods
        // ---------------------------------------------------------------------

        configuration.setAllowedMethods(
                List.of(
                        "GET",
                        "POST",
                        "PUT",
                        "DELETE",
                        "PATCH",
                        "OPTIONS"
                )
        );


        // ---------------------------------------------------------------------
        // Allowed Headers
        // ---------------------------------------------------------------------

        configuration.setAllowedHeaders(
                List.of("*")
        );


        // ---------------------------------------------------------------------
        // Credentials
        // ---------------------------------------------------------------------

        configuration.setAllowCredentials(
                true
        );


        // ---------------------------------------------------------------------
        // Register
        // ---------------------------------------------------------------------

        UrlBasedCorsConfigurationSource source =
                new UrlBasedCorsConfigurationSource();


        source.registerCorsConfiguration(
                "/**",
                configuration
        );


        return source;
    }
}