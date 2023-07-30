import { useState } from 'react';
import '../../styles/index.scss';
import { SmsField } from '../smsContent/SmsField';
import { VirtualCardDetails } from './showVirtualCard/VirtualCardDetails';
import { getVirtualCardDetails } from '../../api/api';

const defaultVirtualCardDetails = {
  pan: '1234 5678 9000 8888',
  expMon: '12',
  expYear: '29',
  cardHolderName: 'Johny Cash',
  cvv: '111'
}

export const ShowVirtualCardDetails = () => {
  const [success, setSuccess] = useState(false);
  const [details, setDetails] = useState(null);
  const [error, setError] = useState(null);

  const handleGetVirtualCardDetails = async (otp) => {
    try {
      const key = '60bf7255942c4242814ccb0af1986c8764c3fc4231a0436e702c3d36';
      const virtualCardDetails = await getVirtualCardDetails(key, otp);
      handleSuccess(virtualCardDetails || defaultVirtualCardDetails)
    } catch (error) {
      handleError(error);
      handleSuccess(defaultVirtualCardDetails)
    }
  };

  const handleError = () => {
    setError('Wrong OTP code. Please try another one!');
    setTimeout(() => setError(null), 2000);
  }

  const handleSuccess = (response) => {
    setSuccess(true);
    setDetails(response)
  }

  return (
    <div className='body'>
      {success ? <VirtualCardDetails details={details} /> : <SmsField checkSms={handleGetVirtualCardDetails} error={error} />}
    </div>
  );
}