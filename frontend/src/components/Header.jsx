import { FaPhoneAlt, FaMapMarkerAlt, FaFacebookF, FaYoutube, FaInstagram, FaUser } from 'react-icons/fa';
import { MdLogin } from 'react-icons/md';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import './Header.css';

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      {/* Top Info Bar */}
      <div className="top-bar">
        <div className="top-left">
          <FaPhoneAlt /> <span>+91-000000000</span>
          <FaMapMarkerAlt style={{ marginLeft: '1rem' }} />
          <span>Gali Kucha Raja Ji</span>
        </div>
        <div className="top-right">
          <FaFacebookF />
          <FaYoutube />
          <FaInstagram />
          <MdLogin />
          <span>Login</span>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="nav-bar">
        <div className="logo">
          <img src="/logo.png" alt="Growth Well Education" />
        </div>

        <button className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)}>
          ☰
        </button>

        <nav className={`nav-links ${menuOpen ? 'open' : ''}`}>
          <Link to="/" onClick={() => setMenuOpen(false)}>Home</Link>
          <Link to="/about" onClick={() => setMenuOpen(false)}>About</Link>
          <Link to="/courses" onClick={() => setMenuOpen(false)}>Courses</Link>
          <Link to="/gallery" onClick={() => setMenuOpen(false)}>Gallery</Link>
          <Link to="/faq" onClick={() => setMenuOpen(false)}>FAQ</Link>
          <Link to="/contact" onClick={() => setMenuOpen(false)}>Contact Us</Link>
        </nav>

        {/* <div className="nav-right">
          <FaUser />
          <button className="register-btn">Register Now</button>
        </div> */}
      </div>
    </>
  );
}
