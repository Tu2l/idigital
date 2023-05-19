package com.cg.ps;
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

import com.cg.cart.dto.CartDto;

import com.cg.cart.dto.ResponseObject;
import com.cg.cart.entity.Cart;
import com.cg.cart.entity.Product;
import com.cg.cart.repository.CartRepo;
import com.cg.cart.service.RemoteProductService;
import com.cg.cart.service.RemoteUserService;
import com.cg.cart.serviceimpl.CartServiceImpl;

public class CartServiceImplTest {

    @Mock
    private CartRepo mockCartRepo;

    @Mock
    private RemoteUserService mockRemoteUserService;

    @Mock
    private RemoteProductService mockRemoteProductService;

    @Mock
    private ModelMapper mockModelMapper;

    @InjectMocks
    private CartServiceImpl cartService;

    @BeforeEach
    public void setup() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    public void testRemoveFromCart() {
        // Arrange
        Long userId = 1L;
        Long productId = 1L;
        Cart cart = new Cart();
        cart.setUserId(userId);
        List<Product> products = new ArrayList<>();
        Product product = new Product();
        product.setProductId(productId);
        products.add(product);
        cart.setProducts(products);
        
        when(mockCartRepo.findByUserId(userId)).thenReturn(Optional.of(cart));
        when(mockCartRepo.save(cart)).thenReturn(cart);
        when(mockModelMapper.map(cart, CartDto.class)).thenReturn(new CartDto());

        // Act
        CartDto result = cartService.remove(userId, productId);

        // Assert
        assertNotNull(result);
        verify(mockCartRepo).findByUserId(userId);
        verify(mockCartRepo).save(cart);
        verify(mockModelMapper).map(cart, CartDto.class);
    }

    @Test
    public void testGetCart() {
        // Arrange
        Long userId = 1L;
        Cart cart = new Cart();
        cart.setUserId(userId);

        ResponseObject userResponse = new ResponseObject();
        userResponse.setError(false);
        when(mockRemoteUserService.get(userId)).thenReturn(userResponse);

        when(mockCartRepo.findByUserId(userId)).thenReturn(Optional.of(cart));
        when(mockCartRepo.save(cart)).thenReturn(cart);
        when(mockModelMapper.map(cart, CartDto.class)).thenReturn(new CartDto());

        // Act
        Object result = cartService.get(userId);

        // Assert
        assertNotNull(result);
        verify(mockRemoteUserService).get(userId);
        verify(mockCartRepo).findByUserId(userId);
        verify(mockCartRepo).save(cart);
        verify(mockModelMapper).map(cart, CartDto.class);
    }
}
