package com.cg.ef.users;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.modelmapper.ModelMapper;
import org.modelmapper.TypeToken;
import org.springframework.security.crypto.password.PasswordEncoder;

import com.cg.users.dto.UserCredentials;
import com.cg.users.dto.UserDto;
import com.cg.users.entity.User;
import com.cg.users.repository.UserRepo;
import com.cg.users.service.UserService;
import com.cg.users.serviceimpl.UserServiceImpl;

public class UserServiceImplTest {

    @Mock
    private UserRepo mockUserRepo;

    @Mock
    private ModelMapper mockModelMapper;

    @Mock
    private PasswordEncoder mockPasswordEncoder;

    @InjectMocks
    private UserServiceImpl userService;

    @BeforeEach
    public void setup() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    public void testAddUser() {
        // Arrange
        UserDto userDto = new UserDto();
        userDto.setEmailId("test@example.com");
        userDto.setPassword("password");
        User user = new User();
        user.setEmailId("test@example.com");
        user.setPassword("password");

        when(mockUserRepo.findByEmailId(userDto.getEmailId())).thenReturn(Optional.empty());
        when(mockUserRepo.findByMobileNumber(userDto.getMobileNumber())).thenReturn(Optional.empty());
        when(mockModelMapper.map(userDto, User.class)).thenReturn(user);
        when(mockPasswordEncoder.encode(userDto.getPassword())).thenReturn("encodedPassword");
        when(mockUserRepo.save(user)).thenReturn(user);
        when(mockModelMapper.map(user, UserDto.class)).thenReturn(userDto);

        // Act
        UserDto result = userService.add(userDto);

        // Assert
        assertNotNull(result);
        assertEquals(userDto.getEmailId(), result.getEmailId());
        assertEquals("encodedPassword", user.getPassword());
        verify(mockUserRepo).findByEmailId(userDto.getEmailId());
        verify(mockUserRepo).findByMobileNumber(userDto.getMobileNumber());
        verify(mockModelMapper).map(userDto, User.class);
        verify(mockPasswordEncoder).encode(userDto.getPassword());
        verify(mockUserRepo).save(user);
        verify(mockModelMapper).map(user, UserDto.class);
    }

//    @Test
//    public void testUpdateUser() {
//        // Arrange
//        Long userId = 1L;
//        UserDto userDto = new UserDto();
//        userDto.setUserId(userId);
//        userDto.setFirstName("John");
//        User user = new User();
//        user.setUserId(userId);
//        user.setFirstName("John");
//
//        when(mockUserRepo.findById(userId)).thenReturn(Optional.of(user));
//        when(mockUserRepo.findByMobileNumber(userDto.getMobileNumber())).thenReturn(Optional.empty());
//        when(mockModelMapper.map(userDto, User.class)).thenReturn(user);
//        when(mockUserRepo.save(user)).thenReturn(user);
//        when(mockModelMapper.map(user, UserDto.class)).thenReturn(userDto);
//
//        // Act
//        UserDto result = userService.update(userDto);
//
//        // Assert
//        assertNotNull(result);
//        assertEquals(userDto.getFirstName(), result.getFirstName());
//        verify(mockUserRepo).findById(userId);
//        verify(mockUserRepo).findByMobileNumber(userDto.getMobileNumber());
//        verify(mockModelMapper).map(userDto, User.class);
//        verify(mockUserRepo).save(user);
//        verify(mockModelMapper).map(user, UserDto.class);
//    }

    @Test
    public void testDeleteUser() {
        // Arrange
        Long userId = 1L;
        User user = new User();
        user.setUserId(userId);

        when(mockUserRepo.findById(userId)).thenReturn(Optional.of(user));
        doNothing().when(mockUserRepo).deleteById(userId);
        when(mockModelMapper.map(user, UserDto.class)).thenReturn(new UserDto());

        // Act
        UserDto result = userService.delete(userId);

        // Assert
        assertNotNull(result);
        verify(mockUserRepo).findById(userId);
        verify(mockUserRepo).deleteById(userId);
        verify(mockModelMapper).map(user, UserDto.class);
    }

    @Test
    public void testGetUserById() {
        // Arrange
        Long userId = 1L;
        User user = new User();
        user.setUserId(userId);

        when(mockUserRepo.findById(userId)).thenReturn(Optional.of(user));
        when(mockModelMapper.map(user, UserDto.class)).thenReturn(new UserDto());

        // Act
        UserDto result = userService.get(userId);

        // Assert
        assertNotNull(result);
        verify(mockUserRepo).findById(userId);
        verify(mockModelMapper).map(user, UserDto.class);
    }

    @Test
    public void testGetAllUsers() {
        // Arrange
        List<User> users = new ArrayList<>();
        users.add(new User());

        when(mockUserRepo.findAll()).thenReturn(users);
        when(mockModelMapper.map(users, new TypeToken<List<UserDto>>() {}.getType())).thenReturn(new ArrayList<>());

        // Act
        List<UserDto> result = userService.get();

        // Assert
        assertNotNull(result);
        verify(mockUserRepo).findAll();
        verify(mockModelMapper).map(users, new TypeToken<List<UserDto>>() {}.getType());
    }

    @Test
    public void testGetUserByEmail() {
        // Arrange
        String email = "test@example.com";
        User user = new User();
        user.setEmailId(email);

        when(mockUserRepo.findByEmailId(email)).thenReturn(Optional.of(user));
        when(mockModelMapper.map(user, UserDto.class)).thenReturn(new UserDto());

        // Act
        UserDto result = userService.get(email);

        // Assert
        assertNotNull(result);
        verify(mockUserRepo).findByEmailId(email);
        verify(mockModelMapper).map(user, UserDto.class);
    }

    @Test
    public void testGetUserCredentials() {
        // Arrange
        String email = "test@example.com";
        User user = new User();
        user.setEmailId(email);

        when(mockUserRepo.findByEmailId(email)).thenReturn(Optional.of(user));
        when(mockModelMapper.map(user, UserCredentials.class)).thenReturn(new UserCredentials());

        // Act
        UserCredentials result = userService.getCredntials(email);

        // Assert
        assertNotNull(result);
        verify(mockUserRepo).findByEmailId(email);
        verify(mockModelMapper).map(user, UserCredentials.class);
    }
}
