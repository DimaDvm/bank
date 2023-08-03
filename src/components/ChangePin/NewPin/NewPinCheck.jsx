/* eslint-disable react/prop-types */
import { useState } from 'react';
import '../../../styles/index.scss';
import { Success } from '../../Success/Success';
import { useData } from '../../DataContext/Data';
import { NewPinField } from './NewPinField';

export const NewPinCheck = () => {
  const [isCardActivated, setIsCardActivated] = useState(false);
  const { requestedData, updateData } = useData();
  const [error, setError] = useState(null);

  const isActivatingCard = false;

  const handlePINSubmit = (PIN) => {
    updateData({ PIN: PIN });
    handleChangePIN(requestedData)
  };

  const handleError = () => {
    setError(true);
    setTimeout(() => setError(null), 2000);
  }

  return (
    <>
      {isCardActivated ? <Success isActivatingCard={isActivatingCard} /> : <NewPinField handlePINSubmit={handlePINSubmit} error={error} />}
    </>
  );
}
