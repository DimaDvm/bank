import { Routes, Route } from 'react-router-dom';
import { ShowVirtualCardDetails } from './components/ShowVirtualCardDetails/ShowVirtualCardDetails';
import { ActiveVirtualCard } from './components/ActiveVirtualCard/ActiveVirtualCard';
import { DataProvider } from './components/DataContext/DataContext';
import { ChangePhysicalPIN } from './components/ChangePin/ChangePin';

export const App = () => {
  return (
    <DataProvider>
      <Routes>
        <Route path='/show-details' element={<ShowVirtualCardDetails />} />
        <Route path='/active-card' element={<ActiveVirtualCard />} />
        <Route path='/change-PIN' element={<ChangePhysicalPIN />} />
      </Routes>
    </DataProvider>
  );
};
