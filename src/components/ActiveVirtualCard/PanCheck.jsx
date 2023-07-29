/* eslint-disable react/prop-types */
import { useState, useEffect } from 'react';
import '../../styles/index.scss';
import { PanField } from './PanField/PanField';
import { PinCheck } from './PinCheck';
import { useData } from '../DataContext/Data';

export const PanCheck = ({ details }) => {
  const [success, setSuccess] = useState(false);
  const { requestedData, updateData } = useData();

  const handleSuccess = (PAN) => {
    setSuccess(true);
    updateData({ PAN });
  }

  useEffect(() => {
    console.log(requestedData);
  }, [requestedData]);

  return (
    <>
      {success ? <PinCheck /> : <PanField details={details} handleSuccess={handleSuccess}  />}
    </>
  );
}