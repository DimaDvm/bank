/* eslint-disable react/prop-types */
import React, { useEffect, useState, useRef } from 'react';
import '../../styles/index.scss';
import classNames from 'classnames';
import logo from '../../img/Logo.svg';
import { Rings } from 'react-loader-spinner';

export const SmsField = ({ checkSms, error, isLoading }) => {
  const [numbers, setNumbers] = useState(['', '', '', '']);
  const [filled, setFilled] = useState(false);

  const inputRefs = useRef([...Array(4)].map(() => React.createRef()));

  const handleNumberChange = (index, value) => {
    const newNumbers = numbers.map((num, i) => (i === index ? value : num));
    setNumbers(newNumbers);

    if (index < inputRefs.current.length - 1 && value !== '') {
      inputRefs.current[index + 1].current.focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleSubmit(e);
    } else if (e.key === 'Backspace' && numbers[index] === '' && index > 0) {
      inputRefs.current[index - 1].current.focus();
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const otp = numbers.join('');
    checkSms(otp);
  };

  const handleFillInput = async (e) => {
    e.preventDefault();
    try {
      const textFromClipboard = await navigator.clipboard.readText();
      const formattedText = textFromClipboard.replace(/\D/g, '');
      const newNumbers = formattedText
        .padEnd(4, '')
        .split('')
        .slice(0, 4)
        .map((num, index) => (num === ' ' ? numbers[index] : num));
      setNumbers(newNumbers);

      const nextEmptyIndex = newNumbers.findIndex((num) => num === '');

      if (nextEmptyIndex >= 0) {
        inputRefs.current[nextEmptyIndex].current.focus();
      }
    } catch (error) {
      throw new Error('Error reading clipboard: ' + error.message);
    }
  };

  const handleClearInput = (e) => {
    e.preventDefault();
    setNumbers(['', '', '', '']);
    inputRefs.current[0].current.focus();
  };

  useEffect(() => {
    setFilled(numbers.some((num) => num !== ''));
  }, [numbers]);

  useEffect(() => {
    const handleDocumentKeyDown = (e) => {
      if (e.key === 'Enter') {
        e.preventDefault();
        handleSubmit(e);
      }
    };

    document.addEventListener('keydown', handleDocumentKeyDown);

    return () => {
      document.removeEventListener('keydown', handleDocumentKeyDown);
    };
  });

  return (
    <div className='card'>
      <div className="container">
        <img src={logo} alt='Logo' />
      </div>

      <div className="container">
        <div className={classNames('circle', { 'red': error })} />
      </div>

      {isLoading && (
        <div className="loader-overlay">
          <div className="loader">
            <Rings height='150' width='150' color="#ffa500" />
          </div>
        </div>
      )}

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
                    type="tel"
                    name={`number${index}`}
                    value={number}
                    onChange={(e) => handleNumberChange(index, e.target.value)}
                    onKeyDown={(e) => handleKeyDown(e, index)}
                    maxLength="1"
                    className='number-input'
                    autoComplete="off"
                    ref={inputRefs.current[index]}
                    autoFocus={index === 0}
                  />
                </div>
              ))}
            </div>

            <div className="sms-control">
              {filled ? (
                <button className="paste" onClick={handleClearInput}>Clear</button>
              ) : (
                <button className="paste" onClick={handleFillInput}>Paste Code</button>
              )}
            </div>

            <button className='button' onClick={handleSubmit}>Confirm</button>
          </div>
        </div>
      </div>
    </div>
  );
};