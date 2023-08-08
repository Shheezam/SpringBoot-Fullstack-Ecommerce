package com.bootcamp.EcommerceBackend.services;

import com.bootcamp.EcommerceBackend.entities.Carts;
import com.bootcamp.EcommerceBackend.entities.User;
import com.bootcamp.EcommerceBackend.repository.CartRepository;
import com.bootcamp.EcommerceBackend.repository.ProductRepository;
import com.bootcamp.EcommerceBackend.repository.UserRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class CartService {

    @Autowired
    private CartRepository cartRepository;
    @Autowired
    private ProductRepository productRepository;
    @Autowired
    private UserRepository userRepository;

    private List<Carts> getAllCarts(){
        return cartRepository.findAll();
    }
    private boolean isProductExists(long productId) {
        Optional<Carts> product = cartRepository.findById(productId);
        return product.isPresent();
    }

    public ResponseEntity<HttpStatus> saveCart(Carts carts){

        Carts cart = new Carts();
        cart.setProductId(carts.getProductId());
        cart.setQuantity(1); // Initial Quantity
        cart.setUserId(carts.getUserId());
        cart.setPrice(carts.getPrice());
        cartRepository.save(cart);
        return  new ResponseEntity<>(HttpStatus.OK);
    }

    public List<Carts>getCartByUserId(int userId ){
        List<Carts> carts=getAllCarts();
        List<Carts> filteredCarts=new ArrayList<>();
        for(Carts cart: carts){
            if(cart.getUserId()==userId){
                filteredCarts.add(cart);
            }
        }
        return filteredCarts;
    }
    public ResponseEntity<HttpStatus>updateCartItemByUserId(Long userId,Carts carts){
        if(userId != carts.getUserId()){
            return new ResponseEntity<>(HttpStatus.FORBIDDEN);
        }
        List<Carts> userCarts= cartRepository.findByUserId(userId);
        boolean cartItemFound=false;
        for(Carts cart:userCarts){
            if(cart.getProductId() == carts.getProductId()){
                cart.setQuantity(carts.getQuantity() + 1);
                cartRepository.save(cart);
                cartItemFound=true;
                break;
            }
        }
        if (cartItemFound){
            return new ResponseEntity<>(HttpStatus.OK);
        }else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }
    public void updateQuantity(long cartId, Integer positiveOrNegativeOne) {
        if (positiveOrNegativeOne > 1 || positiveOrNegativeOne < -1) {
            throw new IllegalStateException();
        }

        Carts carts = cartRepository.findById(cartId)
                .orElseThrow(() -> new ResponseStatusException(
                        HttpStatus.NOT_FOUND, "Cart not found"
                ));

        if ((positiveOrNegativeOne < 0) && (carts.getQuantity() == 1)) {
            cartRepository.deleteById(cartId);
        } else {
            Optional<Carts> optionalCart = cartRepository.findById(cartId);
            Carts cart = optionalCart.get();
            cart.setQuantity(carts.getQuantity() + positiveOrNegativeOne);
            cartRepository.save(cart);
        }
    }

    public ResponseEntity<HttpStatus>deleteCartItemById(long cartId){
        cartRepository.deleteById(cartId);
        return  new ResponseEntity<>(HttpStatus.OK);
    }

    @Transactional
    public ResponseEntity<HttpStatus> deleteAllCart() {
        User user = userRepository.findByEmail(SecurityContextHolder.getContext().getAuthentication().getName()).get();
        List<Carts> carts = cartRepository.findByUserId(user.getUserId());
        cartRepository.deleteAll(carts);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    public List<Carts> getCart() {
        User user = userRepository.findByEmail(SecurityContextHolder.getContext().getAuthentication().getName()).get();
        List<Carts> carts = cartRepository.findByUserId(user.getUserId());
        System.out.println(carts.isEmpty());
        return carts;
    }

}

