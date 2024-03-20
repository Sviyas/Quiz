import Options from './OptionsList';

function Questions({ quest, answer, dispatch }) {
  return (
    <div className='questions-list'>
      <div className='quest'>{quest?.question}</div>
      <Options option={quest} answer={answer} dispatch={dispatch} />
    </div>
  );
}

export default Questions;
