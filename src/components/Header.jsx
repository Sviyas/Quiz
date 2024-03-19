import '../App.css';
import react from '../assets/react.svg';

export default function Header() {
  return (
    <div className='Header'>
      <img src={react} alt='React' id='image' />
      <p className='head'>Welcome To Quiz App</p>
    </div>
  );
}
