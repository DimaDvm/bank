/* eslint-disable react/prop-types */
import { useState } from 'react';
import '../../styles/index.scss';
import { PinField } from './PinField/PinField';
import { Success } from './Success';
import { useData } from '../DataContext/Data';
import { activatePhysicalCard } from '../../api/api';

export const PinCheck = () => {
  const [isCardActivated, setIsCardActivated] = useState(false);
  const { requestedData, updateData } = useData();
  const [error, setError] = useState(null);

  const handlePINSubmit = (PIN) => {
    updateData({ PIN: PIN });
    handleActivateCard(requestedData)
  };

  const handleActivateCard = async (data) => {
    try {
      await activatePhysicalCard(data);
      setIsCardActivated(true);
    } catch (error) {
      setError(error);
      setIsCardActivated(true);
    }
  };

  return (
    <>
      {isCardActivated ? <Success /> : <PinField handlePINSubmit={handlePINSubmit} error={error} />}
    </>
  );
}