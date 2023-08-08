import React, { useEffect, useState, useMemo, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { BsPlus } from "react-icons/bs";
import { GrNext, GrPrevious } from "react-icons/gr";
import Typed from "react-typed";
import { CartContext } from "../../Contexts/CartContext";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import axios from "axios";
import Footer from "../../Components/Footer";

const Products = () => {
  const navigate = useNavigate();
  const [productList, setProductList] = useState([]);
  const [sortProduct, setSortProduct] = useState("");
  const [category, setCategory] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredProduct, setFilteredProduct] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);

  //getAllProducts
  useEffect(() => {
    getAllProducts();
  }, [currentPage]);

  //pagination
  const getAllProducts = async () => {
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

  const nextPage = () => {
    setCurrentPage(currentPage + 1);
  };

  const previousPage = () => {
    setCurrentPage(currentPage - 1);
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
    const selectedOption = event.target.value;
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
    if (selectedOption) {
      setProductList(options[selectedOption]);
      setSortProduct(selectedOption);
    } else {
      // Reset the sorting
      setProductList([...productList]);
      setSortProduct("");
    }
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

  //typing effect header
  const [startTyping, setStartTyping] = useState(false);
  useEffect(() => {
    const typingTimeout = setTimeout(() => {
      setStartTyping(true);
    }, 1000);
  }); // Delay the start of typing animation by 1000 milliseconds

  const typedStrings = ["Wear What Is Comfortable", "For You"];
  const { addToCart } = useContext(CartContext);

  // for authentication
  useEffect(() => {
    const authentication = localStorage.getItem("token");
    if (!authentication) {
      window.location.href = "/";
    }
  }, []);
  return (
    <div>
      <section className="py-20">
        <div className="container mx-auto">
          <h1 className="text-6xl font-semibold mb-10 text-center my-20">
            {startTyping && (
              <Typed
                strings={typedStrings}
                typeSpeed={80}
                backSpeed={60}
                loop
              />
            )}
          </h1>
          <div className="flex justify-between items-center mb-10">
            <div className="w-1/4 pr-2">
              <Box sx={{ minWidth: 80 }}>
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">
                    Category
                  </InputLabel>
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
            </div>
            <div className="w-1/4 pl-2 pr-2">
              <Box sx={{ minWidth: 120 }}>
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
            </div>
            <div className="w-2/4 pl-2">
              <input
                type="text"
                placeholder="Search for a product..."
                value={searchQuery}
                onChange={handleSearchChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 lg:mx-8 gap-[30px] max-w-sm mx-auto md:max-w-none md:mx-0">
            {filteredProduct.map((p) => (
              <div className="group">
                <div className="border border-[#e4e4e4]  h-[300px] mb-4 relative overflow-hidden transition duration-300">
                  <div className="w-full h-full flex justify-center items-center">
                    <div className="w-[200px] mx-auto flex justify-center items-center">
                      <div className="absolute top-6 -right-11 group-hover:right-5 p-2 flex flex-col justify-center items-center gap-y-2 opacity-0 group-hover:opacity-100 transition-all duration-300"></div>
                      <Link to={`/user/viewProduct/${p.productId}`}>
                        <img
                          src={require("../../Assets/Images/" + p.image)}
                          alt={p.productName}
                        />
                      </Link>
                    </div>
                  </div>
                  <div className="absolute top-6 -right-11 p-2 flex flex-col justify-center items-center gap-y-2 opacity-0 transition-all duration-300 group-hover:opacity-100 group-hover:right-5">
                    <button
                      onClick={() => {
                        addToCart(p, p.productId);
                      }}
                    >
                      <div className="flex justify-center items-center text-white w-12 h-12 bg-teal-500">
                        <BsPlus className="text-3xl" />
                      </div>
                    </button>
                  </div>
                </div>
                <div>
                  <div className="tex-sm capitalize text-gray-500 mb-1">
                    {p.category}
                  </div>
                  <Link to={`/user/viewProduct/${p.productId}`}>
                    <h2 className="font-semibold mb-1 hover:text-blue-500">
                      {p.productName}
                    </h2>
                  </Link>
                  <h2 className="font-semibold">₱ {p.price}</h2>
                </div>
              </div>
            ))}
          </div>
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
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default Products;
