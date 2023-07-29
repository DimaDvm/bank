/* eslint-disable react/prop-types */
import { createContext, useState } from 'react';

export const DataContext = createContext();

export const DataProvider = ({ children }) => {
  const [requestedData, setRequestedData] = useState({});

  const updateData = (newData) => {
    setRequestedData((prevData) => ({
      ...prevData,
      ...newData,
    }));
  };

  return (
    <DataContext.Provider value={{ requestedData, updateData }}>
      {children}
    </DataContext.Provider>
  );
};