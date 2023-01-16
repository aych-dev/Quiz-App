import React from 'react';
import styled from 'styled-components';
import './Quiz.css';

export default function Frontpage(props) {
  return (
    <div className='frontpage-container'>
      <div className='frontpage-content-container'>
        <H1>Quizzzzz</H1>
        <P>Good luck on your quiz!</P>
        <Button onClick={() => props.startQuiz()}>Start Quiz</Button>
      </div>
    </div>
  );
}

const Button = styled.button`
  background: #4d5b9e;
  border-radius: 15px;
  color: #f5f7fb;
  width: 170px;
  height: 45px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: auto;
  font-family: 'Karla';
  font-style: normal;
  font-weight: 500;
  font-size: 16px;
  text-align: center;
  cursor: pointer;
`;

const P = styled.p`
  font-family: 'Karla';
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 20px;
  text-align: center;
  color: #293264;
`;

const H1 = styled.h1`
  text-align: center;
  font-family: 'Karla';
  font-size: 31.25px;
  line-height: 50px;
  color: #293264;
`;
