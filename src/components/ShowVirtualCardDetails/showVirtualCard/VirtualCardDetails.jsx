/* eslint-disable react/prop-types */
import { useState } from 'react';
import classNames from 'classnames/bind';
import logo from '../../../img/Logo.svg';
import '../../../styles/index.scss';
import { NoDetails } from './NoDetails/NoDetails';
import { ShowDetails } from './ShowDetails/ShowDetails';

export const VirtualCardDetails = ({ details, otp }) => {
  const [isFlipped, setIsFlipped] = useState(false);

  const handleShowDetails = () => {
    setIsFlipped(!isFlipped);
  }

  const isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);

  return (
    <>
      <div className='card'>
        <div className="container">
          <img src={logo} alt='Logo' />
        </div>
        <div className="container">
          <div className='background-circle' />
        </div>

        <div className='background-blur'>
          {isSafari ? (
            <>
              <div className={classNames('bank-card', { 'flipped': isFlipped })}>
                {isFlipped ? (
                  <div className="safari">
                    {details && <ShowDetails details={details} otp={otp} />}
                  </div>
                ) : (
                  <div className="safari">
                    <NoDetails />
                  </div>
                )}
              </div>

              <div className="container">
                <button
                  className={classNames('active-button', { 'off': isFlipped })}
                  onClick={handleShowDetails}
                >
                  {isFlipped ? 'Hide details' : 'Show details'}
                </button>
              </div>
            </>

          ) : (
            <>
              <div className={classNames('bank-card', { 'flipped': isFlipped })}>
                <div className="back">
                  {details && <ShowDetails details={details} otp={otp} />}
                </div>

                <div className="front">
                  <NoDetails />
                </div>
              </div>

              <div className="container">
                <button
                  className={classNames('active-button', { 'off': isFlipped })}
                  onClick={handleShowDetails}
                >
                  {isFlipped ? 'Hide details' : 'Show details'}
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
}