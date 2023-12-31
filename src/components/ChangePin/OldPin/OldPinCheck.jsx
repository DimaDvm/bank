/* eslint-disable react/prop-types */
import { useState } from 'react';
import '../../../styles/index.scss';
import { useData } from '../../DataContext/Data';
import { OldPinField } from './OldPinField';
import { NewPinCheck } from '../NewPin/NewPinCheck';
import axios from 'axios';
import { baseUrl } from '../../../api/api';

export const OldPinCheck = () => {
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(null);
  const { requestedData, updateData } = useData();
  const [isLoading, setIsLoading] = useState(false);

  const changePhysicalCardPIN = async (oldPIN) => {
    try {
      setIsLoading(true);

      const request = {
        ...requestedData,
        oldPIN,
      };
  
      await axios.post(`${baseUrl}physical-card/change-pin`, request);

      updateData({ oldPIN: oldPIN });
      setSuccess(true);
    } catch (error) {
      if (error.response?.status === 401) {
        setError('Access blocked');
      } else if (error.response?.status === 400) {
        handleError('Wrong PIN. Please try another one!');
      } else {
        setError('An unexpected error occurred');
      }
    }
  
    setIsLoading(false);
  };

  const handleError = (error) => {
    setError(error);
    setTimeout(() => setError(null), 2000);
  }

  return (
    <div className='card'>
      {success ? <NewPinCheck /> : <OldPinField handlePINSubmit={changePhysicalCardPIN} error={error} isLoading={isLoading} />}
    </div>
  );
}
