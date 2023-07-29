/* eslint-disable react/prop-types */
import React, { useState, useRef } from 'react';
import classNames from 'classnames';
import '../../../styles/index.scss';

export const PanField = ({ details, handleSuccess }) => {
  const { pan, expMon, expYear, cardHolderName } = details;
  const [numbers, setNumbers] = useState(['', '', '', '']);
  const [error, setError] = useState('');


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

  const handleError = () => {
    setError('Wrong card! Please try another one!');
    setTimeout(() => setError(null), 2000);
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    if (pan === pan.slice(0, 15) + numbers.join('')) {
      const panData = numbers.join('');

      handleSuccess(panData)
    } else {
      handleError()
    }

    setNumbers(['', '', '', '']);
  };

  return (
    <>
      <div className="container">
        <div className={classNames('background-circle-active', { 'red': error })} />
      </div>

      <div className='background-blur-active'>
        <div className='bank-card-active'>
          <div className="details">
            <p className='service'>Customer Service: +44 20 3838 0706</p>
            <div className="black-line">
            </div>

            <div className="personal-data">
              <p>{cardHolderName}</p>
              <p>{pan.slice(0, 15)} <span className='pan'>{numbers.join('')}</span></p>
              <p>
                <span className="sub">exp</span>
                <span> {expMon}/{expYear}</span>
                <span> </span>
                <span className="sub">cvv</span>
                <span> </span>
                <span className='cvv'>000</span>
              </p>

              <div className="sub dezined">This card is issued by Dzing Finance Ltd. pursuant to license by Mastercard International</div>
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

            <button className='button-active' onClick={handleSubmit}>Active card</button>
          </div>
        </div>
      </div>
    </>
  );
}