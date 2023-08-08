package com.bootcamp.EcommerceBackend.entities;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "_orders")
public class Order {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long orderId;
    private LocalDate purchaseDate;
    private Double Price;
    private String cardNumber;
    private long quantity;

    @Column(name = "user_id")
    private long userId;

    @Column(name = "product_id")
    private long productId;

}
