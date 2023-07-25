import axios from 'axios';

export const getVirtualCardDetailsAPI = (otp) => {
  const requestData = {
    key: '1234',
    otp,
  };

  return axios.get('https://dev2.fin.forkflow.com/fe/virtual-card/details', {
    params: requestData,
  });
};