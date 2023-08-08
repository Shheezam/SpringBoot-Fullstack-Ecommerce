package com.bootcamp.EcommerceBackend.repository;

import com.bootcamp.EcommerceBackend.entities.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ProductRepository extends JpaRepository<Product,Long> {
    boolean existsByProductName(String productName);

}