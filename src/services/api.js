import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8080/api",
});

// USERS
export const getUser = (id) =>
  api.get(`/users/${id}`).then((res) => res.data);

export const createUser = (data) =>
  api.post("/users", data).then((res) => res.data);

export const loginUser = (name, email) =>
  api.post(`/users/login?name=${name}&email=${email}`).then((res) => res.data);

// ARTICLES
export const getArticles = (params) =>
  api.get("/articles", { params }).then((res) => res.data.content);

export const getArticleById = (id) =>
  api.get(`/articles/${id}`).then((res) => res.data);

export const createArticle = (data) =>
  api.post("/articles", data).then((res) => res.data);


export const updateArticle = (id, data) =>
  api.put(`/articles/${id}`, data).then((res) => res.data);

export const deleteArticle = (id) =>
  api.delete(`/articles/${id}`).then((res) => res.data);

// RESERVATIONS
export const createReservation = (articleId, userId) =>
  api.post(`/reservations?articleId=${articleId}&userId=${userId}`);

export const deleteReservation = (id) =>
  api.delete(`/reservations/${id}`);
