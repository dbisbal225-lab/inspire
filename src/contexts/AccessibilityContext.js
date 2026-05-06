import React, { createContext, useState, useContext } from 'react';

const AccessibilityContext = createContext();

export const useAccessibility = () => {
  const context = useContext(AccessibilityContext);
  if (!context) {
    throw new Error('useAccessibility must be used within an AccessibilityProvider');
  }
  return context;
};

export const AccessibilityProvider = ({ children }) => {
  const [blindMode, setBlindMode] = useState(() => {
    const saved = localStorage.getItem('blindMode');
    return saved ? JSON.parse(saved) : false;
  });

  const toggleBlindMode = () => {
    setBlindMode((prev) => {
      const next = !prev;
      localStorage.setItem('blindMode', JSON.stringify(next));
      return next;
    });
  };

  return (
    <AccessibilityContext.Provider value={{ blindMode, toggleBlindMode }}>
      {children}
    </AccessibilityContext.Provider>
  );
};

export default AccessibilityContext;
