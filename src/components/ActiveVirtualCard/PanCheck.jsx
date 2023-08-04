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
      console.log(1)
  
      const request = {
        ...requestedData,
        PAN: PAN
      };
      console.log(requestedData)
  
      await axios.post('https://dev2.fin.forkflow.com/fe/physical-card/activate', request);
      console.log(123)

      updateData(request)
      setSuccess(true);
    } catch (error) {
      if (error.response?.status === 401) {
        setError('Access blocked');
        console.log(4)
      } else if (error.response?.status === 400) {
        handleError('Wrong OTP code. Please try again!');
        console.log(5)
      } else {
        setError('An unexpected error occurred');
        console.log(6, error)
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
          : <PanField handleSuccess={activatePhysicalCard} isLoading={isLoading} error={error} />
      }
    </div>
  );
}