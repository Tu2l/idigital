package com.cg.ads.entity;

import java.time.LocalDate;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.PrePersist;
import jakarta.persistence.PreUpdate;
import lombok.Data;

@Entity
@Data
public class ProductAd {
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private Long adId;
	@Column(nullable = false)
	private Long userId;
	@Column(nullable = false)
	private String title;
	@Column(columnDefinition="text", length=10485760)
	private String description;
	private String remarks;
	private double price;
	private int quantity;
	private Long categoryId;
	@Enumerated(EnumType.STRING)
	private AdStatus status;
	private LocalDate createdAt;
	private LocalDate updatedAt;

	@PrePersist
	private void createdAt() {
		this.createdAt = this.updatedAt = LocalDate.now();
	}

	@PreUpdate
	private void update() {
		this.updatedAt = LocalDate.now();
	}
}
