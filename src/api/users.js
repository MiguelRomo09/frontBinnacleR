import axios from './axios'


export const getUsersRequest = () => axios.get(`/users`);

export const getUsersPendingRequest = () => axios.get(`/users/pending`);

export const getUserRequest = (id) => axios.get(`/user/${id}`);

export const deleteUserRequest = (id) => axios.delete(`/users/${id}`);

export const updateRejectedUserRequest = (id,user) => axios.put(`/users/rejected/${id}`, user);

export const updateAcceptedUserRequest = (id,user) => axios.put(`/users/accepted/${id}`,user);

export const updateUserRequest = (id,user) => axios.put(`/users/${id}`,user);

export const checkUserExistRequest = (user) => axios.get(`/users/exist/${user}`);