/* eslint-disable react/prop-types */
import React, { useState, useRef, useEffect } from 'react';
import classNames from 'classnames';
import '../../../styles/index.scss';
import { NoDetails } from '../../ShowVirtualCardDetails/showVirtualCard/NoDetails/NoDetails';
import { Rings } from 'react-loader-spinner';

export const PinField = ({ activatePhysicalCard, error, isLoading }) => {
  const [numbers, setNumbers] = useState(['', '', '', '']);

  const inputRefs = useRef(numbers.map(() => React.createRef()));

  const handleNumberChange = (index, value) => {
    const newNumbers = [...numbers];
    newNumbers[index] = /^\d*$/.test(value) ? value : '';
    setNumbers(newNumbers);
  
    const nextEmptyIndex = newNumbers.findIndex(num => num === '');
  
    if (index > 0 && newNumbers[index] === '' && newNumbers[index - 1] !== '') {
      inputRefs.current[index - 1].current.focus();
    } else if (index < inputRefs.current.length - 1 && newNumbers[index] !== '') {
      inputRefs.current[index + 1].current.focus();
    } else if (nextEmptyIndex >= 0) {
      inputRefs.current[nextEmptyIndex].current.focus();
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

    const PIN = numbers.join('');

    activatePhysicalCard(PIN);
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
          <div className="steps">Step 2/2</div>
          <div className="title title-active">Enter a new PIN for a card</div>

          <div className="error-container">
            {error && <div className="error">{error}</div>}
          </div>

          <div className="tech-section">
            <div className="numbers-box" onKeyDown={handleKeyDown}>
              {numbers.map((number, index) => (
                <div key={index} className="number">
                  <input
                    type="tel"
                    name={`number${index}`}
                    value={number}
                    onChange={(e) => handleNumberChange(index, e.target.value)}
                    maxLength="1"
                    className='number-input'
                    autoComplete="off"
                    ref={inputRefs.current[index]}
                    autoFocus={index === 0}
                  />
                </div>
              ))}
            </div>

            <button className='button-active' onClick={handleSubmit}>Set PIN</button>
          </div>
        </div>
      </div>
    </>
  );
}