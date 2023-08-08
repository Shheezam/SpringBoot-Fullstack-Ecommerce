import axios from "axios";

export const getCartByUserId = async (userId) => {
  try {
    const response = await axios.get("/api/customer/cart/" + userId, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    });
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const saveCart = async (data) => {
  try {
    const response = await axios.post("/api/customer/saveCart", data, {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    });
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const deleteCartById = async (cartId) => {
  try {
    const response = await axios.delete("/api/customer/cart/" + cartId, {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    });
    console.log("Successfully Deleted");
    window.location.reload();
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const updateCartQuantity = async (cartId, positiveOrNegativeOne) => {
  try {
    const response = await axios.put(
      "/api/customer/cartProductQuantity/" + cartId,
      positiveOrNegativeOne,
      {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      }
    );
    console.log("Success", response.data);
    return response.data;
  } catch (error) {
    console.error("Error: ", error);
    throw error;
  }
};
