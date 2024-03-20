import Header from './Header';
import '../App.css';
import Main from './Main';
import { useEffect, useReducer } from 'react';
import getQuizQuestionsData from './fetchData';
import Loader from './loaders';
import Error from './ErrorrLoader';
import StartQz from './StartQuiz';
import Questions from './Questions';
import FinishQuiz from './finished';
import Footer from './footer';

// ? status : loading, error , ready, active, finished,
const initialState = {
  questions: [],
  status: 'loading',
  points: 0,
  index: 0,
  answer: null
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
      return {
        ...state,
        answer: action.payload
      };

    case 'nextQuestion':
      return {
        ...state,
        index: state.index + 1,
        answer: null
      };

    case 'finished':
      return {
        ...state,
        answer: state.answer
      };

    default:
      throw new Error('unknown type received ');
  }
}

export default function Quiz() {
  const [{ questions, status, index, answer }, dispatch] = useReducer(reducer, initialState);

  const numOfQuestions = questions?.length;

  console.log('current status is : ', status);

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
          <>
            <Questions quest={questions[index]} answer={answer} dispatch={dispatch} />
            {/* <Options  /> */}
            {/* <Options option={questions?.options} answer={answer} dispatch={dispatch} /> */}
            <Footer answer={answer} dispatch={dispatch} index={index} numOfQuestions={numOfQuestions} />
          </>
        )}

        {status === 'finished' && <FinishQuiz />}
      </Main>
    </div>
  );
}
