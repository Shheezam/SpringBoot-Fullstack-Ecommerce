import axios from "axios";

export const getAllCardsByUserId = async (userId) => {
  try {
    const response = await axios.get(
      "/api/customer/userCards?userId=" + userId,
      {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      }
    );
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const saveCard = async (data) => {
  try {
    const response = await axios.post("/api/customer/saveCard", data, {
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

export const deleteCardById = async (cardId) => {
  try {
    const response = await axios.delete("/api/customer/deleteCard/" + cardId, {
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

export const getCardById = async (cardId) => {
  try {
    const response = await axios.get("/api/customer/cards/" + cardId, {
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
