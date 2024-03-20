import Options from './OptionsList';
// import Footer from './footer';

function Questions({ quest, answer, dispatch }) {
  return (
    <div className='quest-container'>
      <progress className='progress' max={15} value={0} />

      <div className='quest'>{quest.question}</div>
      <Options option={quest} answer={answer} dispatch={dispatch} />
    </div>
  );
}

export default Questions;
