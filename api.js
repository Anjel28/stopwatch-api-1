import axios from 'axios';

const API_URL = 'http://localhost:3001/stopwatches';

export const getStopwatches = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

export const createStopwatch = async (stopwatch) => {
  const response = await axios.post(API_URL, stopwatch);
  return response.data;
};

export const updateStopwatch = async (id, updatedStopwatch) => {
  const response = await axios.put(`${API_URL}/${id}`, updatedStopwatch);
  return response.data;
};

export const deleteStopwatch = async (id) => {
  const response = await axios.delete(`${API_URL}/${id}`);
  return response.data;
};