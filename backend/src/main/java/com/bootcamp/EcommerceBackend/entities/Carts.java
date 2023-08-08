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
@Table(name = "_carts")
public class Carts extends DateTime {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="cart_id")
    private long cartId;

    @Column(name="product_id")
    private long productId;

    @Column(name="user_id")
    private long userId;
    @Column(name="quantity")
    private long quantity;

    @Column(name="price")
    private Long price;


}
