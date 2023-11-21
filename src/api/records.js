import axios from './axios'


export const getRecordsRequest = () => axios.get(`/records`);

export const getRecordRequest = (id) => axios.get(`/records/${id}`);

export const createRecordRequest = (task) =>axios.post('/records', task);

export const updateRecordRequest = (id, task) => axios.put(`/records/${id}`, task);

export const deleteRecordRequest = (id) => axios.delete(`/records/${id}`);