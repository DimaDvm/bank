import '../../../../styles/index.scss';
import classNames from 'classnames';
import wifi from '../../../../img/Wifi.svg';
import chip from '../../../../img/Chip.svg';
import cardLogo from '../../../../img/Card-logo.svg';
import masterCard from '../../../../img/MasterCard.svg';

export const NoDetails = () => {
  return (
    <div className={classNames('side', 'front-side')}>
      <div className='left'>
        <img src={chip} alt='chip' />
        <img src={wifi} alt='wifi' />
      </div>
      <div className='right'>
        <img src={cardLogo} alt='chip' />
        <p className='business'>business</p>
        <img src={masterCard} className='masterCard' alt='wifi' />
      </div>
    </div>
  );
}