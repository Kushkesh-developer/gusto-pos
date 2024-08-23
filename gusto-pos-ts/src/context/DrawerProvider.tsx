"use client";

import React, { createContext, useState, useContext, ReactNode } from 'react';

interface DrawerContextProps {
  mobileOpen: boolean;
  isClosing: boolean;
  handleDrawerToggle: () => void;
  handleDrawerClose: () => void;
  handleDrawerTransitionEnd: () => void;
}

const DrawerContext = createContext<DrawerContextProps | undefined>(undefined);

export const DrawerProvider = ({ children }: { children: ReactNode }) => {
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

export const useDrawerContext = () => {
  const context = useContext(DrawerContext);
  if (!context) {
    throw new Error('useDrawerContext must be used within a DrawerProvider');
  }
  return context;
};
