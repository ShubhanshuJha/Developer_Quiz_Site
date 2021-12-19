import { useState } from 'react';
import QuizModal from './QuizModal';
import Results from './Results';
import shuffle from '../shuffle-arr';

const QuizTemplate = ({ quiz }) => {
  const [questionNumber, setQuestionNumber] = useState(1);
  const [isResults, setIsResults] = useState(false);
  const [points, setPoints] = useState(0);
  const [message, setMessage] = useState('');
  const [displayExplanation, setDisplayExplanation] = useState('');
  const [showReference, setShowReference] = useState('');
  const [chooseAnswer, setChooseAnswer] = useState(false);
  const [show, setShow] = useState(false);
  const choicesArr = [];
  let currQuestion = quiz[questionNumber - 1];
  const totalQuestions = quiz.length;
  const totalPoints = quiz.length;


  //function for toggling the react-bootstrap modal
  const handleShow = () => setShow(true);


  //shuffle the right and wrong answers
  quiz.forEach(obj => {
    let arr = [obj.Answer, obj.Distractor1, obj.Distractor2, obj.Distractor3];
    choicesArr.push(shuffle(arr))
  });

  const nextQuestion = () => {
    if (questionNumber >= quiz.length) {
      setIsResults(true)
      return
    }
    setQuestionNumber(curr => curr + 1)
    setChooseAnswer(false)
  }


  const checkAnswer = (e) => {
    setChooseAnswer(true)
    let userAnswer = e.target.value;
    if (userAnswer !== currQuestion.Answer) {
      setMessage(`Hmmm, not quite`);
      setDisplayExplanation(currQuestion.Explanation)
      setShowReference(currQuestion.Link)
      handleShow()
    } else {
      setPoints(curr => curr + 1)
      setMessage(`Awesome, that's correct!`)
      setDisplayExplanation(currQuestion.Explanation)
      setShowReference(currQuestion.Link)
      handleShow()
    }
  }

  const modalProps = {
    message,
    points,
    displayExplanation,
    showReference,
    show,
    nextQuestion
  };

  const resultsProps = {
    points,
    totalPoints
  }

  return (
    <>

      {isResults ?
        <Results  {...resultsProps} /> :
        <>
          <h1 className='quiz-heading'>{currQuestion.Question}</h1>
          <div className="quiz-text mt-4">
            <p>Question: {questionNumber}/{totalQuestions}</p>
            <p>Points: {points}</p>
          </div>

          <div className="quiz-div">
            {chooseAnswer ?
              <QuizModal {...modalProps} /> :
              <div className='w-50 quiz-answers-div'>
                {choicesArr[questionNumber - 1].map((btn, index) => (
                  <button className="answers-btns" value={btn} onClick={(e) => checkAnswer(e, "value")} key={index}>{btn}</button>
                ))}
              </div>
            }
          </div>
        </>
      }
    </>
  )
}
export default QuizTemplate;











