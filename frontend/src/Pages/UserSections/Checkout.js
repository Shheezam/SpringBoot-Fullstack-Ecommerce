import { Button, Grid, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router";
import Cards from "react-credit-cards";
import "react-credit-cards/es/styles-compiled.css";
import { getAllCardsByUserId } from "../../API/CardAPI";
import { getCartByUserId } from "../../API/CartAPI";
import { getAllProducts } from "../../API/AdminAPI";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import { borderRadius } from "@mui/system";

const Checkout = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const cartId = String(location.state.cartId);
  console.log("Cart ID from carts:" + cartId);

  const [customerCard, setCustomerCard] = useState([]);
  const [selectedCartItem, setSelectedCartItem] = useState([]);
  const [products, setProducts] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [tax, setTax] = useState(0);
  const [selectedCard, setSelectedCard] = useState([]);
  const [isCardSelected, setIsCardSelected] = useState(false);

  const userId = localStorage.getItem("userId");
  useEffect(() => {
    getAllCardsByUserId(userId)
      .then(function (res) {
        setCustomerCard(res);
        console.log("Customer Cards: ", res);
      })
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    getAllProducts()
      .then(function (res) {
        setProducts(res);
        console.log("Products: ", res);
      })
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    getCartByUserId(userId)
      .then(function (res) {
        setSelectedCartItem(res);
        console.log("Cart Items: ", res);
        const cartIdsArray = cartId.split(",");
        const cartContents = res.filter((item) =>
          cartIdsArray.includes(item.cartId.toString())
        );
        setSelectedCartItem(cartContents);
        console.log("Cart Items Selected:", cartContents);
      })
      .catch((err) => console.log(err));
  }, [cartId]);

  useEffect(() => {
    const calculateTotalPrice = () => {
      const taxRate = 0.12;
      let totalPrice = 0;

      totalPrice = selectedCartItem.reduce(
        (total, row) => total + row.price * row.quantity,
        0
      );

      const tax = (totalPrice * taxRate).toFixed(2);

      setTotalPrice(totalPrice);
      setTax(tax);
    };

    calculateTotalPrice();
  }, [selectedCartItem]);

  const findProduct = (productId) =>
    products.find((e) => {
      if (e.productId === productId) {
        return e;
      }
    });

  const handleSelectChange = (event) => {
    const cardId = event.target.value;
    const card = customerCard.find((card) => card.cardId == cardId);
    setSelectedCard(card);
    setIsCardSelected(true);
  };

  // Display an alert if no card is selected
  const handleCheckout = async () => {
    if (!isCardSelected) {
      alert("You have not selected a card.");
      return;
    }

    try {
      const cardId = selectedCard.cardId;
      const selectedItems = selectedCartItem.map((item) => item.cartId);

      await axios.post(
        `/api/customer/checkout/${encodeURIComponent(cardId)}`,
        selectedItems,
        {
          withCredentials: true,
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      );

      alert("Payment Successful!");
      navigate("/user/");
      window.location.reload();
    } catch (error) {
      // Handle the checkout error

      alert("Insufficient Balance");
      //   window.location.reload();
    }
  };

  // for authentication
  useEffect(() => {
    const authentication = localStorage.getItem("token");
    if (!authentication) {
      window.location.href = "/";
    }
  }, []);
  return (
    <div
      style={{
        paddingTop: 120,
        paddingLeft: 330,
        paddingRight: 330,
      }}
    >
      <div
        style={{
          padding: 50,
          border: "1px solid black",
          borderRadius: 10,
        }}
      >
        <Typography sx={{ fontSize: 36 }}>Your Order</Typography>
        <Grid
          container
          sx={{
            border: "1px solid #dddddd",
            borderRadius: 5,
          }}
        >
          {selectedCartItem.map((cart) => {
            return (
              <Grid item xs={12} sx={{ marginBottom: 4, marginTop: 4 }}>
                <Grid container>
                  <Grid item xs={3} sx={{ paddingLeft: 8 }}>
                    <img
                      src={require("../../Assets/Images/" +
                        findProduct(cart.productId).image)}
                      alt={findProduct(cart.productId).productName}
                      style={{ width: "200px" }}
                    />
                  </Grid>
                  <Grid xs={9} sx={{ paddingLeft: 10 }}>
                    <Grid container>
                      <Grid xs={12} sx={{ fontSize: 26, fontWeight: 600 }}>
                        {findProduct(cart.productId).productName}
                      </Grid>
                      <Grid xs={12} sx={{ fontSize: 18, fontWeight: 400 }}>
                        {findProduct(cart.productId).description}
                      </Grid>
                      <Grid
                        xs={6}
                        sx={{
                          marginTop: 4,
                          fontSize: 18,
                          fontWeight: 400,
                        }}
                      >
                        ₱ {cart.price}
                      </Grid>
                      <Grid
                        xs={6}
                        sx={{
                          marginTop: 4,
                          fontSize: 18,
                          fontWeight: 400,
                          display: "flex",
                          justifyContent: "right",
                          paddingRight: 10,
                        }}
                      >
                        Qty: {cart.quantity}
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            );
          })}
        </Grid>
        <Typography sx={{ fontSize: 20, marginTop: 5 }}>
          Total Amount to Pay: {totalPrice}
        </Typography>

        <div>
          <select
            id="card"
            name="card"
            onChange={handleSelectChange}
            style={{ fontSize: 20, marginTop: 40 }}
          >
            <option selected disabled hidden>
              Select Payment Card
            </option>
            {customerCard.map((card) => (
              <>
                <option value={card.cardId}>
                  {card.cardType} - ************{card.number.substr(-4)}
                </option>
              </>
            ))}
          </select>
        </div>
        <Grid container>
          <Grid
            xs={12}
            sx={{
              marginTop: 2,
              display: "flex",
              justifyContent: "left",
            }}
          >
            {selectedCard.length === 0 ? null : (
              <Cards
                key={selectedCard.cardId}
                number={selectedCard.number}
                name={selectedCard.name}
                expiry={selectedCard.expiry}
                cvc={selectedCard.cvc}
              />
            )}
          </Grid>
        </Grid>

        <Grid container>
          <Grid
            item
            xs={12}
            sx={{ display: "flex", justifyContent: "right", marginTop: 6 }}
          >
            <Button
              onClick={handleCheckout}
              sx={{
                backgroundColor: "#0000FF",
                color: "white",
                "&:hover": {
                  backgroundColor: "#00B5E2",
                  color: "white",
                },
              }}
            >
              Place Order
            </Button>
          </Grid>
        </Grid>
      </div>
    </div>
  );
};

export default Checkout;
