/* eslint-disable react/prop-types */
import { useState } from 'react';
import '../../../styles/index.scss';
import { Success } from '../../Success/Success';
import { useData } from '../../DataContext/Data';
import { NewPinField } from './NewPinField';
import axios from 'axios';

export const NewPinCheck = () => {
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(null);
  const { requestedData, updateData } = useData();
  const [isLoading, setIsLoading] = useState(false);

  const handleChangePIN = async (PIN) => {
    try {
      setIsLoading(true)
      console.log(1)

      const requestBody = {
        ...requestedData,
        PIN: PIN
      };
      console.log(2)

      const response = await axios.post('/physical-card/change-pin', requestBody);
      console.log(3)

      if (response.status === 200) {
        updateData(...requestBody)
        setSuccess(true)
        console.log(44)
      }
    } catch (error) {
      if (error.response?.status === 401) {
        setError('Access blocked');
        console.log(4)
      } else if (error.response?.status === 400) {
        handleError('Wrong OTP code or invalid PAN. Please try again!');
        console.log(5)
      } else {
        setError('An unexpected error occurred');
        console.log(6, error.response?.status)
      }
    }

    setIsLoading(false)
  };

  const handleError = (error) => {
    setError(error);
    setTimeout(() => setError(null), 2000);
  }

  const isActivatingCard = false;

  return (
    <>
      {success ? <Success isActivatingCard={isActivatingCard} /> : <NewPinField handlePINSubmit={handleChangePIN} error={error} isLoading={isLoading} />}
    </>
  );
}
