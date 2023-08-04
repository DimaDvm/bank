/* eslint-disable react/prop-types */
import { useState } from 'react';
import '../../styles/index.scss';
import { PinField } from './PinField/PinField';
import { Success } from '../Success/Success';
import { useData } from '../DataContext/Data';
import { activatePhysicalCard } from '../../api/api';

export const PinCheck = () => {
  const [success, setSuccess] = useState(false);
  const { requestedData, updateData } = useData();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleActivatePhysicalCard = async (PIN) => {
    try {
      setIsLoading(true);

      const response = await activatePhysicalCard({ ...requestedData, PIN: PIN });

      if (response.status === 200) {
        updateData({ PIN: PIN })
        setSuccess(true);
      }

    } catch (error) {
      if (error.response?.status === 401) {
        setError('Access blocked');
      } else {
        handleError('Something went wrong!');
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
          : <PinField handlePINSubmit={handleActivatePhysicalCard} error={error} isLoading={isLoading} />
      }
    </>
  );
}