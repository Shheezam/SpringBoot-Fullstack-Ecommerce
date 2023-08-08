import React, { useEffect, useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { getAllProducts, deleteProduct } from "../../API/AdminAPI";
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
import CloseIcon from "@mui/icons-material/CloseRounded";
import { uploadCsvFile } from "../../API/AdminAPI";
import { GrNext, GrPrevious } from "react-icons/gr";
import axios from "axios";

const Home = () => {
  const navigate = useNavigate();
  const [productList, setProductList] = useState([]);
  const [sortProduct, setSortProduct] = useState("");
  const [category, setCategory] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredProduct, setFilteredProduct] = useState([]);

  //modal
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [currentPage, setCurrentPage] = useState(0);

  const nextPage = () => {
    setCurrentPage(currentPage + 1);
  };

  const previousPage = () => {
    setCurrentPage(currentPage - 1);
  };

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 800,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };

  //getAllProducts
  useEffect(() => {
    getAProducts();
  }, [currentPage]);

  //pagination
  const getAProducts = async () => {
    try {
      const limit = 10;
      const offset = currentPage;
      const response = await axios.get(
        `/admin/page?limit=${limit}&offset=${offset}`,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      );
      console.log(response.data);
      setProductList(response.data);
      return response.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  // delete product by id
  const deleteProd = (productId) => {
    deleteProduct(productId);
  };

  // add product button navigation
  const addProduct = () => {
    navigate("/admin/addProduct");
  };

  // edit product button navigation
  const editProduct = (productId) => {
    navigate(`/admin/editProduct/${productId}`);
  };

  // category filter
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

  // upload csv form modal

  const [formValues, setFormValues] = useState({
    csv: null,
  });

  const handleFileChangeCsv = (event) => {
    const file = event.target.files?.[0] || null;
    setFormValues((prevValues) => ({
      ...prevValues,
      csv: file,
    }));
  };
  const handleSubmitCsv = async (event) => {
    event.preventDefault();

    try {
      const formData = new FormData();
      formData.append("file", formValues.csv);

      uploadCsvFile(formData);
      alert("Success");
      handleClose();
      window.location.reload();
    } catch (error) {
      // handle error
      if (error.code === "equest failed with status code 415") {
        alert("file type not supported");
      } else if (error.code === "e") {
        alert("test");
      }
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
    <>
      <div className="container mt-3">
        <div className="row">
          <div className="col-md-12">
            <div className="card">
              <div className="card-header fs-3 text-center">
                All Product List
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
                    <FormControl variant="filled" sx={{ m: 1, minWidth: 120 }}>
                      <InputLabel id="demo-simple-select-filled-label">
                        Category
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
                  <Grid item xs={6}>
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
                  <Grid item xs={1.5}>
                    <Button
                      onClick={handleOpen}
                      variant="contained"
                      color="primary"
                    >
                      Upload file (.csv)
                    </Button>
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={() => {
                        addProduct();
                      }}
                      sx={{ marginLeft: 2 }}
                    >
                      Add New Item
                    </Button>
                  </Grid>
                </Grid>
              </div>
              <div className="card-body">
                <table className="table">
                  <thead>
                    <tr>
                      <th scope="col">Sl No</th>
                      <th scope="col">Product Name</th>
                      <th scope="col">Description</th>
                      <th scope="col">Category</th>
                      <th scope="col">Price</th>
                      <th scope="col">Quantity</th>
                      <th scope="col">Image</th>
                      <th scope="col">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredProduct.map((p, num) => (
                      <tr key={num + 1}>
                        <td>{p.productId}</td>
                        <td>{p.productName}</td>
                        <td>{p.description}</td>
                        <td>{p.category}</td>
                        <td>₱ {p.price}</td>
                        <td>{p.quantity}</td>
                        <td>
                          <img
                            src={require("../../Assets/Images/" + p.image)}
                            alt={p.productName}
                            style={{ width: "100px" }}
                          />
                        </td>

                        <td>
                          <Button
                            onClick={() => {
                              editProduct(p.productId);
                            }}
                          >
                            Edit
                          </Button>
                          <Button onClick={() => deleteProd(p.productId)}>
                            Delete
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="upload-csv-modal"
        aria-describedby="upload-csv-modal"
      >
        <Box sx={style}>
          <Box display="flex" justifyContent="flex-end">
            <CloseIcon onClick={handleClose} />
          </Box>
          <Typography id="upload-csv-modal" variant="h6" component="h2">
            Choose a file (.csv)
          </Typography>

          <form onSubmit={handleSubmitCsv} encType="multipart/form-data">
            <div className="input-group mt-3">
              <input
                type="file"
                id="csv"
                name="csv"
                accept=".csv"
                className="form-control"
                onChange={handleFileChangeCsv}
              />

              <button
                type="submit"
                className="btn bg-blue-500 text-white hover:bg-sky-700"
              >
                Submit
              </button>
            </div>
          </form>
        </Box>
      </Modal>
      <div className="flex justify-center items-center mt-5">
        <button
          onClick={previousPage}
          disabled={currentPage === 0}
          className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-md mr-2"
        >
          <GrPrevious className="mr-2" />
          Previous
        </button>
        <button
          onClick={nextPage}
          disabled={filteredProduct.length < 10}
          className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-md"
        >
          Next
          <GrNext className="ml-2" />
        </button>
      </div>
    </>
  );
};

export default Home;
