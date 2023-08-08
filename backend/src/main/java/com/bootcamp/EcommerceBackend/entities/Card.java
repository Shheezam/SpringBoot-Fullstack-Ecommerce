package com.bootcamp.EcommerceBackend.entities;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "_card")
public class Card extends DateTime{
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "card_id")
    private long cardId;

    @Column(name = "number")
    private String number;

    @Column(name = "expiry")
    private String expiry;

    @Column(name = "cvc")
    private String cvc;

    @Column(name = "card_type")
    private String cardType;

    @Column(name = "name")
    private String name;

    @Column(name = "balance")
    private Double balance;

    @Column(name = "user_id")
    private long userId;



}

