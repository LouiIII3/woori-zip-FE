import React from 'react'
import './Detail.css'
import CardList from '../loanRecommendation/CardList';




const Details = () => {
    return (
      <div className="container">
        <div className = "top-box">

        </div>
        <div className = "bottom-box">
            <div>내용 1</div>
            <div>내용 2</div>
            <div>내용 3</div>
            <div>내용 4</div>
            <div>내용 5</div>
            <div>내용 6</div>
            <div>내용 7</div>
            <div>내용 8</div>
            <div>내용 9</div>
            <div>내용 10</div>
            <div>내용 11</div>
            <div>내용 12</div>
            <div>내용 13</div>
            <div>내용 14</div>
            <div>내용 15</div>
            <div>내용 1</div>
            <div>내용 2</div>
            <div>내용 3</div>
            <div>내용 4</div>
            <div>내용 5</div>
            <div>내용 6</div>
            <div>내용 7</div>
            <div>내용 8</div>
            <div>내용 9</div>
            <div>내용 10</div>
            <div>내용 11</div>
            <div>내용 12</div>
            <div>내용 13</div>
            <div>내용 14</div>
            <div>내용 15</div>
        </div>
        <button id = "go-to-checklist-button">대출 자격 요건 확인</button>
        <div className = "other-loan-container">
            <h1 id = "other-loan-text">000님께 추천하는 다른 대출상품도 있어요</h1>
            <CardList className = "other-loan-box"></CardList>
        </div>  
      </div>
    );
  };
  
  export default Details;