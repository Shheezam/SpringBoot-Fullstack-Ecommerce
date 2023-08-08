package com.bootcamp.EcommerceBackend.services;
import com.bootcamp.EcommerceBackend.entities.Product;
import com.bootcamp.EcommerceBackend.repository.ProductRepository;
import com.opencsv.bean.CsvToBean;
import com.opencsv.bean.CsvToBeanBuilder;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.io.InputStreamReader;
import java.io.OutputStream;
import java.io.Reader;
import java.net.URLDecoder;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;
import java.util.NoSuchElementException;
import java.util.Objects;

@Service
public class ProductServiceImpl implements ProductServices{

    @Autowired
    private ProductRepository repository;

    @Override
    public Product saveProduct(Product product) {

        return repository.save(product);
    }

    @Override
    public List<Product> getAllProduct() {
        return repository.findAll();
    }

    @Override
    public Product getProductById(Long productId) {
        return repository.findById(productId).orElseThrow(() -> new NoSuchElementException("Product not found"));

    }

    @Override
    public String deleteProduct(Long productId) {
        Product product = repository.findById(productId).get();

        if (product != null) {
            repository.delete(product);
            return "Product Delete Sucessfully";
        }

        return "Something wrong on server";
    }

    @Override
    public Product editProduct(Product product, Long productId) {

        Product oldProduct = repository.findById(productId).get();

        oldProduct.setProductName(product.getProductName());
        oldProduct.setDescription(product.getDescription());
        oldProduct.setPrice(product.getPrice());
        oldProduct.setCategory(product.getCategory());
        oldProduct.setQuantity(product.getQuantity());
        oldProduct.setImage(product.getImage());

        return repository.save(oldProduct);
    }

//    public static final String IMAGE_DIR = "C:\\Users\\ricky.flores_novare\\Desktop\\InternalAssessment\\group6-final-project\\frontend\\src\\Assets\\Images";
    public static final String IMAGE_DIR = "C:\\Users\\adrian.par_novare\\Desktop\\Ecommerce_project\\group6-final-project\\frontend\\src\\Assets\\Images";
//    public static final String IMAGE_DIR = "C:\\Users\\chino.bricenio_novar\\Desktop\\Ecommerce-project\\group6-final-project\\frontend\\src\\Assets\\Images";

    @Override
    public String uploadImage(MultipartFile file, String imageName) {
        String originalImageName;

        if (!file.isEmpty()) {
            try {
                originalImageName = URLDecoder.decode(file.getOriginalFilename(), "UTF-8");
                Path imagePath = Paths.get(IMAGE_DIR, originalImageName);

                try (OutputStream os = Files.newOutputStream(imagePath)) {
                    os.write(file.getBytes());
                }
            } catch (IOException e) {
                throw new RuntimeException("Failed to save image", e);
            }
        } else {
            originalImageName = imageName;
        }

        return originalImageName;
    }

    @Override
    public boolean existByProductName(String productName) {
        return repository.existsByProductName(productName);
    }

    @Override
    @Transactional
    public ResponseEntity<HttpStatus> addProductByFile(MultipartFile file) throws IOException {
        if (!Objects.equals(file.getContentType(), "text/csv")) {
            return new ResponseEntity<>(HttpStatus.UNSUPPORTED_MEDIA_TYPE);
        }
        Reader reader = new InputStreamReader(file.getInputStream());
        CsvToBean<Product> csvToBean = new CsvToBeanBuilder<Product>(reader)
                .withType(Product.class)
                .withIgnoreLeadingWhiteSpace(true)
                .build();
        List<Product> products = csvToBean.parse();
        for (Product product : products){
            if(existByProductName(product.getProductName())){
                return new ResponseEntity<>(HttpStatus.CONFLICT);
            }
            else{
                repository.saveAll(products);
            }
        }
        return new ResponseEntity<>(HttpStatus.OK);
    }

    public Page<Product> getProducts(int pageNo, int pageSize) {
        Pageable pageable = PageRequest.of(pageNo, pageSize);
        return repository.findAll(pageable);
    }


}