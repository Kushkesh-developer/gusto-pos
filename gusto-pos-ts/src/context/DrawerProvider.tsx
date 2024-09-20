"use client";

import { useRouter, usePathname } from "next/navigation";
import React, {
  createContext,
  useState,
  useContext,
  ReactNode,
  useEffect,
} from "react";
import { useRouter, usePathname } from "next/navigation";
import React, {
  createContext,
  useState,
  useContext,
  ReactNode,
  useEffect,
} from "react";

interface DrawerContextProps {
  mobileOpen: boolean;
  isClosing: boolean;
  selectedTab: string;
  selectedDropDown: string;
  handleDrawerToggle: () => void;
  handleDrawerClose: () => void;
  handleDrawerTransitionEnd: () => void;
  handleTabChange: (_path: string) => void;
  handleDropdownChange: (_path: string) => void;
  handleTabChange: (_path: string) => void;
  handleDropdownChange: (_path: string) => void;
}

const DrawerContext = createContext<DrawerContextProps | undefined>(undefined);

export const DrawerProvider = ({ children }: { children: ReactNode }) => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isClosing, setIsClosing] = useState(false);

  const [selectedTab, setSelectedTab] = useState("");
  const [selectedDropDown, handleDropdownChange] = useState("");
  const router = useRouter();
  const path = usePathname();
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
  }, [path]);

  useEffect(() => {
    if (typeof window !== "undefined") {
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
    setSelectedTab(path);
    router.push(path);
  };

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
        handleTabChange,
      }}
    >
      {children}
    </DrawerContext.Provider>
  );
};

export const useDrawerContext = () => {
  const context = useContext(DrawerContext);
  if (!context) {
    throw new Error("useDrawerContext must be used within a DrawerProvider");
  }
  return context;
};
