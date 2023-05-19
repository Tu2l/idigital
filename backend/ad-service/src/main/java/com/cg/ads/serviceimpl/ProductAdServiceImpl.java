package com.cg.ads.serviceimpl;

import java.util.ArrayList;
import java.util.List;

import org.modelmapper.ModelMapper;
import org.modelmapper.TypeToken;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import com.cg.ads.dto.ProductAdDto;
import com.cg.ads.dto.ProductDto;
import com.cg.ads.dto.ResponseObject;
import com.cg.ads.entity.AdStatus;
import com.cg.ads.entity.ProductAd;
import com.cg.ads.repository.ProductAdRepo;
import com.cg.ads.service.ProductAdService;
import com.cg.ads.service.RemoteProductCategoryService;
import com.cg.ads.service.RemoteProductService;
import com.cg.ads.service.RemoteUploadService;
import com.cg.ads.service.RemoteUserService;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonMappingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.google.gson.Gson;

@Service
public class ProductAdServiceImpl implements ProductAdService {
	private final static String BY_NAME = "title";
	private final static String BY_DATE = "updatedAt";
	private final static String BY_PRICE = "price";
	private final static int ITEM_PER_PAGE = 20;

	@Autowired
	private ProductAdRepo repo;
	@Autowired
	private RemoteUserService userService;
	@Autowired
	private RemoteProductCategoryService categoryService;
	@Autowired
	private RemoteProductService productService;
	@Autowired
	private RemoteUploadService uploadService;

	@Autowired
	private ModelMapper mapper;

	@Override
	public List<ProductAdDto> get() {
		return mapper.map(repo.findAll(), new TypeToken<List<ProductAdDto>>() {
		}.getType());
	}

	@Override
	public List<ProductAdDto> get(int page) {
		Pageable pageable = PageRequest.of(page < 0 ? 1 : page, ITEM_PER_PAGE);
		return mapper.map(repo.findAll(pageable), new TypeToken<List<ProductAdDto>>() {
		}.getType());
	}

	@Override
	public List<ProductAdDto> get(String by, String order, int page) {
		List<ProductAd> ads = new ArrayList<>();
		Pageable pageable = PageRequest.of(page < 0 ? 1 : page, ITEM_PER_PAGE);
		boolean asc = order.equalsIgnoreCase("asc");
		switch (by) {
		case BY_NAME:
			if (page < 0)
				ads = asc ? repo.findAllByOrderByTitleAsc() : repo.findAllByOrderByTitleDesc();
			else
				ads = asc ? repo.findAllByOrderByTitleAsc(pageable) : repo.findAllByOrderByTitleDesc(pageable);
			break;

		case BY_DATE:
			if (page < 0)
				ads = asc ? repo.findAllByOrderByUpdatedAtAsc() : repo.findAllByOrderByUpdatedAtDesc();
			else
				ads = asc ? repo.findAllByOrderByUpdatedAtAsc(pageable) : repo.findAllByOrderByUpdatedAtDesc(pageable);
			break;

		case BY_PRICE:
			if (page < 0)
				ads = asc ? repo.findAllByOrderByPriceAsc() : repo.findAllByOrderByPriceDesc();
			else
				ads = asc ? repo.findAllByOrderByPriceAsc(pageable) : repo.findAllByOrderByPriceDesc(pageable);
			break;
		}
		return mapper.map(ads, new TypeToken<List<ProductAdDto>>() {
		}.getType());
	}

	@Override
	public List<ProductAdDto> get(String query, int page) {
		Pageable pageable = PageRequest.of(page, ITEM_PER_PAGE);
		return mapper.map(page < 0 ? repo.findByTitleContainingIgnoreCase(query)
				: repo.findByTitleContainingIgnoreCase(query, pageable), new TypeToken<List<ProductAdDto>>() {
				}.getType());
	}

	@Override
	public ProductAdDto get(Long adId) {
		ProductAd product = repo.findById(adId).orElseThrow(() -> new RuntimeException("Ad not found"));
		return mapper.map(product, ProductAdDto.class);
	}

	@Override
	public ProductAdDto add(ProductAdDto dto) {
		ResponseObject res = userService.get(dto.getUserId());
		if (res.isError())
			throw new RuntimeException(res.getMessage());

		res = categoryService.get(dto.getCategoryId());
		if (res.isError())
			throw new RuntimeException(res.getMessage());

		return mapper.map(repo.save(mapper.map(dto, ProductAd.class)), ProductAdDto.class);
	}

	@Override
	public ProductAdDto update(ProductAdDto dto) {
		ProductAd ad = repo.findById(dto.getAdId()).orElseThrow(() -> new RuntimeException("Ad not found"));

		if (dto.getTitle() != null && !ad.getTitle().equals(dto.getTitle()))
			ad.setTitle(dto.getTitle());

		if (dto.getDescription() != null && !ad.getDescription().equals(dto.getDescription()))
			ad.setDescription(dto.getDescription());

		if (dto.getRemarks() != null && !ad.getRemarks().equals(dto.getRemarks()))
			ad.setRemarks(dto.getRemarks());

		if (dto.getPrice() != ad.getPrice())
			ad.setPrice(dto.getPrice());

		if (dto.getQuantity() != ad.getQuantity())
			ad.setQuantity(dto.getQuantity());

		if (dto.getCategoryId() != null && !ad.getCategoryId().equals(dto.getCategoryId())) {
			ResponseObject res = categoryService.get(dto.getCategoryId());
			if (res.isError())
				throw new RuntimeException(res.getMessage());
			ad.setCategoryId(dto.getCategoryId());
		}

		return mapper.map(repo.save(ad), ProductAdDto.class);
	}

	@Override
	public ProductAdDto delete(Long productId) {
		ProductAd ad = repo.findById(productId).orElseThrow(() -> new RuntimeException("Ad not found"));
		repo.deleteById(productId);
		return mapper.map(ad, ProductAdDto.class);
	}

	@Override
	public List<ProductAdDto> get(Long userId, int page) {
		return mapper.map(
				page < 0 ? repo.findByUserId(userId)
						: repo.findByUserId(userId, PageRequest.of(page < 0 ? 1 : page, ITEM_PER_PAGE)),
				new TypeToken<List<ProductAdDto>>() {
				}.getType());
	}

	@Override
	public ProductAdDto accept(Long adId) {
		ProductAd ad = repo.findById(adId).orElseThrow(() -> new RuntimeException("Ad not found"));
		ad.setStatus(AdStatus.ACCEPTED);
		ProductAdDto adDto = mapper.map(ad, ProductAdDto.class);

		// converting it into product
		ProductDto productDto = new ProductDto();
		productDto.setTitle(adDto.getTitle());
		productDto.setDescription(adDto.getDescription());
		productDto.setCategoryId(adDto.getCategoryId());
		productDto.setPrice(adDto.getPrice());
		productDto.setStock(ad.getQuantity());

		try {
			Gson gson = new Gson();
			ObjectMapper mapper = new ObjectMapper();
			ResponseObject res = mapper.readValue(gson.toJson(productService.add(productDto)), ResponseObject.class);

			productDto = mapper.readValue(gson.toJson(res.getData()), ProductDto.class);
			System.err.println(productDto);
		} catch (JsonMappingException e) {
			e.printStackTrace();
		} catch (JsonProcessingException e) {
			e.printStackTrace();
		}
		// rename image folder
		uploadService.rename("ad" + adId, "prod" + productDto.getProductId());

		repo.save(ad);

		return adDto;
	}

	@Override
	public ProductAdDto reject(Long adId) {
		ProductAd ad = repo.findById(adId).orElseThrow(() -> new RuntimeException("Ad not found"));
		ad.setStatus(AdStatus.REJECTED);
		return mapper.map(repo.save(ad), ProductAdDto.class);
	}

	@Override
	public Object get(AdStatus status) {
		return mapper.map(repo.findByStatus(status), new TypeToken<List<ProductAdDto>>() {
		}.getType());
	}

}
