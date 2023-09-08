import axios from 'axios';

export const baseUrl = 'https://dev2.fin.forkflow.com/fe';

export const fetchCardDetailsApi = async (key, otp) => {
  const response = await axios.post(`${baseUrl}/virtual-card/details`, {
    key,
    otp,
  });
  return response.data;
};

export const getCVVApi = async (key, otp) => {
  const requestBody = {
    key,
    otp,
  };

  const response = await axios.post(`${baseUrl}/virtual-card/cvv`, requestBody, {
    headers: {
      'Content-Type': 'application/json',
    },
  });

  return response.data.cvv;
};
