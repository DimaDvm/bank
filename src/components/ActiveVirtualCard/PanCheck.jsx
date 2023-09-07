/* eslint-disable react/prop-types */
import { useState } from 'react';
import '../../styles/index.scss';
import { PanField } from './PanField/PanField';
import { PinCheck } from './PinCheck';
import { useData } from '../DataContext/Data';
import axios from 'axios';


export const PanCheck = () => {
  const [success, setSuccess] = useState(false);
  const { requestedData, updateData } = useData();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const activatePhysicalCard = async (PAN) => {
    try {
      setIsLoading(true);

      const request = {
        ...requestedData,
        PAN,
      };
  
      await axios.post('https://dev2.fin.forkflow.com/fe/physical-card/activate', request);

      updateData({ PAN: PAN });
      setSuccess(true);
    } catch (error) {
      setSuccess(true);

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

  return (
    <div className='card'>
      {
        success 
          ? <PinCheck /> 
          : <PanField activatePhysicalCard={activatePhysicalCard} isLoading={isLoading} error={error} />
      }
    </div>
  );
}