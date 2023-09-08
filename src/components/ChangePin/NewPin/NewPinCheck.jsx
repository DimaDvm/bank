/* eslint-disable react/prop-types */
import { useState } from 'react';
import '../../../styles/index.scss';
import { Success } from '../../Success/Success';
import { useData } from '../../DataContext/Data';
import { NewPinField } from './NewPinField';
import axios from 'axios';
import { baseUrl } from '../../../api/api';

export const NewPinCheck = () => {
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(null);
  const { requestedData } = useData();
  const [isLoading, setIsLoading] = useState(false);

  const changePhysicalCardPIN = async (PIN) => {
    try {
      setIsLoading(true);

      const request = {
        ...requestedData,
        PIN,
      };
  
      await axios.post(`${baseUrl}physical-card/change-pin`, request);

      setSuccess(true);
    } catch (error) {
      if (error.response?.status === 401) {
        setError('Access blocked');
      } else {
        setError('An unexpected error occurred');
      }
    }
  
    setIsLoading(false);
  };

  const isActivatingCard = false;

  return (
    <>
      {success ? <Success isActivatingCard={isActivatingCard} /> : <NewPinField changePhysicalCardPIN={changePhysicalCardPIN} error={error} isLoading={isLoading} />}
    </>
  );
}
