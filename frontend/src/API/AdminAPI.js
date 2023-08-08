import axios from "axios";

export const saveProduct = async (data) => {
  try {
    const response = await axios.post("/admin/saveProduct", data, {
      withCredentials: true,
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

export const getAllProducts = async () => {
  try {
    const response = await axios.get("/admin/getAllProducts", {
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

export const getProductById = async (productId) => {
  try {
    const response = await axios.get("/admin/getProductById/" + productId, {
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

export const deleteProduct = async (productId) => {
  try {
    const response = await axios.delete("/admin/deleteProduct/" + productId, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    });
    console.log("Successfully deleted");
    window.location.reload();
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const editProduct = async (productId, data) => {
  try {
    const response = await axios.put("/admin/editProduct/" + productId, data, {
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

export const uploadCsvFile = async (data) => {
  try {
    const response = await axios.post("/admin/addProductFile", data, {
      withCredentials: true,
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
