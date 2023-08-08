package com.bootcamp.EcommerceBackend.services;

import com.bootcamp.EcommerceBackend.entities.*;
import com.bootcamp.EcommerceBackend.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Service
public class CardService {

    @Autowired
    private CardRepository cardRepository;
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private TransactionRepository transactionRepository;
    @Autowired
    private CartRepository cartRepository;
    @Autowired
    private OrderRepository orderRepository;
    private ProductServices productServices;
    private CartService cartService;
    @Autowired
    private EmailServiceImpl emailService;

    public List<Card> getAllCards() {
        return cardRepository.findAll();
    }

    public Card getCardById(Long id) {
        return cardRepository.findById(id).orElse(null);
    }

    public List<Card> getCardByUserId(int userId) {
        return cardRepository.findByUserId(userId);
    }

    public Card saveCard(Card card) {
        return cardRepository.save(card);
    }

    public void deleteCard(Long id) {
        cardRepository.deleteById(id);
    }

    public Card updateCard(Long id, Card updatedCard) {
        Optional<Card> optionalCard = cardRepository.findById(id);
        if (optionalCard.isPresent()) {
            Card card = optionalCard.get();
            card.setNumber(updatedCard.getNumber());
            card.setExpiry(updatedCard.getExpiry());
            card.setCvc(updatedCard.getCvc());
            card.setCardType(updatedCard.getCardType());
            card.setName(updatedCard.getName());
            card.setBalance(updatedCard.getBalance());
            card.setUserId(updatedCard.getUserId());
            // Update any other fields that need to be updated

            return cardRepository.save(card);
        } else {
            return null;
        }
    }

    public ResponseEntity<HttpStatus> checkOut(@PathVariable Long cardId, @RequestBody List<Long> selectedItems) {
        User user = userRepository.findByEmail(SecurityContextHolder.getContext().getAuthentication().getName()).orElse(null);
        Optional<Card> card = cardRepository.findByCardId(cardId);

        if (user != null && card.isPresent()) {
            double balanceToCheck = card.get().getBalance();
            for (Long cartItemId : selectedItems) {
                Optional<Carts> cartItems = cartRepository.findById(cartItemId);
                balanceToCheck -= cartItems.get().getPrice();
                if(balanceToCheck >= 0) {
                    double cardBalance = card.get().getBalance();
                    double total = 0;

                    for (Long cartId : selectedItems) {
                        Optional<Carts> cart = cartRepository.findById(cartId);
                        if (cart.isPresent()) {

                            cardBalance -= cart.get().getPrice();
                            double totalPrice = cart.get().getPrice() * cart.get().getQuantity();
                            total += totalPrice;
                            long quantity = cart.get().getQuantity();

                            Order order = new Order();
                            order.setPurchaseDate(LocalDate.now());
                            order.setProductId(cart.get().getProductId());
                            order.setPrice(totalPrice);
                            order.setCardNumber(card.get().getNumber());
                            order.setQuantity(quantity);
                            order.setUserId(cart.get().getUserId());
                            orderRepository.save(order);

                            // Optionally, you can remove the cart item after adding it to the orders table
                            cartRepository.delete(cart.get());
                        }
                    }

                    Transaction transaction = new Transaction();
                    transaction.setUserId(user.getUserId());
                    transaction.setOrderTotal(total);
                    transaction.setPurchaseDate(LocalDate.now());

//               Set the cardId in the Transaction object
                    Card transactionCard = new Card();
                    transactionCard.setCardId(cardId);
                    transaction.setCardId(transactionCard.getCardId());
                    transactionRepository.save(transaction);

                     emailService.sendSimpleMail(user, transaction);

                    card.get().setBalance(cardBalance);
                    cardRepository.save(card.get());

                    return ResponseEntity.status(HttpStatus.CREATED).build();
                }
                return ResponseEntity.status(HttpStatus.FORBIDDEN).build();
            }
        } else {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).build();
        }
        return ResponseEntity.status(HttpStatus.FORBIDDEN).build();

    }

}

