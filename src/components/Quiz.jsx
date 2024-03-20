/* eslint-disable no-case-declarations */
import Header from './Header';
import '../App.css';
import Main from './Main';
import { useEffect, useReducer } from 'react';
import getQuizQuestionsData from './fetchData';
import Loader from './loaders';
import Error from './ErrorrLoader';
import StartQz from './StartQuiz';
import Questions from './Questions';
import Footer from './footer';
import Progress from './progress';
import FinishGameQuiz from './finishGame';
// import FinishQuiz from './finished';

// ? status : loading, error , ready, active, finished,
const initialState = {
  questions: [],
  status: 'loading',
  points: 0,
  index: 0,
  answer: null,
  highscore: 0
};

/**
 * @param {} state Initial State
 * @param {} action State Actions
 */
function reducer(state, action) {
  // ? check the data type then update a state

  switch (action.type) {
    case 'dataReceived':
      return {
        ...state,
        questions: action.payload,
        status: 'ready'
      };

    case 'dataFailed':
      return {
        ...state,
        status: 'error'
      };

    case 'start':
      return {
        ...state,
        status: 'active'
      };

    case 'newAnswer':
      const questions = state.questions.at(state.index);
      const updatedAnswers = questions.answer === action.payload ? state.points + questions.points : state.points;

      return {
        ...state,
        answer: action.payload,
        points: updatedAnswers
      };

    case 'nextQuestion':
      return {
        ...state,
        index: state.index + 1,
        answer: null
      };

    case 'finish':
      return {
        ...state,
        status: 'finished',
        highscore: state.points > state.highscore ? state.points : state.highscore
      };

    case 'restart':
      console.log(state.questions);
      return {
        ...initialState,
        questions: state.questions,
        status: 'ready'
      };

    default:
      throw new Error('unknown type received ');
  }
}

export default function Quiz() {
  const [{ questions, status, index, answer, points }, dispatch] = useReducer(reducer, initialState);

  const numOfQuestions = questions?.length;

  console.log('current status is : ', status);
  console.log('points is : ', points);
  console.log('questions is : ', questions);

  // ? store the data into - reduce state
  useEffect(() => {
    getQuizQuestionsData()
      .then(e => dispatch({ type: 'dataReceived', payload: e }))
      .catch(() => dispatch({ type: 'dataFailed' }));
  }, []);

  return (
    <div className='App'>
      <Header />
      <Main>
        {status === 'loading' && <Loader />}
        {status === 'error' && <Error />}
        {status === 'ready' && <StartQz numquestion={numOfQuestions} onShowQuest={dispatch} />}
        {status === 'active' && (
          <div className='container'>
            <Progress num={numOfQuestions} index={index} points={points} answer={answer} />
            <Questions quest={questions[index]} answer={answer} dispatch={dispatch} />
            <Footer answer={answer} dispatch={dispatch} index={index} numOfQuestions={numOfQuestions} />
          </div>
        )}

        {status === 'finished' && <FinishGameQuiz points={points} dispatch={dispatch} />}
      </Main>
    </div>
  );
}
