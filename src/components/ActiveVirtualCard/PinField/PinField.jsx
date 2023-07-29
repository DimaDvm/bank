/* eslint-disable react/prop-types */
import React, { useState, useRef } from 'react';
import classNames from 'classnames';
import '../../../styles/index.scss';
import { NoDetails } from '../../ShowVirtualCardDetails/showVirtualCard/NoDetails/NoDetails';

export const PinField = ({ handlePINSubmit, error }) => {
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

  const handleSubmit = (e) => {
    e.preventDefault();

    const userPIN = numbers.join('');

    handlePINSubmit(userPIN);
    setNumbers(['', '', '', '']);
  };

  return (
    <>
      <div className="container">
      <div className={classNames('background-circle-active', { 'red': error })} />
      </div>

      <div className='background-blur-active'>
        <div className='bank-card-active'>
          <NoDetails />
        </div>

        <div className="code-section-active">
          <div className="steps">Step 2/2</div>
          <div className="title title-active">Please enter last 4 digits of PIN</div>

          <div className="error-container">
            {error && <div className="error">Some error state!</div>}
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

            <button className='button-active' onClick={handleSubmit}>Set PIN</button>
          </div>
        </div>
      </div>
    </>
  );
}