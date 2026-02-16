import axios from "axios";

const API_URL = "https://6992e4728f29113acd3f42a1.mockapi.io/users";

export const getUsers = () => axios.get(API_URL);
export const createUser = (data) => axios.post(API_URL, data);
export const updateUser = (id, data) => axios.put(`${API_URL}/${id}`, data);
export const deleteUser = (id) => axios.delete(`${API_URL}/${id}`);
