package com.bootcamp.EcommerceBackend.services;

import com.bootcamp.EcommerceBackend.entities.Transaction;
import com.bootcamp.EcommerceBackend.entities.User;
import com.bootcamp.EcommerceBackend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;


@Service
public class EmailServiceImpl implements  EmailService {
    @Autowired
    private JavaMailSender javaMailSender;
    @Autowired
    UserRepository userRepository;

    @Value("${spring.mail.username}")
    private String sender;


    //SEND EMAIL TO USER FOR SUCCESSFUL TRANSACTION
    @Override
    public String sendSimpleMail(User user, Transaction transaction) {
        // Try block to check for exceptions
        try {

            // Creating a simple mail message
            SimpleMailMessage mailMessage
                    = new SimpleMailMessage();

            mailMessage.setFrom(sender);
            mailMessage.setTo(user.getEmail());
            mailMessage.setText("Greetings " +user.getFirstName()+"!\n Woo hoo!  We’re happy to let you know that " +
                    "we’ve received your order.\n Your order is on its way. Your order details can be found below. " +
                    "\n Order Number: #" + transaction.getTransactionId() +
                    "\n Total Amount: ₱"+transaction.getOrderTotal()+
                    "\n Date: "+transaction.getPurchaseDate()+ "\n\nPlease get in touch with us using this form" +
                    " or give us a call at +63 (2) 8779-6558, if you have any questions about the progress of " +
                    "your package. You can respond to this email as well. \nWe are prepared to assist.\n" +
                    "\nWe have a STRICTLY NO UNBOXING VIDEO, NO RETURN POLICY " +
                    "if you would like to return your product(s). Please get in touch with us about this. \n " +
                    "See you soon, \nUnleash Your Inner Champion!\nARC Shop  "  );
            mailMessage.setSubject("ARC ORDER #" + transaction.getTransactionId()+"CONFIRMATION EMAIL");


            // Sending the mail
            javaMailSender.send(mailMessage);
            return "Mail Sent Successfully...";
        }

        // Catch block to handle the exceptions
        catch (Exception e) {
            return "Error while Sending Mail";
        }
    }

}