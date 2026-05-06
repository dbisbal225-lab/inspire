import React, { memo } from "react";

const Header = memo(() => {
  return (
    <header className="header">
      <h1>InSpire</h1>
      <p>Seguiment de salut respiratòria</p>
    </header>
  );
});

Header.displayName = 'Header';

export default Header;
