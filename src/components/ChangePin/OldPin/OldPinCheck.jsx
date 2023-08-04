/* eslint-disable react/prop-types */
import { useState } from 'react';
import '../../../styles/index.scss';
import { useData } from '../../DataContext/Data';
import { OldPinField } from './OldPinField';
import { NewPinCheck } from '../NewPin/NewPinCheck';
import axios from 'axios';

export const OldPinCheck = () => {
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(null);
  const { requestedData, updateData } = useData();
  const [isLoading, setIsLoading] = useState(false);

  const handleChangePIN = async (PAN) => {
    try {
      setIsLoading(true)
      console.log(1)

      const requestBody = {
        ...requestedData,
        PAN: PAN
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

  return (
    <div className='card'>
      {success ? <NewPinCheck /> : <OldPinField handlePINSubmit={handleChangePIN} error={error} isLoading={isLoading} />}
    </div>
  );
}
