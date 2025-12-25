import axios from "axios";

const API_URL = "https://melodi-proprietorial-hue.ngrok-free.dev";

const publicHeaders = {
  "ngrok-skip-browser-warning": "true"
};
const adminHeaders = {
  Authorization: `Bearer ${localStorage.getItem("token")}`,
  "ngrok-skip-browser-warning": "true",
  "Content-Type":"multipart/form-data"
};

// --- BOOKS ---
export const getAllBooks = async () => {
  const res = await axios.get(`${API_URL}/books`, { headers: publicHeaders, });
  return res.data;
};

export const addBook = async (data) => axios.post(`${API_URL}/books/`, data, {headers: adminHeaders});
export const updateBook = async (id, data) => axios.put(`${API_URL}/books/${id}`, data, { headers: adminHeaders });
export const deleteBook = async (id) => axios.delete(`${API_URL}/books/${id}`, { 
  headers : {
  Authorization: `Bearer ${localStorage.getItem("token")}`,
  "ngrok-skip-browser-warning": "true",
  }
});

// --- COPIES ---
export const createCopies = async (bookId, count) => axios.post(`${API_URL}/books/${bookId}/copies?count=${count}`, {}, { 
  headers : {
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  "ngrok-skip-browser-warning": "true",
  }
 });
export const getBookCopies = async (bookId) => {
  const res = await axios.get(`${API_URL}/books/${bookId}/copies`, { headers: {
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  "ngrok-skip-browser-warning": "true",
  } });
  return res.data;
};
export const updateCopyStatus = async (copyId, status) => axios.put(`${API_URL}/books/copies/${copyId}?status=${status}`, {}, { headers: {
  Authorization: `Bearer ${localStorage.getItem("token")}`,
  "ngrok-skip-browser-warning": "true",
} });
export const deleteCopy = async (copyId) => axios.delete(`${API_URL}/books/copies/${copyId}`, { headers: {
  Authorization: `Bearer ${localStorage.getItem("token")}`,
  "ngrok-skip-browser-warning": "true",
} });
