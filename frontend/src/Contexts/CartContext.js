import React, { createContext, useState, useEffect } from "react";
import {
  saveCart,
  getCartByUserId,
  updateCartQuantity,
  deleteCartById,
} from "../API/CartAPI";
export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  // cart state
  const [cart, setCart] = useState([]);
  // item amount state
  const [itemAmount, setItemAmount] = useState(0);
  // total price state
  const [total, setTotal] = useState(0);

  // User Cart Item
  const [userCart, setUserCart] = useState([]);

  useEffect(() => {
    const total = userCart.reduce((accumulator, currentItem) => {
      return accumulator + currentItem.price * currentItem.quantity;
    }, 0);
    setTotal(total);
  }, [userCart]);

  // update item amount
  useEffect(() => {
    if (userCart) {
      const quantity = userCart.reduce((accumulator, currentItem) => {
        return accumulator + currentItem.quantity;
      }, 0);
      setItemAmount(quantity);
    }
  }, [userCart]);

  // get cart by userID
  useEffect(() => {
    getUserCartById();
  }, []);
  const getUserCartById = () => {
    const userId = localStorage.getItem("userId");
    getCartByUserId(userId)
      .then((res) => {
        setUserCart(res);
      })
      .catch((err) => console.log(err));
  };

  // add to cart
  const addToCart = (product, productId) => {
    const userId = localStorage.getItem("userId");
    const formData = new FormData();
    formData.append("productId", productId);
    formData.append("price", product.price);
    formData.append("userId", userId);

    const isFound = userCart.some((element) => {
      if (element.productId === productId) {
        return true;
      }

      return false;
    });
    if (isFound) {
      const cart = userCart.find((e) => {
        return e.productId === productId;
      });
      // update quantity
      updateCartQuantity(cart.cartId, { positiveOrNegativeOne: 1 })
        .then((res) => console.log(res))
        .catch((err) => console.log(err));
      window.location.reload();
    } else {
      // add to cart
      saveCart(formData)
        .then((res) => console.log(res))
        .catch((err) => console.log(err));

      window.location.reload();
    }

    const newItem = { ...product, quantity: 1 };
    // check if the item is already in the cart
    const cartItem = userCart.find((item) => {
      return item.productId === productId;
    });
    if (cartItem) {
      const newCart = [...userCart].map((item) => {
        if (item.productId === productId) {
          return { ...item, quantity: cartItem.quantity + 1 };
        } else return item;
      });
      setCart(newCart);
    } else {
      setCart([...userCart, newItem]);
    }
  };

  // remove from cart
  const removeFromCart = (productId) => {
    userCart.filter((item) => {
      if (item.productId === productId) {
        deleteCartById(item.cartId);
      }
    });

    window.location.reload();
  };

  // cleart cart
  const clearCart = () => {
    userCart.map((item) => {
      deleteCartById(item.cartId);
    });
    setCart([]);
  };

  // increase amount
  const increaseAmount = (productId) => {
    const IncreaseCart = userCart.find((e) => {
      return e.productId === productId;
    });
    updateCartQuantity(IncreaseCart.cartId, { positiveOrNegativeOne: 1 })
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
    window.location.reload();
  };

  // decrease amount
  const decreaseAmount = (productId) => {
    const decreaseCart = userCart.find((e) => {
      return e.productId === productId;
    });
    updateCartQuantity(decreaseCart.cartId, { positiveOrNegativeOne: -1 })
      .then((res) => console.log(res))
      .catch((err) => console.log(err));

    const cartItem = userCart.find((item) => item.productId === productId);
    if (cartItem) {
      const newCart = userCart.map((item) => {
        if (item.productId === productId) {
          return { ...item, quantity: cartItem.quantity - 1 };
        } else {
          return item;
        }
      });
      setCart(newCart);
    }
    if (cartItem.quantity < 2) {
      removeFromCart(productId);
    }
    window.location.reload();
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        clearCart,
        increaseAmount,
        decreaseAmount,
        userCart,
        itemAmount,
        total,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export default CartProvider;
