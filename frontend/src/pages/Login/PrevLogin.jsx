import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './PrevLogin.css';

const PrevLogin = () => {
  const navigate = useNavigate();
  const [fade, setFade] = useState(false);

  const handleContinue = () => {
    setFade(true);
  };

  const handleTransitionEnd = () => {
    if (fade) navigate('/login');
  };

  return (
    <div
      className={`prevlogin-container${fade ? ' fade-out' : ''}`}
      onClick={handleContinue}
      onTransitionEnd={handleTransitionEnd}
      tabIndex={0}
      role="button"
    >
      <div className="prevlogin-logo">
        {/* Puedes reemplazar por un logo SVG o ícono si lo tienes */}
        <span className="prevlogin-title">Asset Manager</span>
      </div>
      <span className="prevlogin-tap">Toca para continuar</span>
    </div>
  );
};

export default PrevLogin;
