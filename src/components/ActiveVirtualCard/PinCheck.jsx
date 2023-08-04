/* eslint-disable react/prop-types */
import { useState } from 'react';
import '../../styles/index.scss';
import { PinField } from './PinField/PinField';
import { Success } from '../Success/Success';
import { useData } from '../DataContext/Data';
import axios from 'axios';

export const PinCheck = () => {
  const [success, setSuccess] = useState(false);
  const { requestedData } = useData();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const activatePhysicalCard = async (PIN) => {
    try {
      setIsLoading(true);

      const request = {
        ...requestedData,
        PIN,
      };
  
      await axios.post('https://dev2.fin.forkflow.com/fe/physical-card/activate', request);

      setSuccess(true);
    } catch (error) {
      if (error.response?.status === 401) {
        setError('Access blocked');
      } else if (error.response?.status === 400) {
        handleError('Wrong card. Please try another one!');
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

  const isActivatingCard = true;


  return (
    <>
      {
        success 
          ? <Success isActivatingCard={isActivatingCard} /> 
          : <PinField activatePhysicalCard={activatePhysicalCard} error={error} isLoading={isLoading} />
      }
    </>
  );
}