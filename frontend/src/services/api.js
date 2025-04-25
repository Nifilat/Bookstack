import axios from "axios";

const BASE_URL = "http://127.0.0.1:8000/api";

export const getBooks = async () => {
  const response = await axios.get(`${BASE_URL}/books/`);
  return response.data;
};

export const getBook = async (id) => {
  const response = await axios.get(`${BASE_URL}/books/${id}/`);
  return response.data;
};
