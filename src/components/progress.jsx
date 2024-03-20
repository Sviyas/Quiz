export default function Progress({ num, index, points, answer }) {
  return (
    <header className='progress'>
      <progress max={num} value={index + Number(answer !== null)} className='pg-bar' />

      <div className='result'>
        <p>
          Questions <strong>{index + 1}</strong>/ {num}
        </p>
        <p>
          <span>{points}</span>/<span>150</span> Points
        </p>
      </div>
    </header>
  );
}
