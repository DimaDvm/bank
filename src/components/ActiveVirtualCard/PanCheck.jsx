/* eslint-disable react/prop-types */
import { useState } from 'react';
import '../../styles/index.scss';
import { PanField } from './PanField/PanField';
import { PinCheck } from './PinCheck';
import { useData } from '../DataContext/Data';
import axios from 'axios';
import { useParams } from 'react-router-dom';


export const PanCheck = () => {
  const [success, setSuccess] = useState(false);
  const { requestedData, updateData } = useData();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const { key } = useParams();

  const activatePhysicalCard = async (PAN) => {
    try {
      console.log('start pan')
      setIsLoading(true);
      console.log(requestedData)
  
      const request = {
        key: key,
        otp: 8888,
        PAN: PAN
      };
      console.log(request)
  
      await axios.post('https://dev2.fin.forkflow.com/fe/physical-card/activate', request);
      console.log(321)

      updateData({ PAN: PAN });
      console.log(requestedData);
      setSuccess(true);
    } catch (error) {
      if (error.response?.status === 401) {
        setError('Access blocked');
        console.log(1)
      } else if (error.response?.status === 400) {
        handleError('Wrong OTP code. Please try again!');
        console.log(2)
      } else {
        setError('An unexpected error occurred');
        console.log(3, error)
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