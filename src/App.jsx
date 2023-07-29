import { Routes, Route } from 'react-router-dom';
import { ShowVirtualCardDetails } from './components/ShowVirtualCardDetails/ShowVirtualCardDetails';
import { ActiveVirtualCard } from './components/ActiveVirtualCard/ActiveVirtualCard';
import { DataProvider } from './components/DataContext/DataContext';

export const App = () => {
  return (
    <DataProvider>
      <Routes>
        <Route path='/' element={<ShowVirtualCardDetails />} />
        <Route path='/active' element={<ActiveVirtualCard />} />
      </Routes>
    </DataProvider>
  );
};
