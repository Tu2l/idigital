package com.cg.ads.service;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;

@FeignClient(name = "upload-service", url = "http://localhost:8004/api/upload")
public interface RemoteUploadService {
	
	@PostMapping("/rename/{originalName}/{newName}")
	Object rename(@PathVariable String originalName, @PathVariable String newName);
}

