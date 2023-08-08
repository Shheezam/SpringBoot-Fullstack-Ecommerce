import axios from "axios";

export const getTransactionsByUserId = async (userId) => {
  try {
    const response = await axios.get("/api/admin/transaction/" + userId, {
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

export const getAllTransactions = async () => {
  try {
    const response = await axios.get("/api/admin/transaction", {
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
