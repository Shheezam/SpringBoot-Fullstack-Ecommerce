package com.bootcamp.EcommerceBackend.repository;

import com.bootcamp.EcommerceBackend.entities.Order;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface OrderRepository extends JpaRepository<Order,Long> {
    List<Order> findByUserId(int userId);

}
