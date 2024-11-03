import React from 'react';
import { useNavigate } from 'react-router-dom';

const Item = ({ item }) => {
  const navigate = useNavigate();

  const handleNegotiateClick = () => {
    navigate(`/negotiate/${item.id}`, { state: { ...item } });
  };
  

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden transition-transform transform hover:scale-105 p-4">
      <img
        src={item.imageUrl}
        alt={item.name}
        className="w-48 object-cover rounded-lg mb-4"
      />
      <h2 className="text-xl font-semibold text-gray-800">{item.name}</h2>
      <p className="text-gray-600 mb-4">Price: ${item.price}</p>
      <button
        onClick={handleNegotiateClick}
        className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded transition-colors"
      >
        Negotiate
      </button>
    </div>
  );
};

export default Item;
