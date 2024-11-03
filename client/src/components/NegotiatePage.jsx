import React, { useState } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';

const NegotiatePage = () => {
  const location = useLocation();
  const item = location.state;

  const [chatHistory, setChatHistory] = useState([
    { sender: 'AI', text: `Let's negotiate the price for ${item.name}. What's your offer?` },
  ]);
  const [inputPrice, setInputPrice] = useState('');
  const [showButtons, setShowButtons] = useState(false);
  const [isWaitingForInput, setIsWaitingForInput] = useState(true);

  const handleNegotiate = async () => {
    const userMessage = { sender: 'User', text: `My offer is $${inputPrice}` };
    setChatHistory((prev) => [...prev, userMessage]);
    setInputPrice('');
    setIsWaitingForInput(false);

    try {
      const response = await axios.post('http://localhost:5000/negotiate', {
        item: item.name,
        price: parseInt(inputPrice, 10),
        original_price: item.original_price
    });
    
      const aiMessage = { sender: 'AI', text: response.data.message + ' Do you accept this offer?' };
      setChatHistory((prev) => [...prev, aiMessage]);
      setShowButtons(true); 
    } catch (error) {
      console.error('Error negotiating:', error);
    }
  };

  const handleYes = () => {
    const userMessage = { sender: 'User', text: 'Yes, I accept the offer.' };
    const endMessage = { sender: 'AI', text: 'Great! The deal is finalized.' };
    setChatHistory((prev) => [...prev, userMessage, endMessage]);
    setShowButtons(false);
    setIsWaitingForInput(false);
  };

  const handleNo = () => {
    const userMessage = { sender: 'User', text: 'No, I want to negotiate more.' };
    const aiMessage = { sender: 'AI', text: 'Please enter your new offer.' };
    setChatHistory((prev) => [...prev, userMessage, aiMessage]);
    setShowButtons(false);
    setIsWaitingForInput(true);
  };

  return (
    <div className="p-4 max-w-lg mx-auto bg-gray-100 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-2">Negotiate for {item.name}</h2>
      <p className="text-gray-700 font-medium mb-4">Starting Price: ${item.price}</p>
      <div className="chat-history mb-4 p-2 bg-white rounded-lg max-h-96 overflow-y-auto">
        {chatHistory.map((msg, index) => (
          <div
            key={index}
            className={`p-2 my-1 rounded-md ${
              msg.sender === 'AI' ? 'bg-blue-200 text-left' : 'bg-green-200 text-right'
            }`}
          >
            <strong>{msg.sender}:</strong> {msg.text}
          </div>
        ))}
      </div>
      {isWaitingForInput ? (
        <>
          <input
            type="number"
            placeholder="Enter your price"
            value={inputPrice}
            onChange={(e) => setInputPrice(e.target.value)}
            className="border p-2 rounded-lg w-full mb-2"
          />
          <button
            onClick={handleNegotiate}
            className="bg-blue-500 text-white p-2 rounded-lg w-full"
            disabled={!inputPrice}
          >
            Submit Offer
          </button>
        </>
      ) : showButtons ? (
        <div className="flex justify-around">
          <button
            onClick={handleYes}
            className="bg-green-500 text-white p-2 rounded-lg w-1/2 mr-2"
          >
            Yes
          </button>
          <button
            onClick={handleNo}
            className="bg-red-500 text-white p-2 rounded-lg w-1/2 ml-2"
          >
            No
          </button>
        </div>
      ) : null}
    </div>
  );
};

export default NegotiatePage;
