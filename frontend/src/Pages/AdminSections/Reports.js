import React, { useEffect, useState, useMemo, useRef } from "react";
import {
  Button,
  InputAdornment,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
} from "@mui/material";
import { Grid } from "@material-ui/core";
import { Container, TextField } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { getAllProducts } from "../../API/AdminAPI";
import { useReactToPrint } from "react-to-print";
import { getAllOrders } from "../../API/OrderAPI";
import { useNavigate } from "react-router";

export default function Reports() {
  const navigate = useNavigate();
  const [productList, setProductList] = useState([]);
  const [sortProduct, setSortProduct] = useState("");
  const [category, setCategory] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredProduct, setFilteredProduct] = useState([]);
  const componentPDF = useRef();
  const [transactionData, setTransactionData] = useState([]);

  useEffect(() => {
    init();
    initTransactions();
  }, []);

  // get all product
  const init = () => {
    getAllProducts()
      .then(function (res) {
        setProductList(res);
        console.log("result", res);
      })
      .catch((err) => console.log(err));
  };

  const initTransactions = () => {
    const userId = localStorage.getItem("userId");
    getAllOrders()
      .then(function (res) {
        setTransactionData(res);
        console.log("Transactions: ", res);
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
    const filtered = transactionData.filter((item) =>
      productList
        .find((x) => x.productId === item.productId)
        .productName.toLowerCase()
        .includes(searchQuery.toLowerCase())
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

  // for authentication
  useEffect(() => {
    const authentication = localStorage.getItem("token");
    if (!authentication) {
      window.location.href = "/";
    }
  }, []);
  return (
    <>
      <div className="container mt-2">
        <div className="row">
          <div className="col-md-12">
            <div className="card">
              <div className="card-header fs-3 text-center">REPORTS</div>
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
                        <MenuItem value={"Shoe"}>Per Day</MenuItem>
                        <MenuItem value={"Bag"}>Per Month</MenuItem>
                        <MenuItem value={"Appliances"}>Per Year</MenuItem>
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
                      DOWNLOAD AS PDF
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
                        <th scope="col">Date</th>
                        <th scope="col">Product Name</th>
                        <th scope="col">Price</th>
                        <th scope="col">Item Count</th>
                        <th scope="col">Total Amount</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredProduct.map((t, num) => (
                        <tr key={num + 1}>
                          <td>{t.orderId}</td>
                          <td>{t.purchaseDate}</td>
                          <td>
                            {
                              productList.find(
                                (x) => x.productId === t.productId
                              ).productName
                            }
                          </td>
                          <td>₱ {t.price}</td>
                          <td>{t.quantity}</td>
                          <td>₱ {t.quantity * t.price}</td>
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
}
