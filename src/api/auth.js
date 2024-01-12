import axios from './axios'

// const API = 'http://localhost:4000/api'

export const registerRequest = (user) => axios.post(`/Register`, user);

export const loginRequest = user => axios.post(`/login`, user);

export const verifyTokenRequest = (token) =>axios.get('/verify',token);