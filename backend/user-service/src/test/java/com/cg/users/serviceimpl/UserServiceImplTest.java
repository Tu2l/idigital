package com.cg.users.serviceimpl;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.mockito.Mockito.doNothing;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

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

        
        UserDto result = userService.add(userDto);

        
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
    
    @Test
    public void testDeleteUser() {
        
        Long userId = 1L;
        User user = new User();
        user.setUserId(userId);

        when(mockUserRepo.findById(userId)).thenReturn(Optional.of(user));
        doNothing().when(mockUserRepo).deleteById(userId);
        when(mockModelMapper.map(user, UserDto.class)).thenReturn(new UserDto());

        
        UserDto result = userService.delete(userId);

        
        assertNotNull(result);
        verify(mockUserRepo).findById(userId);
        verify(mockUserRepo).deleteById(userId);
        verify(mockModelMapper).map(user, UserDto.class);
    }

    @Test
    public void testGetUserById() {
        
        Long userId = 1L;
        User user = new User();
        user.setUserId(userId);

        when(mockUserRepo.findById(userId)).thenReturn(Optional.of(user));
        when(mockModelMapper.map(user, UserDto.class)).thenReturn(new UserDto());

        
        UserDto result = userService.get(userId);

        
        assertNotNull(result);
        verify(mockUserRepo).findById(userId);
        verify(mockModelMapper).map(user, UserDto.class);
    }

    @Test
    public void testGetAllUsers() {
        
        List<User> users = new ArrayList<>();
        users.add(new User());

        when(mockUserRepo.findAll()).thenReturn(users);
        when(mockModelMapper.map(users, new TypeToken<List<UserDto>>() {}.getType())).thenReturn(new ArrayList<>());

        
        List<UserDto> result = userService.get();

        
        assertNotNull(result);
        verify(mockUserRepo).findAll();
        verify(mockModelMapper).map(users, new TypeToken<List<UserDto>>() {}.getType());
    }

    @Test
    public void testGetUserByEmail() {
        
        String email = "test@example.com";
        User user = new User();
        user.setEmailId(email);

        when(mockUserRepo.findByEmailId(email)).thenReturn(Optional.of(user));
        when(mockModelMapper.map(user, UserDto.class)).thenReturn(new UserDto());

        
        UserDto result = userService.get(email);

        
        assertNotNull(result);
        verify(mockUserRepo).findByEmailId(email);
        verify(mockModelMapper).map(user, UserDto.class);
    }

    @Test
    public void testGetUserCredentials() {
        
        String email = "test@example.com";
        User user = new User();
        user.setEmailId(email);

        when(mockUserRepo.findByEmailId(email)).thenReturn(Optional.of(user));
        when(mockModelMapper.map(user, UserCredentials.class)).thenReturn(new UserCredentials());

        
        UserCredentials result = userService.getCredntials(email);

        
        assertNotNull(result);
        verify(mockUserRepo).findByEmailId(email);
        verify(mockModelMapper).map(user, UserCredentials.class);
    }
}