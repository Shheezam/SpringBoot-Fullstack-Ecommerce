package com.bootcamp.EcommerceBackend.repository;

import com.bootcamp.EcommerceBackend.entities.Card;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface CardRepository extends JpaRepository<Card,Long> {
    List<Card> findByUserId(int userId);

    Optional<Card> findByCardId(Long cardId);

}

