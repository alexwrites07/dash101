import axios from "axios";

const API_URL = "https:/server.avyudha.com"; // Replace with your API URL
const token = localStorage.getItem("token"); // Assuming token is stored in localStorage

const headers = {
  "Content-Type": "application/json",
  Authorization: `Bearer ${token}`,
};

export const createMeeting = async (body) => {
  try {
    const response = await axios.post(`${API_URL}/meetings`, body, { headers });
    return response.data;
  } catch (error) {
    throw error.response?.data?.message || "Something went wrong";
  }
};

export const deleteMeeting = async (id) => {
  try {
    const response = await axios.delete(`${API_URL}/meetings/${id}`, { headers });
    return response.data;
  } catch (error) {
    throw error.response?.data?.message || "Something went wrong";
  }
};

export const editMeeting = async (id, body) => {
  try {
    const response = await axios.put(`${API_URL}/meetings/${id}`, body, { headers });
    return response.data;
  } catch (error) {
    throw error.response?.data?.message || "Something went wrong";
  }
};

export const getPurchasedContacts = async () => {
  try {
    const response = await axios.get(`${API_URL}/purchasedContacts`, { headers });
    return response.data.purchasedContacts;
  } catch (error) {
    throw error.response?.data?.message || "Something went wrong";
  }
};
