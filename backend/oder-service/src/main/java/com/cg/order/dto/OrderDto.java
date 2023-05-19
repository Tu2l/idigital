package com.cg.order.dto;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

import com.cg.order.entity.OrderStatus;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonProperty.Access;

import lombok.Data;

@Data
public class OrderDto {
	@JsonProperty(access = Access.READ_ONLY)
	private Long orderId;
	@JsonProperty(access = Access.READ_ONLY)
	private Long userId;
	@JsonProperty(access = Access.READ_ONLY)
	private Double totalPrice;
	private OrderStatus status = OrderStatus.PENDING;
	private LocalDate deliveryDate;
	private List<ProductDto> products = new ArrayList<>();
	@JsonProperty(access = Access.READ_ONLY)
	private LocalDate updatedAt;
	@JsonProperty(access = Access.READ_ONLY)
	private LocalDate createdAt;
}
