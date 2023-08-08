package com.bootcamp.EcommerceBackend.controllers;


import com.bootcamp.EcommerceBackend.entities.Product;
import com.bootcamp.EcommerceBackend.repository.ProductRepository;
import com.bootcamp.EcommerceBackend.services.ProductServices;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@RestController
@RequestMapping("/admin/")
public class AdminProductController {

    @Autowired
    private ProductServices productService;

    @Autowired
    private ProductRepository productRepository;

    @PostMapping("/saveProduct")
    public ResponseEntity<?> saveProduct(@ModelAttribute Product product, @RequestParam MultipartFile file) {
        if (!productService.existByProductName(product.getProductName())) {
            Product products = new Product();
            products.setProductName(product.getProductName());
            products.setPrice(product.getPrice());
            products.setDescription(product.getDescription());
            products.setQuantity(product.getQuantity());
            productService.uploadImage(file, file.getOriginalFilename());
            products.setImage(file.getOriginalFilename());
            products.setCategory(product.getCategory());

            return new ResponseEntity<>(productService.saveProduct(products), HttpStatus.CREATED);
        }
        return new ResponseEntity<>(HttpStatus.CONFLICT);
    }

    @GetMapping("/getAllProducts")
    public ResponseEntity<?> getAllProduct() {
        return new ResponseEntity<>(productService.getAllProduct(), HttpStatus.OK);
    }

    @GetMapping("/getProductById/{productId}")
    public ResponseEntity<?> getProductById(@PathVariable Long productId) {
        return new ResponseEntity<>(productService.getProductById(productId), HttpStatus.OK);
    }

    @DeleteMapping("/deleteProduct/{productId}")
    public ResponseEntity<?> deleteProduct(@PathVariable Long productId) {
        return new ResponseEntity<>(productService.deleteProduct(productId), HttpStatus.OK);
    }

    @PutMapping("/editProduct/{productId}")
    public ResponseEntity<?> editProduct(@RequestBody Product product, @PathVariable Long productId) {
        return new ResponseEntity<>(productService.editProduct(product, productId), HttpStatus.CREATED);
    }

    @PostMapping("/addProductFile")
    public @ResponseBody ResponseEntity<HttpStatus> addProductByFile(@RequestParam MultipartFile file)
            throws IOException {
        return productService.addProductByFile(file);
    }

    @GetMapping("/page")
    public List<Product> getProducts(@RequestParam(defaultValue = "10") int limit,
                                     @RequestParam(defaultValue = "0") int offset) {
        // Perform any necessary validation on the limit and offset values

        // Fetch products from the database
        Pageable paging = PageRequest.of(offset, limit);
        Page<Product> page = productRepository.findAll(paging);
        return page.getContent();
    }

}