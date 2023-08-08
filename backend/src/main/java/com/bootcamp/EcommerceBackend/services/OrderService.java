package com.bootcamp.EcommerceBackend.services;

import com.bootcamp.EcommerceBackend.entities.Order;
import com.bootcamp.EcommerceBackend.repository.OrderRepository;
import com.bootcamp.EcommerceBackend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class OrderService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private OrderRepository orderRepository;

    public List<Order> getOrderByUserId(int userId) {
        return orderRepository.findByUserId(userId);
    }

    public List<Order> getAllOrders() {
        return orderRepository.findAll();
    }

}
