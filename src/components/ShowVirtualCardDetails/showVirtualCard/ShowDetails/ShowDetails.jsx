/* eslint-disable react/prop-types */
import { useState } from 'react';
import '../../../../styles/index.scss';
import { useParams } from 'react-router-dom';
import { LineWave } from 'react-loader-spinner';
import { getCVVApi } from '../../../../api/api';

const cvvProto = 123;

export const ShowDetails = ({ details, otp }) => {
  const [showCVV, setShowCVV] = useState(false);
  const [cvv, setCvv] = useState(null);
  const { pan, expMon, expYear, cardHolderName } = details;
  const { key } = useParams();
  const [isCVVLoading, setIsCVVLoading] = useState(false);


  const visibleCVV = showCVV ? cvv : '***';

  const getCVV = async (key) => {
    try {
      setIsCVVLoading(true)

      const cvv = await getCVVApi(key, otp);

      setCvv(cvv);
    } catch (err) {
      setCvv(cvvProto);
      console.log('Failed to get CVV. Please try again later.');
    }

    setIsCVVLoading(false)
  };

  const handleShowCvv = () => {
    if (cvv === null) {
      getCVV(key)
    }

    setShowCVV(!showCVV)
  }

  const formattedCardNumber = pan.replace(/(\d{4})/g, '$1 ');

  return (
    <div className="details">
      <p className='service'>Customer Service: +44 20 3838 0706</p>
      <div className="black-line">
      </div>

      <div className="personal-data">
        <p>{cardHolderName}</p>
        <p>{formattedCardNumber}</p>
        <p>
          <span className="sub">exp</span>
          <span> {expMon}/{expYear}</span>
          <span> </span>
          <span className="sub">cvv</span>
          <span> </span>
          <div className="cvv-container">
            {isCVVLoading ? (
              <div className="cvv-loader">
                <LineWave height='14' width='34' color='#ffa500' />
              </div>
            ) : (
              <span className="cvv">{visibleCVV}</span>
            )}
          </div>
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