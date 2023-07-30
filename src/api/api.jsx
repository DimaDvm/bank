import axios from 'axios';

const BASE_URL = 'https://dev2.fin.forkflow.com/fe';

export const getVirtualCardDetails = async (key, otp) => {
  try {
    const requestBody = {
      key,
      otp,
    };

    const response = await axios.post(`${BASE_URL}/virtual-card/details`, requestBody, {
      headers: {
        'Content-Type': 'application/json',
      },
    });

    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const activatePhysicalCard = async (requestBody) => {
  try {
    const response = await axios.post(`${BASE_URL}/physical-card/activate`, requestBody, {
      headers: {
        'Content-Type': 'application/json',
      },
    });

    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const changePINApi = async (key, otp, oldPIN, PIN) => {
  const requestData = {
    key: key,
    otp: otp,
    oldPIN: oldPIN,
    PIN: PIN,
  };

  try {
    const response = await axios.post(`${BASE_URL}/physical-card/change-pin`, requestData);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};