package com.bootcamp.EcommerceBackend.services;

import com.bootcamp.EcommerceBackend.entities.Transaction;
import com.bootcamp.EcommerceBackend.entities.User;
import org.springframework.stereotype.Service;

@Service
public interface EmailService {
    String sendSimpleMail(User user, Transaction transaction);

}