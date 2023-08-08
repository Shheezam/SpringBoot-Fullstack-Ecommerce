package com.bootcamp.EcommerceBackend.controllers;

import com.bootcamp.EcommerceBackend.entities.Order;
import com.bootcamp.EcommerceBackend.services.OrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("api/customer")
public class OrderController {

    @Autowired
    private OrderService orderService;

    @GetMapping("/order")
    public ResponseEntity<List<Order>> getProducts() {
        List<Order> products = orderService.getAllOrders();
        return new ResponseEntity<>(products, HttpStatus.OK);
    }

    @GetMapping("/getAllOrder/{userId}")
    public List<Order> getOrderByUserId(@PathVariable int userId){
        return orderService.getOrderByUserId(userId);
    }

}
