import React, { useEffect, useState } from "react";
import { saveProduct } from "../../API/AdminAPI";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import {
  showErrorToastMessage,
  showSuccessToastMessage,
} from "../../Components/Toastify";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Grid } from "@material-ui/core";
const AddProduct = () => {
  const navigate = useNavigate();
  // to check authentication
  const authenticated = localStorage.getItem("token");

  const [quantity, setQuantity] = useState(1);
  const [formValues, setFormValues] = useState({
    productName: "",
    description: "",
    price: "",
    image: null,
    category: "",
    quantity: 1,
  });

  const handleChange = (e) => {
    const value = e.target.value;
    setFormValues({ ...formValues, [e.target.name]: value });
  };

  const handleFileChange = (event) => {
    const file = event.target.files?.[0] || null;
    setFormValues((prevValues) => ({
      ...prevValues,
      image: file,
    }));
  };

  const handleDecrement = () => {
    if (quantity > 1) {
      setQuantity((prevCount) => prevCount - 1);
      setFormValues({ ...formValues, ["quantity"]: quantity - 1 });
    }
  };
  const handleIncrement = () => {
    setQuantity((prevCount) => prevCount + 1);
    setFormValues({ ...formValues, ["quantity"]: quantity + 1 });
  };

  const validateForm = () => {
    const { productName, description, price, image, category, quantity } =
      formValues;

    // Check if any field is empty

    if (productName.trim() === "") {
      showErrorToastMessage("Please enter a product name.");
      return false;
    }

    if (description.trim() === "") {
      showErrorToastMessage("Please enter a description.");
      return false;
    }

    if (category === "") {
      showErrorToastMessage("Please choose a category.");
      return false;
    }

    if (price.trim() === "" || isNaN(price)) {
      showErrorToastMessage("Please enter a valid price.");
      return false;
    }

    if (image === null) {
      showErrorToastMessage("Please upload an image.");
      return false;
    }

    return true;
  };

  const ProductRegister = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    try {
      const formData = new FormData();
      formData.append("file", formValues.image);
      formData.append("image", formValues.image?.name || "");
      formData.append("productName", formValues.productName);
      formData.append("description", formValues.description);
      formData.append("price", String(formValues.price));
      formData.append("category", String(formValues.category));
      formData.append("quantity", String(formValues.quantity));

      // Display the key/value pairs

      saveProduct(formData)
        .then((res) => console.log(res))
        .catch((err) => console.log(err));
      showSuccessToastMessage("Product successfully added!");
      navigate("/admin/");
    } catch (error) {
      alert(error);
    }
  };

  const handleCancel = () => {
    navigate("/admin/");
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
          <div className="col-md-6 offset-md-3">
            <div className="card">
              <div className="card-header fs-3 text-center">Add Product</div>

              <div className="card-body">
                <form onSubmit={(e) => ProductRegister(e)}>
                  <div className="mb-3">
                    <label> Enter Product Name</label>
                    <input
                      type="text"
                      name="productName"
                      className="form-control"
                      onChange={(e) => handleChange(e)}
                      value={formValues.productName}
                    />
                  </div>

                  <div className="mb-3">
                    <label> Enter Description</label>
                    <input
                      type="text"
                      name="description"
                      className="form-control"
                      onChange={(e) => handleChange(e)}
                      value={formValues.description}
                    />
                  </div>

                  <div className="mb-3">
                    <label> Choose Category</label>
                    <select
                      id="category"
                      name="category"
                      className="form-control"
                      onChange={(e) => handleChange(e)}
                      value={formValues.category}
                    >
                      <option value="" disabled hidden>
                        Choose here
                      </option>
                      <option value="Jersey">Jersey</option>
                      <option value="Shoes">Shoes</option>
                      <option value="Ball">Ball</option>
                      <option value="BoardAndRing">Board and Ring</option>
                      <option value="Bags">Bags</option>
                      <option value="Jackets">Jackets</option>
                      <option value="JoggingPants">Jogging Pants</option>
                      <option value="Socks">Socks</option>
                    </select>
                  </div>

                  <div className="mb-3">
                    <label> Enter Price (₱)</label>
                    <input
                      type="text"
                      name="price"
                      className="form-control"
                      onChange={(e) => handleChange(e)}
                      value={formValues.price}
                    />
                  </div>
                  <div>
                    <label for="grid-zip">Upload Image</label>
                    <input
                      type="file"
                      id="image"
                      name="image"
                      onChange={handleFileChange}
                      accept="image/*"
                    />
                  </div>
                  <div className="mb-3">
                    <label> Add Quantity</label>
                    <div
                      style={{
                        marginTop: 10,
                        display: "flex",
                        justifyContent: "center",
                      }}
                    >
                      <Button
                        sx={{ border: "1px solid gray", marginX: 2 }}
                        onClick={handleDecrement}
                      >
                        -
                      </Button>

                      <input
                        className="text-center "
                        type="text"
                        name="quantity"
                        onChange={(e) => handleChange(e)}
                        value={formValues.quantity}
                        disabled
                        style={{
                          width: "30%",
                          height: 38,
                          border: "1px solid #EBEBE4",
                        }}
                      />
                      <Button
                        sx={{ border: "1px solid gray", marginX: 2 }}
                        onClick={handleIncrement}
                      >
                        +
                      </Button>
                    </div>
                  </div>
                  <Grid container spacing={2} justifyContent="center">
                    <Grid item>
                      <Button
                        variant="outlined"
                        color="secondary"
                        onClick={handleCancel}
                      >
                        Cancel
                      </Button>
                    </Grid>
                    <Grid item>
                      <Button variant="contained" color="primary" type="submit">
                        Submit
                      </Button>
                    </Grid>
                  </Grid>
                </form>
              </div>
            </div>
          </div>
        </div>
        <ToastContainer />
      </div>
    </>
  );
};

export default AddProduct;
