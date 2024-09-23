"use client";
import React from "react";
import { Box, Drawer, List, Toolbar, Typography } from "@mui/material";
import { useDrawerContext } from "@/context/DrawerProvider";
import { GSDrawerProps } from "@/types/DrawerTypes";
import NavigationMenu from "@/constants/navigation";
import DrawerMenuItem from "./DrawerMenuItem";

const GSDrawer = ({ drawerWidth }: GSDrawerProps) => {
  const { mobileOpen, handleDrawerClose, handleDrawerTransitionEnd } =
    useDrawerContext();
  const navigationMenu = NavigationMenu();

  const drawerContent = (
    <div>
      <Toolbar>
        <Typography variant="h4" noWrap component="div">
          GustoPOS
        </Typography>
      </Toolbar>
      <List>
        {navigationMenu.map((menu) => (
          <DrawerMenuItem key={menu.name} menu={menu} />
        ))}
      </List>
    </div>
  );

  return (
    <Box
      component="nav"
      sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
    >
      <Drawer
        variant="temporary"
        open={mobileOpen}
        onTransitionEnd={handleDrawerTransitionEnd}
        onClose={handleDrawerClose}
        ModalProps={{ keepMounted: true }}
        sx={{
          display: { xs: "block", sm: "none" },
          "& .MuiDrawer-paper": { boxSizing: "border-box", width: drawerWidth },
        }}
      >
        {drawerContent}
      </Drawer>

      <Drawer
        variant="permanent"
        sx={{
          display: { xs: "none", sm: "block" },
          "& .MuiDrawer-paper": {
            boxSizing: "border-box",
            width: drawerWidth,
            backgroundColor: "background.paper",
          },
        }}
        open
      >
        {drawerContent}
      </Drawer>
    </Box>
  );
};

export default GSDrawer;