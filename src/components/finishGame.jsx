export default function FinishGameQuiz({ points, dispatch }) {
  return (
    <div className='finish-reset'>
      <div className='quiz-fh'>
        You&apos;re Score is <strong>{points}</strong>
      </div>

      <button className='reset-btn' onClick={() => dispatch({ type: 'restart' })}>
        Restart
      </button>
    </div>
  );
}
