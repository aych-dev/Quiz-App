import React, { useState, useEffect } from 'react';
import { nanoid } from 'nanoid';
import Frontpage from './Frontpage.js';
import Quizpage from './Quizpage.js';
import styled from 'styled-components';
import './Quiz.css';

export default function App() {
  const [quizData, setQuizData] = useState([]);
  const [score, setScore] = useState(0);
  const [checked, setChecked] = useState(false);
  const [startQuiz, setStartQuiz] = useState(false);
  const [count, setCount] = useState(0);

  const randomizeAnswers = (arr) => arr.sort(() => Math.random() - 0.5);

  useEffect(() => {
    const getQuizData = async () => {
      const res = await fetch(
        'https://opentdb.com/api.php?amount=5&category=21'
      );
      const data = await res.json();

      const customQuizData = [];

      data.results.forEach((item) => {
        customQuizData.push({
          id: nanoid(),
          allAnswers: randomizeAnswers([
            ...item.incorrect_answers,
            item.correct_answer,
          ]),
          question: item.question,
          correctAnswer: item.correct_answer,
          selected: null,
          checked: false,
        });
        setQuizData(customQuizData);
      });
    };
    getQuizData();
  }, [count]);

  // Start Quiz
  const handleStartQuiz = () => {
    setStartQuiz((prevState) => !prevState);
  };

  // Play Again/Restart Quiz
  const handlePlayAgain = () => {
    setCount((count) => count + 1);
    setChecked(false);
  };

  // Reviews all Answers to identify if it is Correct or Incorect
  const handleCheckAnswer = () => {
    let selected = true;
    quizData.forEach((prevQuizData) => {
      if (prevQuizData.selected === null) {
        selected = false;
        return;
      }
    });
    if (!selected) {
      return;
    }
    setQuizData((prevQuizData) =>
      prevQuizData.map((data) => {
        return {
          ...data,
          checked: true,
        };
      })
    );
    setChecked(true);
    let currentScore = 0;
    quizData.forEach((prevQuizData) => {
      if (prevQuizData.correctAnswer === prevQuizData.selected) {
        currentScore += 1;
      }
    });
    setScore(currentScore);
  };

  // Updates previous QuizData to show which answers were selected
  const handleSelectedAnswer = (id, selectedAnswer) => {
    setQuizData((quizData) =>
      quizData.map((data) => {
        return data.id === id ? { ...data, selected: selectedAnswer } : data;
      })
    );
  };

  const questionElement = quizData.map((data) => {
    return (
      <Quizpage
        id={data.id}
        key={data.id}
        question={data.question}
        allAnswers={data.allAnswers}
        quizData={data}
        handleSelectedAnswer={handleSelectedAnswer}
      />
    );
  });

  return (
    <div className='main-container'>
      <div className='content-container'>
        {startQuiz ? (
          <div className='start-quiz-container'>
            {questionElement}
            <ButtonContainer>
              {checked && (
                <FinalScore>You Scored {score}/5 correct answers </FinalScore>
              )}

              <button
                className='submit-button'
                onClick={checked ? handlePlayAgain : handleCheckAnswer}
              >
                {checked ? 'Play Again' : 'Check Answers'}
              </button>
            </ButtonContainer>
          </div>
        ) : (
          <Frontpage startQuiz={handleStartQuiz} />
        )}
      </div>
    </div>
  );
}

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 40px;
`;

const FinalScore = styled.span`
  font-family: 'karla';
  font-size: 15px;
`;
