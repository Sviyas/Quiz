// eslint-disable-next-line react/prop-types
function Questions({ question }) {
  return (
    <div className='container-q'>
      <h1>Welcome to the React Quiz!</h1>
      <p className='question'>
        <span>{question}</span>
        question to test your React mastery
      </p>
      <button className='btn-st' type='button'>
        Start
      </button>
    </div>
  );
}

export default Questions;
