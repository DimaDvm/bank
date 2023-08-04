import { useState } from 'react';
import '../../styles/index.scss';
import { SmsField } from '../smsContent/SmsField';
import { PanCheck } from './PanCheck';
import { useData } from '../DataContext/Data';
import { useParams } from 'react-router-dom';
import axios from 'axios';

export const ActiveVirtualCard = () => {
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(null);
  const { updateData } = useData();
  const { key } = useParams();
  const [isLoading, setIsLoading] = useState(false);

  const activatePhysicalCard = async (otp) => {
    try {
      setIsLoading(true);
      console.log(1)
  
      const request = {
        key,
        otp,
      };
      console.log(request)
  
      const response = await axios.post('https://dev2.fin.forkflow.com/fe/physical-card/activate', request);
      console.log(2)
  
      if (response.status === 200) {
        updateData(...request)
        setSuccess(true);
        console.log(3)
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
  
    setIsLoading(false);
  };


  const handleError = (error) => {
    setError(error);
    setTimeout(() => setError(null), 2000);
  }

  return (
    <div className='body'>
      {
        success
          ? <PanCheck />
          : <SmsField checkSms={activatePhysicalCard} error={error} isLoading={isLoading} />
      }
    </div>
  );
}