package com.cg.ps;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.modelmapper.ModelMapper;
import org.modelmapper.TypeToken;
import com.cg.order.dto.OrderDto;
import com.cg.order.dto.ResponseObject;
import com.cg.order.entity.Order;
import com.cg.order.entity.OrderStatus;
import com.cg.order.repository.OrderRepo;
import com.cg.order.service.RemoteProductService;
import com.cg.order.service.RemoteUserService;
import com.cg.order.serviceimpl.OrderServiceImpl;


public class OrderServiceImplTest {

    @Mock
    private OrderRepo mockOrderRepo;

    @Mock
    private RemoteUserService mockRemoteUserService;

    @Mock
    private RemoteProductService mockRemoteProductService;

    @Mock
    private ModelMapper mockModelMapper;

    @InjectMocks
    private OrderServiceImpl orderService;

    @BeforeEach
    public void setup() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    public void testAddOrder() {
        // Arrange
        Long userId = 1L;
        OrderDto orderDto = new OrderDto();
        orderDto.setUserId(userId);
        //orderDto.setProducts(Arrays.asList(new Product()));

        ResponseObject userResponse = new ResponseObject();
        userResponse.setError(false);
        when(mockRemoteUserService.get(userId)).thenReturn(userResponse);

        ResponseObject productResponse = new ResponseObject();
        productResponse.setError(false);
        when(mockRemoteProductService.get(anyLong())).thenReturn(productResponse);

        when(mockModelMapper.map(orderDto, Order.class)).thenReturn(new Order());
        when(mockModelMapper.map(any(), any())).thenReturn(new OrderDto());

        when(mockOrderRepo.save(any(Order.class))).thenReturn(new Order());

        // Act
        OrderDto result = orderService.add(orderDto);

        // Assert
        assertNotNull(result);
        verify(mockRemoteUserService).get(userId);
        verify(mockRemoteProductService, times(orderDto.getProducts().size())).get(anyLong());
        verify(mockModelMapper).map(orderDto, Order.class);
        verify(mockModelMapper, times(orderDto.getProducts().size())).map(any(), any());
        verify(mockOrderRepo).save(any(Order.class));
    }

    @Test
    public void testUpdateOrderStatus() {
        // Arrange
        Long orderId = 1L;
        OrderStatus status = OrderStatus.SHIPPED;
        Order order = new Order();

        when(mockOrderRepo.findById(orderId)).thenReturn(java.util.Optional.of(order));
        when(mockOrderRepo.save(any(Order.class))).thenReturn(order);
        when(mockModelMapper.map(order, OrderDto.class)).thenReturn(new OrderDto());

        // Act
        OrderDto result = orderService.updateStatus(orderId, status);

        // Assert
        assertNotNull(result);
        assertEquals(status, result.getStatus());
        verify(mockOrderRepo).findById(orderId);
        verify(mockOrderRepo).save(any(Order.class));
        verify(mockModelMapper).map(order, OrderDto.class);
    }

    @Test
    public void testGetOrder() {
        // Arrange
        Long orderId = 1L;
        Order order = new Order();

        when(mockOrderRepo.findById(orderId)).thenReturn(java.util.Optional.of(order));
        when(mockModelMapper.map(order, OrderDto.class)).thenReturn(new OrderDto());

        // Act
        OrderDto result = orderService.get(orderId);

        // Assert
        assertNotNull(result);
        verify(mockOrderRepo).findById(orderId);
        verify(mockModelMapper).map(order, OrderDto.class);
    }

    @Test
    public void testGetOrdersByUser() {
        // Arrange
        Long userId = 1L;
        List<Order> orders = new ArrayList<>();
        orders.add(new Order());

        when(mockOrderRepo.findByUserId(userId)).thenReturn(orders);
        when(mockModelMapper.map(orders, new TypeToken<List<OrderDto>>() {}.getType())).thenReturn(Arrays.asList(new OrderDto()));

        // Act
        List<OrderDto> result = orderService.getByUser(userId);

        // Assert
        assertNotNull(result);
        assertEquals(1, result.size());
        verify(mockOrderRepo).findByUserId(userId);
        verify(mockModelMapper).map(orders, new TypeToken<List<OrderDto>>() {}.getType());
    }
}
