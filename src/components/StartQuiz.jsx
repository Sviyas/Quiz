// eslint-disable-next-line react/prop-types
function StartQz({ numquestion, onShowQuest }) {
  return (
    <div className='container-q'>
      <h1>Welcome to the React Quiz!</h1>
      <p className='question'>
        <span>{numquestion}</span>
        question to test your React mastery
      </p>
      <button className='btn-st' type='button' onClick={() => onShowQuest({ type: 'start' })}>
        Start
      </button>
    </div>
  );
}

export default StartQz;
