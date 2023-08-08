import React, { useEffect, useState, useMemo, useRef } from "react";
import { useNavigate } from "react-router-dom";
import {
  Button,
  InputAdornment,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  Modal,
  Box,
  Typography,
} from "@mui/material";
import { Grid } from "@material-ui/core";
import { Container, TextField } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import {
  getAllProducts,
  deleteProduct,
  getProductById,
} from "../../API/AdminAPI";
import { useReactToPrint } from "react-to-print";
import { getOrdersByUserId } from "../../API/OrderAPI";

const PaymentHistory = () => {
  const navigate = useNavigate();
  const [productList, setProductList] = useState([]);
  const [sortProduct, setSortProduct] = useState("");
  const [category, setCategory] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredProduct, setFilteredProduct] = useState([]);
  const componentPDF = useRef();
  const [userData, setUserdata] = useState([]);
  const [orderData, setOrderData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    init();
    initOrder();
  }, []);

  // get all product
  const init = () => {
    const token = localStorage.getItem("token");
    console.log("token", token);
    getAllProducts()
      .then(function (res) {
        setProductList(res);
        console.log("Products: ", res);
      })
      .catch((err) => console.log(err));
  };

  const initOrder = () => {
    const token = localStorage.getItem("token");
    console.log("token", token);
    const userId = localStorage.getItem("userId");
    getOrdersByUserId(userId)
      .then(function (res) {
        setOrderData(res);
        console.log("Orders: ", res);
      })
      .catch((err) => console.log(err));
  };

  // get orders
  const ordersApi = () => {
    const token = localStorage.getItem("token");
    console.log("token", token);
    const userId = localStorage.getItem("userId");
    getOrdersByUserId(userId)
      .then(function (res) {
        setProductList(res);
        console.log("Get All User Orders: ", res);
      })
      .catch((err) => console.log(err));
  };

  // sort
  const handleChangeSort = (event) => {
    const options = {
      "a-z": [...productList].sort((a, b) =>
        a.productName > b.productName ? 1 : -1
      ),
      "z-a": [...productList].sort((a, b) =>
        b.productName > a.productName ? 1 : -1
      ),
      low: [...productList].sort((a, b) => a.price - b.price),
      high: [...productList].sort((a, b) => b.price - a.price),
    };
    setProductList(options[event.target.value]);
    setSortProduct(event.target.value);
  };

  // date/category
  const handleChangeCategory = (event) => {
    setCategory(event.target.value);
  };

  function getFilteredListByCategory() {
    if (!category) {
      return productList;
    }
    return productList.filter((item) => item.category === category);
  }

  var filteredList = useMemo(getFilteredListByCategory, [
    category,
    productList,
  ]);

  // search
  useEffect(() => {
    const filtered = filteredList.filter((item) =>
      item.productName.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredProduct(filtered);
  }, [filteredList, searchQuery]);

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const generatePDF = useReactToPrint({
    content: () => componentPDF.current,
    documentTitle: "Payment History Record",
    onAfterPrint: () => alert("Data saved in PDF"),
  });

  const orderId = productList.map((product) => product.id);

  useEffect(() => {
    const filtered = orderData.filter((item) =>
      productList
        .find((x) => x.productId === item.productId)
        .productName.toLowerCase()
        .includes(searchQuery.toLowerCase())
    );

    setTotalPages(Math.ceil(filtered.length / 10)); // Update total number of pages
    setFilteredProduct(
      filtered.slice((currentPage - 1) * 10, currentPage * 10)
    ); // Apply pagination
  }, [filteredList, searchQuery, currentPage]);
  console.log("filter---", filteredProduct);

  // for authentication
  useEffect(() => {
    const authentication = localStorage.getItem("token");
    if (!authentication) {
      window.location.href = "/";
    }
  }, []);
  return (
    <>
      <div className="container mt-3">
        <div className="row">
          <div className="col-md-12 mt-32">
            <div className="card">
              <div className="card-header fs-3 text-center">
                PAYMENT HISTORY
              </div>
              <div className="card-header fs-3 text-center">
                <Grid container>
                  <Grid item xs={1.5}>
                    <FormControl variant="filled" sx={{ m: 1, minWidth: 120 }}>
                      <InputLabel id="demo-simple-select-filled-label">
                        Sort
                      </InputLabel>
                      <Select
                        labelId="demo-simple-select-filled-label"
                        id="demo-simple-select-filled"
                        value={sortProduct}
                        onChange={handleChangeSort}
                      >
                        <MenuItem value={"a-z"}>A-Z</MenuItem>
                        <MenuItem value={"z-a"}>Z-A</MenuItem>
                        <MenuItem value={"low"}>Lowest Price</MenuItem>
                        <MenuItem value={"high"}>Highest Price</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item xs={1.5}>
                    {/* Date filter */}
                    <FormControl variant="filled" sx={{ m: 1, minWidth: 120 }}>
                      <InputLabel id="demo-simple-select-filled-label">
                        Date
                      </InputLabel>
                      <Select
                        labelId="demo-simple-select-filled-label"
                        id="demo-simple-select-filled"
                        value={category}
                        onChange={handleChangeCategory}
                      >
                      <MenuItem value="">
                          <em>All</em>
                        </MenuItem>
                        <MenuItem value={"Jersey"}>Jersey</MenuItem>
                        <MenuItem value={"Shoes"}>Shoes</MenuItem>
                        <MenuItem value={"Ball"}>Ball</MenuItem>
                        <MenuItem value={"BoardAndRing"}>
                          Board and Ring
                        </MenuItem>
                        <MenuItem value={"Bags"}>Bags</MenuItem>
                        <MenuItem value={"Jackets"}>Jackets</MenuItem>
                        <MenuItem value={"JoggingPants"}>
                          Jogging Pants
                        </MenuItem>
                        <MenuItem value={"Socks"}>Socks</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>
                  {/* Search */}
                  <Grid item xs={8}>
                    <Container maxWidth="md" sx={{}}>
                      <TextField
                        type="search"
                        id="search"
                        label="Search"
                        sx={{ width: 600 }}
                        value={searchQuery}
                        onChange={handleSearchChange}
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="end">
                              <SearchIcon />
                            </InputAdornment>
                          ),
                        }}
                      />
                    </Container>
                  </Grid>
                  <Grid item xs={1}>
                    <Button
                      className="btn-primary"
                      onClick={generatePDF}
                      variant="contained"
                      style={{ backgroundColor: "red", color: "white" }}
                    >
                      DOWNLOAD PDF
                    </Button>
                  </Grid>
                </Grid>
              </div>

              <div className="card-body">
                <div ref={componentPDF} style={{ width: "100%" }}>
                  <table className="table">
                    <thead>
                      <tr>
                        <th scope="col">Order ID Number</th>
                        <th scope="col">Product Name</th>
                        <th scope="col">Date</th>
                        <th scope="col">Card Number</th>
                        <th scope="col">Price</th>
                        <th scope="col">Quantity</th>
                        <th scope="col">Total Amount</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredProduct.map((o, num) => (
                        <tr key={num + 1}>
                          <td>{o.orderId}</td>
                          <td>
                            {
                              productList.find(
                                (x) => x.productId === o.productId
                              ).productName
                            }
                          </td>
                          <td>{o.purchaseDate}</td>
                          <td>**** **** **** {o.cardNumber.substring(0, 4)}</td>
                          <td>₱ {o.price}</td>
                          <td>{o.quantity}</td>
                          <td>₱ {o.price * o.quantity}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PaymentHistory;
