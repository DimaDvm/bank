import { useState } from 'react';
import classNames from 'classnames/bind';
import '../../styles/index.scss';
import { NoDetails } from './NoDetails/NoDetails';
import { ShowDetails } from './ShowDetails/ShowDetails';

export const VirtualCardDetails = () => {
  const [isFlipped, setIsFlipped] = useState(false);

  const handleShowDetails = () => {
    setIsFlipped(!isFlipped);
  }

  return (
    <>
      <div className="container">
        <div className='background-circle' />
      </div>

      <div className='background-blur'>
        <div className={classNames('bank-card', { 'flipped': isFlipped })}>
          <div className="back"><ShowDetails /></div>
          <div className="front"><NoDetails /></div>
        </div>

        <div className="container">
          <button
            className={classNames('active-button', { 'off': isFlipped })}
            onClick={handleShowDetails}
          >
            {isFlipped ? 'Hide details' : 'Show details'}
          </button>
        </div>
      </div>
    </>
  );
}