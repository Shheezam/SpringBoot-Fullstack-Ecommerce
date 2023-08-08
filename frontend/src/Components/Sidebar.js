import React, { useContext, useState, useMemo, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { IoMdArrowForward } from "react-icons/io";
import { FiTrash2 } from "react-icons/fi";
import CartItem from "../Components/CartItem";
import { SidebarContext } from "../Contexts/SidebarContext";
import { CartContext } from "../Contexts/CartContext";
import { getCartByUserId } from "../API/CartAPI";
import { getProductById } from "../API/AdminAPI";
import axios from "axios";
import {
  Box,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  Typography,
} from "@mui/material";

const Sidebar = () => {
  const navigate = useNavigate();
  const { isOpen, handleClose } = useContext(SidebarContext);
  const { cart, clearCart, itemAmount, total } = useContext(CartContext);
  const [sortProduct, setSortProduct] = useState("");
  const [category, setCategory] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredProduct, setFilteredProduct] = useState([]);
  const [productDetails, setProductDetails] = useState([]);
  const [userCart, setUserCart] = useState([]);
  const [checkedItems, setCheckedItems] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const getProductDetails = async () => {
    try {
      for (const item of userCart) {
        const response = await axios.get(
          `/admin/getProductById/${item.productId}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        productDetails[item.productId] = response.data;
      }
      const noEmptyStrings = productDetails.filter((str) => str !== "");
      setProductDetails(noEmptyStrings);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    getProductDetails();
  }, [userCart]);
  function getFilteredListByCategory() {
    if (!category) {
      return productDetails;
    }
    return productDetails.filter((item) => item.category === category);
  }

  var filteredList = useMemo(getFilteredListByCategory, [
    category,
    productDetails,
  ]);
  const handleChangeCategory = (event) => {
    setCategory(event.target.value);
  };

  const handleChangeSort = (event) => {
    const selectedOption = event.target.value;
    const options = {
      "a-z": [...productDetails].sort((a, b) =>
        a.productName > b.productName ? 1 : -1
      ),
      "z-a": [...productDetails].sort((a, b) =>
        b.productName > a.productName ? 1 : -1
      ),
      low: [...productDetails].sort((a, b) => a.price - b.price),
      high: [...productDetails].sort((a, b) => b.price - a.price),
    };
    if (selectedOption) {
      setSortProduct(selectedOption);
      setProductDetails(options[selectedOption]);
    } else {
      setSortProduct("");
      setProductDetails(filteredList);
    }
  };

  useEffect(() => {
    const filtered = filteredList.filter((item) =>
      item.productName.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredProduct(filtered);
  }, [filteredList, searchQuery]);

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

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

  const handleCheckboxChange = (event, cartId) => {
    const checked = event.target.checked;

    axios
      .put(
        `/api/customer/cartCheckout/${cartId}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
          },
        }
      )
      .then(() => {
        console.log("Checkout status updated successfully");
      })
      .catch((error) => {
        console.error("Error updating checkout status:", error);
      });

    if (checked) {
      setCheckedItems((checkedItems) => [...checkedItems, cartId]);
    } else {
      setCheckedItems(checkedItems.filter((item) => item !== cartId));
    }
  };

  const findCart = (productId) =>
    userCart.find((e) => {
      if (e.productId === productId) {
        return e.cartId;
      }
    });

  const handleCheckedAllItems = (event) => {
    const checked = event.target.checked;
    if (checked) {
      const allCartIds = userCart.map((item) => item.cartId);
      setCheckedItems(allCartIds);
    } else {
      setCheckedItems([]);
    }
  };

  const navigateCheckout = (cartId) => {
    if (checkedItems.length === 0) {
      alert("You have not selected any items for checkout");
    } else {
      navigate("/user/checkout", { state: { cartId } });
      window.location.reload();
    }
  };

  useEffect(() => {
    const filtered = filteredList.filter((item) =>
      item.productName.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setTotalPages(Math.ceil(filtered.length / 10)); // Update total number of pages
    setFilteredProduct(
      filtered.slice((currentPage - 1) * 10, currentPage * 10)
    ); // Apply pagination
  }, [filteredList, searchQuery, currentPage]);

  const goToPreviousPage = () => {
    setCurrentPage((prevPage) => prevPage - 1);
  };

  const goToNextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  const isNextPageDisabled = currentPage >= totalPages;
  return (
    <div
      className={`${
        isOpen ? "right-0" : "-right-full"
      } "w-full bg-white fixed top-0 h-full shadow-2xl md:w-[40vw] lg:w-[45vw] xl:max-w-[50vw] transition-all duration-300 z-20 px-4 lg:px-[35px]"`}
    >
      <div className="flex items-center justify-between py-6 border-b">
        <div className="uppercase text-sm font-semibold">
          Shopping Bag ({itemAmount})
        </div>
        <div
          onClick={handleClose}
          className="cursor-pointer w-8 h-8 flex justify-center items-center"
        >
          <IoMdArrowForward className="text-2xl" />
        </div>
      </div>
      <div className="flex flex-col gap-y-2 h-[100px] md:h-[200px] lg:h-[300px] xl:h-[400px] overflow-y-auto overflow-x-hidden border-b">
        <Grid container>
          <Grid
            item
            xs={6}
            sx={{
              paddingRight: 1,
            }}
          >
            {/* Filter By Category */}
            <Box sx={{ minWidth: 80, minHeight: 12, marginTop: 1 }}>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Category</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={category}
                  label="Category"
                  onChange={handleChangeCategory}
                >
                  <MenuItem value="">
                    {" "}
                    <em>All</em>{" "}
                  </MenuItem>
                  <MenuItem value={"Jersey"}>Jersey</MenuItem>
                  <MenuItem value={"Shoes"}>Shoes</MenuItem>
                  <MenuItem value={"Ball"}>Ball</MenuItem>
                  <MenuItem value={"BoardAndRing"}>Board and Ring</MenuItem>
                  <MenuItem value={"Bags"}>Bags</MenuItem>
                  <MenuItem value={"Jackets"}>Jackets</MenuItem>
                  <MenuItem value={"JoggingPants"}>Jogging Pants</MenuItem>
                  <MenuItem value={"Socks"}>Socks</MenuItem>
                </Select>
              </FormControl>
            </Box>
          </Grid>
          <Grid item xs={6} sx={{ paddingLeft: 1 }}>
            {/* Sort By */}
            <Box sx={{ minWidth: 80, minHeight: 12, marginTop: 1 }}>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">
                  Sort Product
                </InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={sortProduct}
                  label="sortProduct"
                  onChange={handleChangeSort}
                >
                  <MenuItem value={""}>Sort By</MenuItem>
                  <MenuItem value={"a-z"}>A-Z</MenuItem>
                  <MenuItem value={"z-a"}>Z-A</MenuItem>
                  <MenuItem value={"low"}>Price Low to High</MenuItem>
                  <MenuItem value={"high"}>Price High to Low</MenuItem>
                </Select>
              </FormControl>
            </Box>
          </Grid>
        </Grid>

        {/* Search */}
        <input
          type="text"
          placeholder="Search for a product..."
          value={searchQuery}
          onChange={handleSearchChange}
          className="w-full px-4 py-2.5 border mt-1 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <Grid container>
          <Grid
            item
            xs={12}
            sx={{
              display: "flex",
              justifyContent: "left",
              alignContent: "center",
              marginTop: 2,
              marginLeft: 2,
            }}
          >
            <input
              id="checkAllItems"
              type="checkbox"
              value="All Items"
              checked={checkedItems.length === userCart.length}
              onChange={handleCheckedAllItems}
            />{" "}
            <Typography sx={{ marginLeft: 1, fontSize: 16 }}>
              All Items
            </Typography>
          </Grid>
        </Grid>
        {/* Display Cart Items */}
        {filteredProduct.map((item) => (
          <>
            <Grid container>
              <Grid
                item
                xs={1}
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignContent: "center",
                }}
              >
                <input
                  type="checkbox"
                  checked={checkedItems.includes(
                    findCart(item.productId).cartId
                  )}
                  onChange={(e) =>
                    handleCheckboxChange(e, findCart(item.productId).cartId)
                  }
                />
              </Grid>
              <Grid item xs={11}>
                <CartItem item={item} />
              </Grid>
            </Grid>
          </>
        ))}
      </div>
      <div className="flex flex-col gap-y-3 mt-4">
        <div className="flex w-full justify-between items-center">
          <div className="font-semibold">
            <span className="mr-2">Subtotal:</span> ₱{" "}
            {parseFloat(total)
              .toFixed(2)
              .toString()
              .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
          </div>
          <div
            onClick={clearCart}
            className="cursor-pointer py-4 bg-red-500 text-white w-12 h-12 flex justify-center items-center text-xl"
          >
            <FiTrash2 />
          </div>
        </div>
        <button
          className="bg-black flex p-2  mt-12 justify-center items-center text-white w-full font-medium"
          onClick={() => navigateCheckout(checkedItems)}
        >
          Checkout
        </button>
        {/* Pagination */}
        <div className="flex justify-between mt-4">
          <button
            disabled={currentPage === 1}
            onClick={goToPreviousPage}
            className="bg-gray-200 px-4 py-2 rounded-md cursor-pointer"
          >
            Previous
          </button>
          <button
            disabled={isNextPageDisabled}
            onClick={goToNextPage}
            className="bg-gray-200 px-4 py-2 rounded-md cursor-pointer"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
