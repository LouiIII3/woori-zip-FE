import React from 'react'
import './BottomCard.css'
import CardList from './CardList';



const BottomCard = () => {
    return (
      <div className="full-bottom-card">
        <div className="bottom-card">
          <h1 id = "bottom-text">OOO 님을 위한 다른 대출 상품이에요</h1>
          <CardList />
        </div>
      </div>
    );
  };
  
  export default BottomCard;