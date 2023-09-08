import { useState } from 'react';
import '../../styles/index.scss';
import { SmsField } from '../smsContent/SmsField';
import { useData } from '../DataContext/Data';
import { OldPinCheck } from './OldPin/OldPinCheck';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { baseUrl } from '../../api/api';

export const ChangePhysicalPIN = () => {
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(null);
  const { updateData } = useData();
  const { key } = useParams();
  const [isLoading, setIsLoading] = useState(false);

  const changePhysicalCardPIN = async (otp) => {
    try {
      setIsLoading(true);

      const request = {
        key,
        otp,
      };

      await axios.post(`${baseUrl}physical-card/change-pin`, request);

      updateData(request)
      setSuccess(true);
    } catch (error) {
      if (error.response?.status === 401) {
        setError('Access blocked');
      } else if (error.response?.status === 400) {
        handleError('Wrong OTP code. Please try again!');
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
    <div className='body'>
      {success ? <OldPinCheck /> : <SmsField checkSms={changePhysicalCardPIN} error={error} isLoading={isLoading} />}
    </div>
  );
}