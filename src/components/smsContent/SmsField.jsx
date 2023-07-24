/* eslint-disable react/prop-types */
import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import '../../styles/index.scss';

export const SmsField = ({ handleSuccess }) => {
  const [numbers, setNumbers] = useState(['', '', '', '']);
  const [filled, setFilled] = useState(false);
  const [error, setError] = useState(null);

  const inputRefs = useRef(numbers.map(() => React.createRef()));

  const handleNumberChange = (index, value) => {
    const newNumbers = [...numbers];
    newNumbers[index] = /^\d+$/.test(value) ? value : '';
    setNumbers(newNumbers);

    if (value && index < inputRefs.current.length - 1) {
      inputRefs.current[index + 1].current.focus();
    }
  };

  const getVirtualCardDetails = (otp) => {
    const requestData = {
      key: '1234',
      otp,
    };

    axios
      .get('https://dev2.fin.forkflow.com/fe/virtual-card/details', {
        params: requestData
      })
      .then(() => {
        handleSuccess();
      })
      .catch((error) => {
        handleError(error);
      });
  };

  const handleError = () => {
    setError('Wrong OTP code. Please try another one!');
    setTimeout(() => setError(null), 2000);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    setError(null);
    handleSuccess();

    const otp = numbers.join('');

    setNumbers(['', '', '', '']);
    getVirtualCardDetails(otp);
  };

  const handleFillInputs = async (e) => {
    e.preventDefault();
    try {
      const textFromClipboard = await navigator.clipboard.readText();
      const formattedText = textFromClipboard.replace(/\D/g, '');
      const newNumbers = formattedText.padEnd(4, '').split('').slice(0, 4);
      const updatedNumbers = numbers.map((num, index) => newNumbers[index] || num);
      setNumbers(updatedNumbers);
    } catch (error) {
      console.error('Error reading text from clipboard:', error);
    }
  };

  const handleClearInputs = (e) => {
    e.preventDefault();
    setNumbers(['', '', '', '']);
  };

  useEffect(() => {
    setFilled(numbers.some((num) => num));
  }, [numbers]);

  return (
    <>
      <div className="container">
        <div className='circle' />
      </div>

      <div className="blur">
        <div className="code-section">
          <div className="title">Please enter code from SMS</div>

          <div className="error-container">
            {error && <div className="error">{error}</div>}
          </div>

          <div className="tech-section">
            <div className="numbers-box">
              {numbers.map((number, index) => (
                <div key={index} className="number">
                  <input
                    type="text"
                    name={`number${index}`}
                    value={number}
                    onChange={(e) => handleNumberChange(index, e.target.value)}
                    maxLength="1"
                    className='number-input'
                    autoComplete="off"
                    ref={inputRefs.current[index]}
                  />
                </div>
              ))}
            </div>

            <div className="sms-control">
              <div className="resend">Resend (42s)</div>
              {filled ? (
                <button className="paste" onClick={handleClearInputs}>Clear</button>
              ) : (
                <button className="paste" onClick={handleFillInputs}>Paste Code</button>
              )}
            </div>

            <button className='button' onClick={handleSubmit}>Confirm</button>
          </div>
        </div>
      </div>
    </>
  );
}