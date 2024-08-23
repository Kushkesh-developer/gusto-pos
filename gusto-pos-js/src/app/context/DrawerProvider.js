"use client";

import React, { createContext, useState, useContext } from 'react';

const DrawerContext = createContext();

const DrawerProvider = ({ children }) => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isClosing, setIsClosing] = useState(false);

  const handleDrawerClose = () => {
    setIsClosing(true);
    setMobileOpen(false);
  };

  const handleDrawerTransitionEnd = () => {
    setIsClosing(false);
  };

  const handleDrawerToggle = () => {
    if (!isClosing) {
      setMobileOpen(!mobileOpen);
    }
  };

  return (
    <DrawerContext.Provider
      value={{ mobileOpen, isClosing, handleDrawerToggle, handleDrawerClose, handleDrawerTransitionEnd }}
    >
      {children}
    </DrawerContext.Provider>
  );
};

const useDrawerContext = () => {
  const context = useContext(DrawerContext);
  if (!context) {
    throw new Error('useDrawerContext must be used within a DrawerProvider');
  }
  return context;
};

export { DrawerProvider, useDrawerContext };
