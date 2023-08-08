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
@Table(name = "_transactions")
public class Transaction {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "transaction_id")
    private Long transactionId;
    @Column(name = "order_total")
    private Double orderTotal;
    @Column(name = "purchase_date")
    private LocalDate purchaseDate;

    @Column(name = "user_id")
    private long userId;

    @Column(name = "card_id")
    private long cardId;

}
