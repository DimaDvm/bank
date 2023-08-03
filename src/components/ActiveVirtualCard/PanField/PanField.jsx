/* eslint-disable react/prop-types */
import React, { useState, useRef } from 'react';
import classNames from 'classnames';
import '../../../styles/index.scss';
import { Rings } from 'react-loader-spinner';

export const PanField = ({ handleSuccess, error, isLoading }) => {
  const [numbers, setNumbers] = useState(['', '', '', '']);


  const inputRefs = useRef(numbers.map(() => React.createRef()));

  const handleNumberChange = (index, value) => {
    const newNumbers = [...numbers];
    newNumbers[index] = /^\d*$/.test(value) ? value : '';
    setNumbers(newNumbers);

    const nextEmptyIndex = newNumbers.findIndex(num => num === '');

    if (index < inputRefs.current.length - 1 && newNumbers[index] !== '') {
      inputRefs.current[index + 1].current.focus();
    } else if (nextEmptyIndex >= 0) {
      inputRefs.current[nextEmptyIndex].current.focus();
    }
  };

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
            <div className="numbers-box">
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
                  />
                </div>
              ))}
            </div>

            <button className='button-active' onClick={handleSuccess}>Active card</button>
          </div>
        </div>
      </div>
    </>
  );
}