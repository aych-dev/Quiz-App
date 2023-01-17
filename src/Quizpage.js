import React from 'react';
import { nanoid } from 'nanoid';
import styled from 'styled-components';
import { decode } from 'html-entities';
import './Quiz.css';

export default function Quizpage(props) {
  const allAnswers = props.allAnswers;

  const selectedAnswer = (answer) => {
    if (props.quizData.checked) {
      return;
    }
    props.handleSelectedAnswer(props.id, answer);
  };

  const answerElement = allAnswers.map((answer) => {
    let id = null;
    if (props.quizData.checked) {
      if (answer === props.quizData.correctAnswer) {
        id = 'correct';
      } else if (answer === props.quizData.selected) {
        id = 'incorrect';
      } else {
        id = 'not-selected';
      }
    }
    return (
      <AnswerButton
        id={id}
        className={
          props.quizData.selected === answer
            ? 'answer-button selected-answer-button'
            : 'answer-button'
        }
        key={nanoid()}
        onClick={() => selectedAnswer(answer)}
      >
        {decode(answer)}
      </AnswerButton>
    );
  });

  return (
    <div>
      <QuestionContainer>
        <Question>{decode(props.question)}</Question>
        {answerElement}
      </QuestionContainer>
      <LineDiv></LineDiv>
    </div>
  );
}

const QuestionContainer = styled.div`
  width: 100%;
  margin-top: 20px;
  text-align: left;
  padding: 5px;
  margin-left: 10px;
  @media only screen and (max-width: 490px) {
    margin-top: 10px;
  }
`;

const Question = styled.h4`
  font-family: 'Karla';

  @media only screen and (device-width: 390px) and (device-height: 844px) and (-webkit-device-pixel-ratio: 3) {
    margin: auto;
    overflow-wrap: break-word;
  }
`;

const LineDiv = styled.div`
  border: 0.6px solid #dbdef0;
  margin-top: 5px;
`;

const AnswerButton = styled.button`
  border: solid;
`;
