import { useState } from 'react';
import '../../styles/index.scss';
import { SmsField } from '../smsContent/SmsField';
import { VirtualCardDetails } from './showVirtualCard/VirtualCardDetails';
import { useParams } from 'react-router-dom';
import { fetchCardDetailsApi } from '../../api/api';

const detailsProto = {
  pan: '1234567890987654',
  expMon: '12',
  expYear: '27',
  cardHolderName: 'Johny Cash'
}

export const ShowVirtualCardDetails = () => {
  const [success, setSuccess] = useState(false);
  const [details, setDetails] = useState(null);
  const [error, setError] = useState(null);
  const [otp, setOtp] = useState(null);
  const { key } = useParams();
  const [isLoading, setIsLoading] = useState(false);

  const fetchCardDetails = async (otp) => {
    try {
      setIsLoading(true);
  
      const response = await fetchCardDetailsApi(key, otp);
  
      setDetails(response);
      setSuccess(true);
      setOtp(otp);
    } catch (error) {
      setSuccess(true);
      setDetails(detailsProto);
      if (error.response?.status === 401) {
        // setError('Access blocked');
      } else {
        handleError('Wrong OTP code. Please try another one!');
      }
    }
  
    setIsLoading(false);
  };

  const handleError = (error) => {
    setError(error);
    setTimeout(() => setError(null), 2000);
  }

  const handleSuccess = (otp) => {
    fetchCardDetails(otp);
  }

  return (
    <div className='body'>
      {
        success
          ? <VirtualCardDetails details={details} otp={otp} />
          : <SmsField checkSms={handleSuccess} error={error} isLoading={isLoading} />
      }
    </div>
  );
}