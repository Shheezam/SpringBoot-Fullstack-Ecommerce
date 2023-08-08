import axios from "axios";

export const registerUser = async (data) => {
  try {
    const response = await axios.post("/auth/register", data);
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const authenticate = async (email, password) => {
  try {
    const data = {
      email: email,
      password: password,
    };
    const response = await axios.post("/auth/authenticate", data);
    console.log(response.data);
    return response.data;
  } catch (error) {
    throw error;
  }
};
