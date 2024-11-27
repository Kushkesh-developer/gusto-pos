'use client';

import { useRouter, usePathname } from 'next/navigation';
import React, { createContext, useState, useContext, useEffect } from 'react';















const DrawerContext = createContext(undefined);

export const DrawerProvider = ({ children }) => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const [selectedTab, setSelectedTab] = useState('');
  const [selectedDropDown, handleDropdownChange] = useState('');
  const [drawerPosition, setDrawerPosition] = useState('left'); // Initialize to "left"
  const router = useRouter();
  const path = usePathname();

  const handleDrawerClose = () => {
    setIsClosing(true);
    setMobileOpen(false);
  };

  useEffect(() => {
    if (selectedTab !== path) {
      setSelectedTab(path);
    }
  }, [path]);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setSelectedTab(window.location.pathname);
      handleDropdownChange(window.location.pathname);
    }
  }, []);

  const handleDrawerTransitionEnd = () => {
    setIsClosing(false);
  };

  const handleDrawerToggle = () => {
    if (!isClosing) {
      setMobileOpen(!mobileOpen);
    }
  };

  const handleTabChange = (path) => {
    router.push(path);
  };
  const toggleDrawerPosition = () => {
    setDrawerPosition((drawerPosition) => drawerPosition === 'left' ? 'right' : 'left');
  };
  return (
    <DrawerContext.Provider
      value={{
        mobileOpen,
        isClosing,
        selectedTab,
        selectedDropDown,
        drawerPosition, // Provide the drawer position in the context
        handleDropdownChange,
        handleDrawerToggle,
        handleDrawerClose,
        handleDrawerTransitionEnd,
        handleTabChange,
        toggleDrawerPosition // Provide the function to set drawer position
      }}>

      {children}
    </DrawerContext.Provider>);

};

export const useDrawerContext = () => {
  const context = useContext(DrawerContext);
  if (!context) {
    throw new Error('useDrawerContext must be used within a DrawerProvider');
  }
  return context;
};