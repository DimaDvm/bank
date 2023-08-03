import { useState, useEffect } from 'react';
import '../../styles/index.scss';
import { SmsField } from '../smsContent/SmsField';
import { useData } from '../DataContext/Data';
import { OldPinCheck } from './OldPin/OldPinCheck';

const defaultVirtualCardDetails = {
  pan: '1234 5678 9000 8888',
  expMon: '12',
  expYear: '29',
  cardHolderName: 'Johny Cash',
  cvv: '111'
}

export const ChangePhysicalPIN = () => {
  const [success, setSuccess] = useState(false);
  const [details, setDetails] = useState(null);
  const [error, setError] = useState(null);
  const { requestedData, updateData } = useData();

  const handleError = () => {
    setError('Wrong OTP code. Please try another one!');
    setTimeout(() => setError(null), 2000);
  }

  const handleSuccess = (response) => {
    setSuccess(true);
    setDetails(response)
  }

  useEffect(() => {
    console.log(requestedData);
  }, [requestedData]);

  return (
    <div className='body'>
      {success ? <OldPinCheck details={details} /> : <SmsField checkSms={handleGetVirtualCardDetails} error={error} />}
    </div>
  );
}