package com.cg.order.entity;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.PrePersist;
import jakarta.persistence.PreUpdate;
import jakarta.persistence.Table;
import lombok.Data;

@Data
@Entity
@Table(name = "order_table")
public class Order {
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private Long orderId;
	private Long userId;
	private Double totalPrice;
	@Enumerated(EnumType.STRING)
	private OrderStatus status = OrderStatus.PENDING;
	private LocalDate deliveryDate;
	
	private LocalDate createdAt;
	private LocalDate updatedAt;

	@OneToMany(mappedBy = "order", cascade = CascadeType.ALL)
	private List<Product> products = new ArrayList<>();

	public void setProducts(List<Product> products) {
		if (products == null)
			return;

		this.products = products;
		if(this.totalPrice == null)
			this.totalPrice = 0.0;
		
		for (Product product : this.products) {
			product.setOrder(this);
			this.totalPrice += product.getPrice();
		}
	}


	@PrePersist
	void prePersist() {
		createdAt = updatedAt = LocalDate.now();
	}
	
	@PreUpdate
	void updateDate() {
		updatedAt = LocalDate.now();
	}
}
