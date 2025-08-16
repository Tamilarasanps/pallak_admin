import axios from 'axios';

const BASE_URL = 'http://localhost:5000/api/vehicles';

export const createVehicle = async (formData) => {
  return await axios.post(`${BASE_URL}/create`, formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
};
