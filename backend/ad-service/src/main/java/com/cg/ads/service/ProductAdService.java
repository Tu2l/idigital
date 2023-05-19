package com.cg.ads.service;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

import com.cg.ads.dto.ProductAdDto;
import com.cg.ads.entity.AdStatus;

public interface ProductAdService {
	Object get();

	Object get(int page);

	Object get(String query, int page);

	Object get(String by, String order, int page);

	Object get(Long adId);	
	
	Object get(AdStatus status);

	Object get(Long userId, int page);

	Object add(ProductAdDto dto);

	Object update(ProductAdDto dto);

	Object accept(Long adId);
	
	Object reject(Long adId);
	
	Object delete(Long productId);
}
