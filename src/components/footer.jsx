import '../index.css';

export default function Footer({ answer, dispatch, numOfQuestions, index }) {
  if (answer === null) return;

  if (index < numOfQuestions - 1) {
    return (
      <div className='foot-c'>
        <button type='button' onClick={() => dispatch({ type: 'nextQuestion' })}>
          Next
        </button>
      </div>
    );
  }

  if (index === numOfQuestions - 1) {
    return (
      <div className='foot-c'>
        <button type='button' onClick={() => dispatch({ type: 'finish' })}>
          Finish
        </button>
      </div>
    );
  }

  //   if (index === numOfQuestions - 1) {
  //     console.log('helo it reached :');
  //     return (
  //       <div className='foot-c'>
  //         <span>00:00</span>
  //         <button type='button' onClick={() => dispatch({ type: 'finished' })}>
  //           Finish
  //         </button>
  //       </div>
  //     );
  //   }
}
