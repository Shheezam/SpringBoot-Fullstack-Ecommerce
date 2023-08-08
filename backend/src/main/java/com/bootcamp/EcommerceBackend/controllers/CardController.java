package com.bootcamp.EcommerceBackend.controllers;

import com.bootcamp.EcommerceBackend.entities.Card;
import com.bootcamp.EcommerceBackend.repository.CardRepository;
import com.bootcamp.EcommerceBackend.services.CardService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("api/customer")
public class CardController {

    @Autowired
    private CardService cardService;
    @Autowired
    private CardRepository cardRepository;

    // POST /cards : Create a new card
    @PostMapping("/saveCard")
    public ResponseEntity<Object> saveCard(@RequestBody Card card) {
        try {
            // Save the new card using the CardService
            cardService.saveCard(card);
            return new ResponseEntity<Object>("Card saved successfully", HttpStatus.OK);
        } catch (Exception e) {
            String errorMessage = "Failed to save card: " + e.getMessage();
            return new ResponseEntity<Object>(errorMessage, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    // GET /cards : Get all cards
    @GetMapping("/getAllCards")
    public ResponseEntity<Object> getAllCards() {
        try {
            // Get all cards using the CardService
            List<Card> cards = cardService.getAllCards();
            return new ResponseEntity<Object>(cards, HttpStatus.OK);
        } catch (Exception e) {
            String errorMessage = "Failed to get all cards: " + e.getMessage();
            return new ResponseEntity<Object>(errorMessage, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/userCards")
    public List<Card> getUserCards(@RequestParam int userId){
        return cardService.getCardByUserId(userId);
    }


    // GET /cards/{id} : Get a specific card by ID
    @GetMapping("/cards/{id}")
    public ResponseEntity<Object> getCardById(@PathVariable("id") Long id) {
        try {
            // Get the card by ID using the CardService
            Card card = cardService.getCardById(id);
            if (card == null) {
                String errorMessage = "Card with ID " + id + " not found";
                return new ResponseEntity<Object>(errorMessage, HttpStatus.NOT_FOUND);
            }
            return new ResponseEntity<Object>(card, HttpStatus.OK);
        } catch (Exception e) {
            String errorMessage = "Failed to get card with ID " + id + ": " + e.getMessage();
            return new ResponseEntity<Object>(errorMessage, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PutMapping("/updateCards/{cardId}")
    public ResponseEntity<Object> updateCard(@PathVariable("cardId") long cardId, @RequestBody Card card) {
        try {
            // Update the card using the CardService
            Card updatedCard = cardService.updateCard(cardId, card);
            if (updatedCard == null) {
                String errorMessage = "Card with ID " + cardId + " not found";
                return new ResponseEntity<Object>(errorMessage, HttpStatus.NOT_FOUND);
            }
            return new ResponseEntity<Object>("Card updated successfully", HttpStatus.OK);
        } catch (Exception e) {
            String errorMessage = "Failed to update card with ID " + cardId + ": " + e.getMessage();
            return new ResponseEntity<Object>(errorMessage, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    // DELETE /cards/{id} : Delete a specific card by ID
    @DeleteMapping("/deleteCard/{id}")
    public ResponseEntity<Object> deleteCard(@PathVariable("id") Long id) {
        try {
            // Delete the card by ID using the CardService
            cardService.deleteCard(id);
            return new ResponseEntity<Object>("Card deleted successfully", HttpStatus.OK);
        } catch (Exception e) {
            String errorMessage = "Failed to delete card with ID " + id + ": " + e.getMessage();
            return new ResponseEntity<Object>(errorMessage, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PostMapping("/checkout/{cardId}")
    public ResponseEntity<HttpStatus>checkOut(@PathVariable Long cardId, @RequestBody List<Long> selectedItems){
        return cardService.checkOut(cardId, selectedItems);
    }


}

