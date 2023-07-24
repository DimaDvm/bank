import React, { useState } from 'react';
import classNames from 'classnames/bind';
import '../../styles/index.scss';
import { NoDetails } from './NoDetails/NoDetails';
import { ShowDetails } from './ShowDetails/ShowDetails';

export const VirtualCardDetails = () => {
  const [showDetails, setShowDetails] = useState(false);

  const handleShowDetails = () => {
    setShowDetails(!showDetails);
  }

  return (
    <>
      <div className="container">
        <div className='background-circle' />
      </div>

      <div className='background-blur'>
        <div className='bank-card'>
          {!showDetails ? <NoDetails /> : <ShowDetails />}
        </div>

        <div className="container">
          <button 
            className={classNames('active-button', { 'off': showDetails })} 
            onClick={handleShowDetails}
          >
            {showDetails ? 'Hide details' : 'Show details'}
          </button>
        </div>
      </div>
    </>
  );
}