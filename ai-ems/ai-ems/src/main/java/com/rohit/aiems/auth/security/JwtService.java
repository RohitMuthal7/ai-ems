package com.rohit.aiems.auth.security;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import jakarta.annotation.PostConstruct;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import javax.crypto.SecretKey;
import java.nio.charset.StandardCharsets;
import java.util.Date;

@Service
public class JwtService {

    private static final int MIN_SECRET_LENGTH = 32;

    @Value("${jwt.secret}")
    private String secret;

    @Value("${jwt.expiration}")
    private long expiration;

    private SecretKey secretKey;


    // =========================================================================
    // Initialize JWT Signing Key
    // =========================================================================

    @PostConstruct
    public void init() {

        if (
                secret == null ||
                        secret.isBlank()
        ) {

            throw new IllegalStateException(
                    "JWT secret is missing. Configure 'JWT_SECRET'."
            );
        }


        String normalizedSecret =
                secret.trim();


        if (
                normalizedSecret.length() <
                        MIN_SECRET_LENGTH
        ) {

            throw new IllegalStateException(
                    "JWT secret must contain at least "
                            + MIN_SECRET_LENGTH
                            + " characters."
            );
        }


        if (expiration <= 0) {

            throw new IllegalStateException(
                    "JWT expiration must be greater than zero."
            );
        }


        secretKey =
                Keys.hmacShaKeyFor(
                        normalizedSecret.getBytes(
                                StandardCharsets.UTF_8
                        )
                );
    }


    // =========================================================================
    // Generate Token
    // =========================================================================

    public String generateToken(
            UserDetails userDetails
    ) {

        if (userDetails == null) {

            throw new IllegalArgumentException(
                    "User details cannot be null."
            );
        }


        Date issuedAt =
                new Date();


        Date expirationDate =
                new Date(
                        issuedAt.getTime() +
                                expiration
                );


        return Jwts.builder()

                .subject(
                        userDetails.getUsername()
                )

                .issuedAt(
                        issuedAt
                )

                .expiration(
                        expirationDate
                )

                .signWith(
                        secretKey
                )

                .compact();
    }


    // =========================================================================
    // Extract Username
    // =========================================================================

    public String extractUsername(
            String token
    ) {

        if (
                token == null ||
                        token.isBlank()
        ) {

            throw new IllegalArgumentException(
                    "JWT token cannot be empty."
            );
        }


        return extractClaims(
                token
        ).getSubject();
    }


    // =========================================================================
    // Validate Token
    // =========================================================================

    public boolean isTokenValid(
            String token,
            UserDetails userDetails
    ) {

        if (
                token == null ||
                        token.isBlank() ||
                        userDetails == null
        ) {

            return false;
        }


        try {

            Claims claims =
                    extractClaims(
                            token
                    );


            String username =
                    claims.getSubject();


            Date tokenExpiration =
                    claims.getExpiration();


            if (
                    username == null ||
                            tokenExpiration == null
            ) {

                return false;
            }


            return username.equals(
                    userDetails.getUsername()
            )
                    &&
                    tokenExpiration.after(
                            new Date()
                    );

        } catch (
                Exception ignored
        ) {

            /*
             * Any malformed, expired, or invalidly signed JWT
             * is treated as invalid.
             */
            return false;
        }
    }


    // =========================================================================
    // Extract Claims
    // =========================================================================

    private Claims extractClaims(
            String token
    ) {

        if (
                token == null ||
                        token.isBlank()
        ) {

            throw new IllegalArgumentException(
                    "JWT token cannot be empty."
            );
        }


        return Jwts.parser()

                .verifyWith(
                        secretKey
                )

                .build()

                .parseSignedClaims(
                        token
                )

                .getPayload();
    }
}