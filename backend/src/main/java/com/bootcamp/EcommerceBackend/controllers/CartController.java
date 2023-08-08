package com.bootcamp.EcommerceBackend.controllers;

import com.bootcamp.EcommerceBackend.entities.Carts;
import com.bootcamp.EcommerceBackend.repository.CartRepository;
import com.bootcamp.EcommerceBackend.services.CartService;
import com.bootcamp.EcommerceBackend.services.TransactionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("api/customer")
public class CartController {
    @Autowired
    private CartService cartService;

    private CartRepository repository;

    private TransactionService transactionService;

    @PostMapping("/saveCart")
    public @ResponseBody ResponseEntity<HttpStatus> saveCart(@ModelAttribute Carts carts){
        return  cartService.saveCart(carts);
    }

    @GetMapping("/cart/{userId}")
    public List<Carts> getCartByUserId(@PathVariable int userId){
        return cartService.getCartByUserId(userId);
    }

    @PutMapping("/cart/{userId}")
    public  ResponseEntity<HttpStatus>updateCartItemByUserId(@PathVariable Long userId,@RequestBody Carts carts){
        return  cartService.updateCartItemByUserId(userId,carts);
    }

    @PutMapping("/cartProductQuantity/{cartId}")
    public void updateQuantity(@PathVariable("cartId") long cartId, @RequestBody Map<String, Integer> body){
        cartService.updateQuantity(cartId ,body.get("positiveOrNegativeOne"));
    }

    @DeleteMapping("/cart/{cartId}")
    public ResponseEntity<HttpStatus>deleteCartItemById(@PathVariable long cartId){
        return cartService.deleteCartItemById(cartId);
    }

}

