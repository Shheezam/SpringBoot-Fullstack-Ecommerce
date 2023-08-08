package com.bootcamp.EcommerceBackend.services;

import com.bootcamp.EcommerceBackend.entities.Product;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

public interface ProductServices {

    public Product saveProduct(Product product);

    public List<Product> getAllProduct();

    public Product getProductById(Long productId);

    public String deleteProduct(Long productId);

    public Product editProduct(Product product, Long productId);

    public String uploadImage(MultipartFile file, String imageName);

    public boolean existByProductName(String productName);

    public ResponseEntity<HttpStatus> addProductByFile(MultipartFile file) throws IOException;
}
