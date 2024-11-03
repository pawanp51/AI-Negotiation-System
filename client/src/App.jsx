import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ItemList from './components/ItemList';
import NegotiatePage from './components/NegotiatePage';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-100 flex flex-col items-center p-6">
        <h1 className="text-4xl font-bold text-blue-600 mb-8">Negotiation Store</h1>
        <div className="w-full max-w-6xl bg-white shadow-lg rounded-lg p-8 min-h-[600px]">
          <Routes>
            <Route path="/" element={<ItemList />} />
            <Route path="/negotiate/:id" element={<NegotiatePage />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
