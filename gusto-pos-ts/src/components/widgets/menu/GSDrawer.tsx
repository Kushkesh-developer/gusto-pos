"use client";
import React, { useEffect, useState } from "react";
import { Box, Drawer, Toolbar, Typography } from "@mui/material";
import { useRouter } from "next/navigation";
import { useDrawerContext } from "@/context/DrawerProvider";
import DrawerMenuList from "./DrawerMenuList";
import { getSelectedTab, handleSelectMenu } from "@/utils/drawerUtils";
import { GSDrawerProps } from "@/types/DrawerTypes";

const GSDrawer = ({ drawerWidth }: GSDrawerProps) => {
  const [selectedTab, setSelectedTab] = useState<string>("");
  const { mobileOpen, handleDrawerClose, handleDrawerTransitionEnd } =
    useDrawerContext();
    
  const router = useRouter();

  useEffect(() => {
    setSelectedTab(getSelectedTab());
  }, []);

  const handleMenuSelection = (path: string) => {
    handleSelectMenu(path, setSelectedTab);
    router.push(path);
  };

  const drawerContent = (
    <div>
      <Toolbar>
        <Typography variant="h4" noWrap component="div">
          GustoPOS
        </Typography>
      </Toolbar>
      <DrawerMenuList selectedTab={selectedTab} onSelectMenu={handleMenuSelection} />
    </div>
  );

  return (
    <Box component="nav" sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}>
      <Drawer
        variant="temporary"
        open={mobileOpen}
        onTransitionEnd={handleDrawerTransitionEnd}
        onClose={handleDrawerClose}
        ModalProps={{ keepMounted: true }}
        sx={{
          display: { xs: "block", sm: "none"},
          "& .MuiDrawer-paper": { boxSizing: "border-box", width: drawerWidth},
        }}
      >
        {drawerContent}
      </Drawer>

      <Drawer
        variant="permanent"
        sx={{
          display: { xs: "none", sm: "block" },
          "& .MuiDrawer-paper": { boxSizing: "border-box", width: drawerWidth, backgroundColor: "background.paper" },
        }}
        open
      >
        {drawerContent}
      </Drawer>
    </Box>
  );
};

export default GSDrawer;
