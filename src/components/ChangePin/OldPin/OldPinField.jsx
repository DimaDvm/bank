/* eslint-disable react/prop-types */
import React, { useState, useRef, useEffect } from 'react';
import classNames from 'classnames';
import '../../../styles/index.scss';
import { NoDetails } from '../../ShowVirtualCardDetails/showVirtualCard/NoDetails/NoDetails';
import { Rings } from 'react-loader-spinner';

export const OldPinField = ({ handlePINSubmit, error, isLoading }) => {
  const [numbers, setNumbers] = useState(['', '', '', '']);

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
    const userPIN = numbers.join('');
    handlePINSubmit(userPIN);
  };

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
    <>
      <div className="container">
        <div className={classNames('background-circle-active', { 'red': error })} />
      </div>

      {isLoading && (
        <div className="loader-overlay">
          <div className="loader">
            <Rings height='150' width='150' color="#ffa500" />
          </div>
        </div>
      )}

      <div className='background-blur-active'>
        <div className='bank-card-active'>
          <NoDetails />
        </div>

        <div className="code-section-active">
          <div className="title">Enter your old PIN</div>

          <div className="error-container">
            {error && <div className="error">Wrong PIN. Try another or contact support.</div>}
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

            <button className='button-active orange' onClick={handleSubmit}>Next</button>
          </div>
        </div>
      </div>
    </>
  );
};