import { useState } from 'react';
import logo from './img/Logo.svg';
import './styles/index.scss';
import { SmsField } from './components/smsContent/SmsField';
import { VirtualCardDetails } from './components/showVirtualCard/VirtualCardDetails';

export const App = () => {
  const [success, setSuccess] = useState(false);
  const [details, setDetails] = useState(null);

  const handleSuccess = (response) => {
    setSuccess(true);
    setDetails(response)
  }

  return (
    <div className='body'>
      <div className='card'>
        <div className="container">
          <img src={logo} alt='Logo' />
        </div>

        {success ? <VirtualCardDetails details={details} /> : <SmsField handleSuccess={handleSuccess} />}
      </div>
    </div>
  );
}
