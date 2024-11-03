import React from 'react';
import Item from './Item';
import laptopImg from "../assets/Screenshot 2024-11-03 191114.png"
import mobileImg from "../assets/Screenshot 2024-11-03 191304.png"
import bikeImg from "../assets/Screenshot 2024-11-03 191410.png"

const items = [
  { id: 1, name: "Laptop", price: 1000, imageUrl: laptopImg },
  { id: 2, name: "Smartphone", price: 500, imageUrl: mobileImg },
  { id: 3, name: "Bike", price: 1500, imageUrl: bikeImg },
];

const ItemList = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 p-4">
      {items.map((item) => (
        <Item key={item.id} item={item} />
      ))}
    </div>
  );
};

export default ItemList;