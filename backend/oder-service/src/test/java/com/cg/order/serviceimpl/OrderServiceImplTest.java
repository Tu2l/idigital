package com.cg.order.serviceimpl;

import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.modelmapper.ModelMapper;

import com.cg.order.dto.OrderDto;
import com.cg.order.entity.Order;
import com.cg.order.repository.OrderRepo;
import com.cg.order.service.RemoteProductService;
import com.cg.order.service.RemoteUserService;


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
    public void testGetOrder() {
        
        Long orderId = 1L;
        Order order = new Order();

        when(mockOrderRepo.findById(orderId)).thenReturn(java.util.Optional.of(order));
        when(mockModelMapper.map(order, OrderDto.class)).thenReturn(new OrderDto());

        
        OrderDto result = orderService.get(orderId);

        
        assertNotNull(result);
        verify(mockOrderRepo).findById(orderId);
        verify(mockModelMapper).map(order, OrderDto.class);
    }
}