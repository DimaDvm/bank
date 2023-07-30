/* eslint-disable react/prop-types */
import { useState, useEffect } from 'react';
import '../../../styles/index.scss';
import { useData } from '../../DataContext/Data';
import { OldPinField } from './OldPinField';
import { NewPinCheck } from '../NewPin/NewPinCheck';

export const OldPinCheck = () => {
  const [isCardActivated, setIsCardActivated] = useState(false);
  const { requestedData, updateData } = useData();
  const [error, setError] = useState(null);

  const handlePINSubmit = (oldPIN) => {
    updateData({ oldPIN: oldPIN });
    setError(null)
    setIsCardActivated(true);
  };

  useEffect(() => {
    console.log(requestedData);
  }, [requestedData]);

  return (
    <>
      {isCardActivated ? <NewPinCheck /> : <OldPinField handlePINSubmit={handlePINSubmit} error={error} />}
    </>
  );
}
