package com.cg.authservice;
import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.DisabledException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;

import com.cg.authservice.dto.JwtRequest;
import com.cg.authservice.dto.JwtResponse;
import com.cg.authservice.dto.ResponseObject;
import com.cg.authservice.dto.USER_ROLE;
import com.cg.authservice.entity.UserToken;
import com.cg.authservice.repository.UserTokenRepo;
import com.cg.authservice.service.AuthService;

import com.cg.authservice.service.RemoteUserService;
import com.cg.authservice.serviceimpl.AuthServiceImpl;
import com.cg.authservice.serviceimpl.JwtUserDetailsService;
import com.cg.authservice.util.JwtUtil;

public class AuthServiceImplTest {

    @Mock
    private AuthenticationManager mockAuthManager;

    @Mock
    private JwtUtil mockJwtUtil;

    @Mock
    private JwtUserDetailsService mockUserDetailsService;

    @Mock
    private RemoteUserService mockRemoteUserService;

    @Mock
    private UserTokenRepo mockTokenRepo;

    @InjectMocks
    private AuthServiceImpl authService;

    @BeforeEach
    public void setup() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    public void testSignIn_WithDisabledUser() {
        // Arrange
        JwtRequest request = new JwtRequest();
        request.setEmailId("test@example.com");
        request.setPassword("password");

        when(mockAuthManager.authenticate(any(UsernamePasswordAuthenticationToken.class))).thenThrow(new DisabledException("USER_DISABLED"));

        // Act & Assert
        assertThrows(RuntimeException.class, () -> authService.signIn(request));
        verify(mockAuthManager).authenticate(any(UsernamePasswordAuthenticationToken.class));
    }

    @Test
    public void testSignIn_WithInvalidCredentials() {
        // Arrange
        JwtRequest request = new JwtRequest();
        request.setEmailId("test@example.com");
        request.setPassword("password");

        when(mockAuthManager.authenticate(any(UsernamePasswordAuthenticationToken.class))).thenThrow(new BadCredentialsException("INVALID_CREDENTIALS"));

        // Act & Assert
        assertThrows(RuntimeException.class, () -> authService.signIn(request));
        verify(mockAuthManager).authenticate(any(UsernamePasswordAuthenticationToken.class));
    }

    @Test
    public void testSignOut() {
        // Arrange
        String token = "token";
        UserToken userToken = new UserToken();
        userToken.setToken(token);
        userToken.setUserId(1L);

        when(mockTokenRepo.findByToken(token)).thenReturn(Optional.of(userToken));
        when(mockTokenRepo.deleteByUserId(userToken.getUserId())).thenReturn(1);

        // Act
        Object result = authService.signOut(token);

        // Assert
        assertNotNull(result);
        assertEquals(1, result);
        verify(mockTokenRepo).findByToken(token);
        verify(mockTokenRepo).deleteByUserId(userToken.getUserId());
    }

    @Test
    public void testValidateToken_WithUsedToken() {
        // Arrange
        String token = "token";

        when(mockTokenRepo.findByToken(token)).thenReturn(Optional.of(new UserToken()));

        // Act & Assert
        assertThrows(RuntimeException.class, () -> authService.validateToken(token));
        verify(mockTokenRepo).findByToken(token);
    }
}
