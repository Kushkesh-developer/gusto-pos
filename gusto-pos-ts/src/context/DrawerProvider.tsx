"use client";

import { useRouter } from 'next/navigation';
import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';

interface DrawerContextProps {
  mobileOpen: boolean;
  isClosing: boolean;
  selectedTab: string;
  selectedDropDown: string;
  handleDrawerToggle: () => void;
  handleDrawerClose: () => void;
  handleDrawerTransitionEnd: () => void;
  handleTabChange: (path: string) => void;
  handleDropdownChange: (path: string) => void;
}

const DrawerContext = createContext<DrawerContextProps | undefined>(undefined);

export const DrawerProvider = ({ children }: { children: ReactNode }) => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const [selectedTab, setSelectedTab] = useState(typeof window !== 'undefined' ? window.location.pathname : "");
  const [selectedDropDown, handleDropdownChange] = useState(typeof window !== 'undefined' ? window.location.pathname : "");

  const router = useRouter()

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

  const handleTabChange = (path: string) => {
    setSelectedTab(path);
    router.push(path);
  }

  return (
    <DrawerContext.Provider
      value={{
        mobileOpen,
        isClosing,
        selectedTab,
        selectedDropDown,
        handleDropdownChange,
        handleDrawerToggle,
        handleDrawerClose,
        handleDrawerTransitionEnd,
        handleTabChange
      }}
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
