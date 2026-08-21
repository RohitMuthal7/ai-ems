package com.rohit.aiems.auth.security;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.lang.NonNull;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;

@Component
@RequiredArgsConstructor
public class JwtAuthenticationFilter
        extends OncePerRequestFilter {

    private final JwtService jwtService;

    private final CustomUserDetailsService userDetailsService;


    @Override
    protected void doFilterInternal(
            @NonNull HttpServletRequest request,
            @NonNull HttpServletResponse response,
            @NonNull FilterChain filterChain
    ) throws ServletException, IOException {

        String authHeader =
                request.getHeader("Authorization");


        // =====================================================================
        // No Authorization Header
        // =====================================================================

        if (
                authHeader == null ||
                        !authHeader.startsWith("Bearer ")
        ) {

            filterChain.doFilter(
                    request,
                    response
            );

            return;
        }


        // =====================================================================
        // Extract Token
        // =====================================================================

        String token =
                authHeader.substring(7).trim();


        if (token.isBlank()) {

            filterChain.doFilter(
                    request,
                    response
            );

            return;
        }


        try {

            // =================================================================
            // Extract Username / Email
            // =================================================================

            String email =
                    jwtService.extractUsername(
                            token
                    );


            // =================================================================
            // Authenticate Only If No Existing Authentication
            // =================================================================

            if (
                    email != null &&
                            !email.isBlank() &&
                            SecurityContextHolder
                                    .getContext()
                                    .getAuthentication() == null
            ) {

                UserDetails userDetails =
                        userDetailsService
                                .loadUserByUsername(
                                        email
                                );


                // =============================================================
                // Validate JWT
                // =============================================================

                if (
                        jwtService.isTokenValid(
                                token,
                                userDetails
                        )
                ) {

                    UsernamePasswordAuthenticationToken authentication =
                            new UsernamePasswordAuthenticationToken(
                                    userDetails,
                                    null,
                                    userDetails.getAuthorities()
                            );


                    authentication.setDetails(
                            new WebAuthenticationDetailsSource()
                                    .buildDetails(
                                            request
                                    )
                    );


                    SecurityContextHolder
                            .getContext()
                            .setAuthentication(
                                    authentication
                            );
                }
            }

        } catch (Exception ignored) {

            /*
             * Invalid, expired, malformed, or otherwise unusable JWT.
             *
             * Do not authenticate the request.
             *
             * The request continues through the security chain and:
             *
             * - public endpoint  -> continues normally
             * - protected endpoint -> Spring Security returns 401
             */
            SecurityContextHolder
                    .clearContext();
        }


        // =====================================================================
        // Continue Request
        // =====================================================================

        filterChain.doFilter(
                request,
                response
        );
    }
}