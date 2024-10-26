import React from 'react';
import { Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import ShowPage from './pages/ShowPage';

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/people/:id" element={<ShowPage />} />
    </Routes>
  );
};

export default App;
