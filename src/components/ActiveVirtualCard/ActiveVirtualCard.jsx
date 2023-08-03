import { useState } from 'react';
import '../../styles/index.scss';
import { SmsField } from '../smsContent/SmsField';
import { activatePhysicalCard } from '../../api/api';
import { PanCheck } from './PanCheck';
import { useData } from '../DataContext/Data';
import { useParams } from 'react-router-dom';

export const ActiveVirtualCard = () => {
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(null);
  const { updateData } = useData();
  const { key } = useParams();
  const [isLoading, setIsLoading] = useState(false);

  const handleActivatePhysicalCard = async (otp) => {
    try {
      setIsLoading(true);
      updateData({ key: key, otp: otp })
      console.log({ key, otp })

      const response = await activatePhysicalCard({ key, otp });

      if (response.status === 200) {
        setSuccess(true);
      }

    } catch (error) {
      if (error.response?.status === 401) {
        setError('Access blocked');
      } else {
        handleError('Wrong card! Please try another one!');
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
          : <SmsField checkSms={handleActivatePhysicalCard} error={error} isLoading={isLoading} />
      }
    </div>
  );
}