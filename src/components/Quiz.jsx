import Header from './Header';
import '../App.css';
import Main from './Main';
import { useEffect, useReducer } from 'react';
import getQuizQuestionsData from './fetchData';
import Loader from './loaders';
import Error from './ErrorrLoader';
import Questions from './QuizQuestion';

// ? status : loading, error , ready, active, finished,
const initialState = {
  questions: [],
  status: 'loading',
  points: 0
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

    default:
      throw new Error('unknown type received ');
  }
}

export default function Quiz() {
  const [{ questions, status }, dispatch] = useReducer(reducer, initialState);

  const numOfQuestions = questions?.length;

  // ? store the data into reduce state
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
        {status === 'ready' && <Questions question={numOfQuestions} />}
      </Main>
    </div>
  );
}
