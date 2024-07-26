import ConfiLogo from '../../assets/Logo.png';
import './Logo.css';

function Logo() {
  return (
    <div className="logo-wrapper">
      <img className="logo-image" src={ConfiLogo} alt="Confi Logo"></img>
    </div>
  );
}

export default Logo;
