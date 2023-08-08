package com.bootcamp.EcommerceBackend.services;

import com.bootcamp.EcommerceBackend.auth.AuthenticationService;
import com.bootcamp.EcommerceBackend.entities.Transaction;
import com.bootcamp.EcommerceBackend.repository.CartRepository;
import com.bootcamp.EcommerceBackend.repository.TransactionRepository;
import com.bootcamp.EcommerceBackend.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class TransactionService {

    @Autowired
    private UserRepository userRepository;
    @Autowired
    private TransactionRepository transactionRepository;
    @Autowired
    private CartRepository cartRepository;
    private final ProductServices productServices;
    private final CartService cartService;
    private final AuthenticationService userService;

    public List<Transaction> getAllTransactions() {
        return transactionRepository.findAll();
    }

    public List<Transaction> getTransactionByUserId(int userId) {
        return transactionRepository.findByUserId(userId);
    }

}
