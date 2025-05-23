'use client';

import { useRouter, usePathname } from 'next/navigation';
import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';

interface DrawerContextProps {
  mobileOpen: boolean;
  isClosing: boolean;
  selectedTab: string;
  selectedDropDown: string;
  drawerPosition: 'left' | 'right'; // New state for drawer position
  handleDrawerToggle: () => void;
  handleDrawerClose: () => void;
  handleDrawerTransitionEnd: () => void;
  handleTabChange: (_path: string) => void;
  handleDropdownChange: (_path: string) => void;
  toggleDrawerPosition: () => void;
}

const DrawerContext = createContext<DrawerContextProps | undefined>(undefined);

export const DrawerProvider = ({ children }: { children: ReactNode }) => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const [selectedTab, setSelectedTab] = useState('');
  const [selectedDropDown, handleDropdownChange] = useState('');
  const [drawerPosition, setDrawerPosition] = useState<'left' | 'right'>('left'); // Initialize to "left"
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

  const handleTabChange = (path: string) => {
    router.push(path);
  };
  const toggleDrawerPosition = () => {
    setDrawerPosition((drawerPosition) => (drawerPosition === 'left' ? 'right' : 'left'));
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
        toggleDrawerPosition, // Provide the function to set drawer position
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
