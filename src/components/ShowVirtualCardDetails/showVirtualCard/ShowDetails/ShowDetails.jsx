/* eslint-disable react/prop-types */
import { useState } from 'react';
import '../../../../styles/index.scss';
import axios from 'axios';
import { useParams } from 'react-router-dom';

export const ShowDetails = ({ details, otp }) => {
  const [showCVV, setShowCVV] = useState(false);
  const [cvv, setCvv] = useState(null);
  const { pan, expMon, expYear, cardHolderName } = details;
  const { key } = useParams();

  const getCVV = async () => {
    try {
      const requestBody = {
        key,
        otp,
      };

      const response = await axios.post('https://dev2.fin.forkflow.com/fe/virtual-card/cvv', requestBody, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      setCvv(response.data.cvv);
    } catch (err) {
      console.log('Failed to get CVV. Please try again later.');
    }
  };

  const handleShowCvv = () => {
    if(cvv === null) {
      getCVV()
    } else (
      setShowCVV(!showCVV)
    )
  }

  return (
      <div className="details">
        <p className='service'>Customer Service: +44 20 3838 0706</p>
        <div className="black-line">
        </div>

        <div className="personal-data">
          <p>{cardHolderName}</p>
          <p>{pan}</p>
          <p>
            <span className="sub">exp</span> 
            <span> {expMon}/{expYear}</span>
            <span> </span>
            <span className="sub">cvv</span> 
            <span> </span>
            <span className='cvv'>{showCVV ? cvv : '*'.repeat(cvv?.length || 0)}</span>
            <span> </span>

            {showCVV ? (
                <button className="show-button" onClick={handleShowCvv}>hide CVV</button>
              ) : (
                <button className="show-button" onClick={handleShowCvv}>show CVV</button>
              )}
          </p>

          <div className="sub dezined">This card is issued by Dzing Finance Ltd. pursuant to license by Mastercard International</div>
        </div>
      </div>
  );
}