package com.cg.ads.service;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

@FeignClient(name = "product-service", url = "http://localhost:8003/api/product")
public interface RemoteProductService {
	@PostMapping
	Object add(@RequestBody Object dto);
}
