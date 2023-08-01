/* eslint-disable react/prop-types */
import '../../styles/index.scss';
import { NoDetails } from '../ShowVirtualCardDetails/showVirtualCard/NoDetails/NoDetails';

export const Success = ({ isActivatingCard }) => {
  return (
    <>
      <div className="container">
        <div className='background-circle-active green' />
      </div>

      <div className='background-blur-active'>
        <div className='bank-card-active green'>
          <NoDetails />
        </div>

        <div className="code-section-active">
          <p className="activated-title">
            {isActivatingCard ? 'Your card successfully activated!' : 'Your new PIN successfully changed!'}
          </p>

          <div className="tech-section">
            <a href="https://t.me/aleg_redcats">
              <button className='button-active telegram'>Go to Telegram</button>
            </a>
          </div>
        </div>
      </div>
    </>
  );
}