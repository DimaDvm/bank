/* eslint-disable react/prop-types */
import { useState } from 'react';
import '../../styles/index.scss';
import { PanField } from './PanField/PanField';
import { PinCheck } from './PinCheck';
import { useData } from '../DataContext/Data';
import { activatePhysicalCard } from '../../api/api';


export const PanCheck = () => {
  const [success, setSuccess] = useState(false);
  const { requestedData, updateData } = useData();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleActivatePhysicalCard = async (PAN) => {
    try {
      setIsLoading(true);
      updateData({ PAN: PAN })

      const response = await activatePhysicalCard({ ...requestedData, PAN: PAN });

      if (response.status === 200) {
        setSuccess(true);
      }

    } catch (error) {
      if (error.response?.status === 401) {
        setError('Access blocked');
      } else {
        handleError('Wrong card! Please try another one!');
      }
    }

    setIsLoading(false);
  };

    const handleError = (error) => {
      setError(error);
      setTimeout(() => setError(null), 2000);
    }

  return (
    <div className='card'>
      {
        success 
          ? <PinCheck /> 
          : <PanField handleSuccess={handleActivatePhysicalCard} isLoading={isLoading} error={error} />
      }
    </div>
  );
}