/* eslint-disable react/prop-types */
import React, { useState, useRef, useEffect } from 'react';
import classNames from 'classnames';
import '../../../styles/index.scss';
import { Rings } from 'react-loader-spinner';

export const PanField = ({ activatePhysicalCard, error, isLoading }) => {
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
    activatePhysicalCard(userPIN);
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
          <div className="details">
            <p className='service'>Customer Service: +44 20 3838 0706</p>
            <div className="black-line">
            </div>

            <div className="personal-data">
              <p>xxxx xxxx xxxx <span className='pan'>{numbers.join('')}</span></p>

              <div className="sub-active">This card is issued by Dzing Finance Ltd. pursuant to license by Mastercard International</div>
            </div>
          </div>
        </div>

        <div className="code-section-active">
          <div className="steps">Step 1/2</div>
          <div className="title title-active">Please enter last 4 digits of PAN</div>

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

            <button className='button-active' onClick={handleSubmit}>Active card</button>
          </div>
        </div>
      </div>
    </>
  );
}