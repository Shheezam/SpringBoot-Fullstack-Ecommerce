import axios from "axios";

export const getOrdersByUserId = async (userId) => {
  try {
    const response = await axios.get("/api/customer/getAllOrder/" + userId, {
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

export const getAllOrders = async () => {
  try {
    const response = await axios.get("/api/customer/order", {
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
