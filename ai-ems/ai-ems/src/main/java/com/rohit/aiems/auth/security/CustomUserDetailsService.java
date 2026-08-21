package com.rohit.aiems.auth.security;

import com.rohit.aiems.auth.entity.User;
import com.rohit.aiems.auth.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class CustomUserDetailsService
        implements UserDetailsService {

    private final UserRepository userRepository;


    @Override
    public UserDetails loadUserByUsername(
            String email
    ) throws UsernameNotFoundException {

        if (
                email == null ||
                        email.isBlank()
        ) {

            throw new UsernameNotFoundException(
                    "User email cannot be empty."
            );
        }


        String normalizedEmail =
                email.trim();


        User user =
                userRepository
                        .findByEmail(
                                normalizedEmail
                        )
                        .orElseThrow(
                                () ->
                                        new UsernameNotFoundException(
                                                "User not found."
                                        )
                        );


        return new CustomUserDetails(
                user
        );
    }
}