import {
  Box,
  Button,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Modal,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import Cards from "react-credit-cards";
import "react-credit-cards/es/styles-compiled.css";
import {
  getAllCardsByUserId,
  saveCard,
  deleteCardById,
  getCardById,
} from "../../API/CardAPI";
import { showSuccessToastMessage } from "../../Components/Toastify";
import { useNavigate } from "react-router-dom";
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 500,
  bgcolor: "background.paper",
  border: "1px solid #808080",
  boxShadow: 24,
  p: 4,
};

const Card = () => {
  const navigate = useNavigate();
  const [focus, setFocus] = useState("");
  const [cards, setCards] = useState([]);
  const userId = localStorage.getItem("userId");
  const [cardDetails, setCardDetails] = useState({
    number: "",
    name: "",
    expiry: "",
    cvc: "",
    cardType: "",
    balance: 0,
    userId: userId,
    cardId: null,
  });
  const [formValues, setFormValues] = useState({
    number: "",
    name: "",
    expiry: "",
    cvc: "",
    cardType: "",
    balance: 0,
    userId: userId,
  });

  const handleChange = (e) => {
    const value = e.target.value;
    setFormValues({ ...formValues, [e.target.name]: value });
  };

  // add card modal
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  // view card modal
  const [openView, setOpenView] = useState(false);
  const handleOpenView = (e) => {
    getCardById(e.currentTarget.id)
      .then(function (res) {
        setCardDetails(res);
      })
      .catch((err) => console.log(err));
    setOpenView(true);
  };
  const handleCloseView = () => setOpenView(false);

  useEffect(() => {
    init();
  }, []);

  // get all cards of user
  const init = () => {
    const userId = localStorage.getItem("userId");
    getAllCardsByUserId(userId)
      .then(function (res) {
        setCards(res);
      })
      .catch((err) => console.log(err));
  };

  // save card
  const SaveProduct = async (e) => {
    e.preventDefault();

    saveCard(formValues)
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
    showSuccessToastMessage("Card successfully added!");
    handleClose();
    window.location.reload();
    navigate("/user/card");
  };

  // delete product by id
  const deleteCard = async (e) => {
    e.preventDefault();

    deleteCardById(cardDetails.cardId);
  };

  // for authentication
  useEffect(() => {
    const authentication = localStorage.getItem("token");
    if (!authentication) {
      window.location.href = "/";
    }
  }, []);
  return (
    <>
      <div style={{ paddingTop: 120 }}>
        <Grid container sx={{ paddingX: 30 }}>
          <Grid
            item
            xs={12}
            sx={{
              display: "flex",
              justifyContent: "center",
              alignContent: "center",
              marginBottom: 6,
              marginTop: 4,
            }}
          >
            <Button variant="contained" color="primary" onClick={handleOpen}>
              Add Card
            </Button>
          </Grid>
          {cards.map((c) => (
            <Grid
              key={c.cardId}
              item
              xs={6}
              sx={{
                marginBottom: 8,
                display: "flex",
                justifyContent: "center",
              }}
            >
              <Button
                sx={{ borderRadius: 5 }}
                onClick={handleOpenView}
                id={c.cardId}
              >
                <Cards
                  key={c.cardId}
                  number={c.number}
                  name={c.name}
                  expiry={c.expiry}
                  cvc={c.cvc}
                />
              </Button>
            </Grid>
          ))}
        </Grid>
      </div>

      {/* Add Card Modal */}
      <div>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <Cards
              number={formValues.number}
              name={formValues.name}
              expiry={formValues.expiry}
              cvc={formValues.cvc}
              focused={focus}
            />
            <form>
              <Grid container sx={{ padding: 2 }}>
                <Grid item xs={6} sx={{ padding: 1 }}>
                  <TextField
                    required
                    id="outlined-required"
                    label="Card Number"
                    type="tel"
                    name="number"
                    value={formValues.number}
                    onChange={(e) => handleChange(e)}
                    onFocus={(e) => setFocus(e.target.name)}
                  />
                </Grid>
                <Grid item xs={6} sx={{ padding: 1 }}>
                  <TextField
                    required
                    id="outlined-required"
                    label="Name"
                    type="text"
                    name="name"
                    value={formValues.name}
                    onChange={(e) => handleChange(e)}
                    onFocus={(e) => setFocus(e.target.name)}
                  />
                </Grid>
                <Grid item xs={6} sx={{ padding: 1 }}>
                  <TextField
                    required
                    id="outlined-required"
                    label="MM/YY Expiry"
                    type="text"
                    name="expiry"
                    value={formValues.expiry}
                    onChange={(e) => handleChange(e)}
                    onFocus={(e) => setFocus(e.target.name)}
                  />
                </Grid>
                <Grid item xs={6} sx={{ padding: 1 }}>
                  <TextField
                    required
                    id="outlined-required"
                    label="CVC"
                    type="tel"
                    name="cvc"
                    value={formValues.cvc}
                    onChange={(e) => handleChange(e)}
                    onFocus={(e) => setFocus(e.target.name)}
                  />
                </Grid>
                <Grid item xs={6} sx={{ padding: 1 }}>
                  <FormControl fullWidth>
                    <InputLabel id="cardType">Card Type</InputLabel>
                    <Select
                      labelId="cardType"
                      id="cardType"
                      name="cardType"
                      value={formValues.cardType}
                      label="Card Type"
                      onChange={(e) => handleChange(e)}
                    >
                      <MenuItem value="Credit">Credit</MenuItem>
                      <MenuItem value="Debit">Debit</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={6} sx={{ padding: 1 }}>
                  <TextField
                    required
                    id="outlined-required"
                    label="Balance"
                    type="tel"
                    name="balance"
                    value={formValues.balance}
                    onChange={(e) => handleChange(e)}
                    onFocus={(e) => setFocus(e.target.name)}
                  />
                </Grid>
                <Grid item xs={6} sx={{ marginTop: 4 }}>
                  <Button
                    variant="contained"
                    color="warning"
                    onClick={handleClose}
                  >
                    Cancel
                  </Button>
                </Grid>
                <Grid
                  item
                  xs={6}
                  sx={{
                    display: "flex",
                    justifyContent: "right",
                    marginTop: 4,
                  }}
                >
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={SaveProduct}
                  >
                    Submit
                  </Button>
                </Grid>
              </Grid>
            </form>
          </Box>
        </Modal>
      </div>

      {/* View Card Modal */}
      <div>
        <Modal
          open={openView}
          onClose={handleCloseView}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <Cards
              number={cardDetails.number}
              name={cardDetails.name}
              expiry={cardDetails.expiry}
              cvc={cardDetails.cvc}
            />
            <Typography
              variant="h6"
              style={{ marginTop: 40, marginBottom: 40, textAlign: "center" }}
            >
              {cardDetails.cardType === "Credit"
                ? "Credit Card Balance: ₱ " +
                  cardDetails.balance
                    .toFixed(2)
                    .toString()
                    .replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                : "Debit Card Balance: ₱ " +
                  cardDetails.balance
                    .toFixed(2)
                    .toString()
                    .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
            </Typography>
            <Grid container>
              <Grid
                item
                xs={6}
                sx={{ display: "flex", justifyContent: "left" }}
              >
                <Button
                  variant="contained"
                  color="warning"
                  onClick={handleCloseView}
                >
                  Close
                </Button>
              </Grid>
              <Grid
                item
                xs={6}
                sx={{ display: "flex", justifyContent: "right" }}
              >
                <Button variant="contained" color="error" onClick={deleteCard}>
                  Delete
                </Button>
              </Grid>
            </Grid>
          </Box>
        </Modal>
      </div>
      <br></br>
      <br></br>
      <br></br>
    </>
  );
};

export default Card;
