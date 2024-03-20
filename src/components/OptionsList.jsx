function Options({ option, answer, dispatch }) {
  const checkPointer = answer !== null;

  return (
    <div className='opt-list'>
      {option.options.map((o, i) => (
        <button
          key={i}
          className={`btn-opt  ${answer === i ? 'answer' : ''}  
          ${checkPointer ? (i === option.answer ? 'correct' : 'wrong') : ''}`}
          type='button'
          disabled={checkPointer} // once disabled the values is clicked
          onClick={() => dispatch({ type: 'newAnswer', payload: i })}
        >
          {o}
          {/* {console.log('user clicked answer is : ', answer)} */}
        </button>
      ))}
    </div>
  );
}

export default Options;
