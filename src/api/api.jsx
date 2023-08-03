import axios from 'axios';

const BASE_URL = 'https://dev2.fin.forkflow.com/fe';

export const activatePhysicalCard = async (requestData) => {
  try {
    const response = await axios.post(`${BASE_URL}/physical-card/activate`, requestData);
    return response;
  } catch (error) {
    throw error.response.data;
  }
};

export const changePhysicalCardPin = async (requestData) => {
  try {
    const response = await axios.post(`${BASE_URL}/physical-card/change-pin`, requestData);
    return response;
  } catch (error) {
    throw error.response.data;
  }
};