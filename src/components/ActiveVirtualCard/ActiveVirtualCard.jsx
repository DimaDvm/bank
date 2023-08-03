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

  const activateCard = async (otp) => {
    try {
      setIsLoading(true)
      const request = {
        key: key,
        otp: otp,
      }

      updateData(...request)

      const response = await axios.post('https://fe.fin.forkflow.com/fe/physical-card/activate', request);

      if (response.status === 200) {
        setSuccess(true);
      }
    } catch (error) {
      if (error.response.status === 400) {
        handleError('Wrong OTP code. Please try another one!');
      } else {
        setError('Access blocked')
      }
    }
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
          : <SmsField checkSms={activateCard} error={error} isLoading={isLoading} />
      }
    </div>
  );
}