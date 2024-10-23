"use client";
import React from "react";
import { Box, Drawer, List, Toolbar, Typography, Divider } from "@mui/material";
import { useDrawerContext } from "@/context/DrawerProvider";
import NavigationMenu from "@/constants/navigation";
import DrawerMenuItem from "./DrawerMenuItem";

const GSDrawer = () => {
  const {
    mobileOpen,
    handleDrawerClose,
    handleDrawerTransitionEnd,

    drawerPosition,
  } = useDrawerContext();
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
          <>
            {" "}
            <DrawerMenuItem key={menu.name} menu={menu} />{" "}
            {menu.name === "Dashboard" ? (
              <Divider variant="middle" component="li" />
            ) : (
              ""
            )}
            {menu.name === "Dashboard" && (
              <>
                {/* Add a Divider after Dashboard */}

                {/* Add a heading "Application" */}
                <li
                  style={{
                    listStyleType: "none",
                    padding: "16px 16px 16px 16px",
                    fontWeight: "bold",
                    fontSize: "16px",
                  }}
                >
                  Application
                </li>
              </>
            )}
          </>
        ))}{" "}
      </List>
    </div>
  );

  return (
    <Box component="nav" sx={{ flexShrink: { sm: 0 } }}>
      <Drawer
        variant="temporary"
        open={mobileOpen}
        anchor={drawerPosition} // Correctly position drawer based on state
        onTransitionEnd={handleDrawerTransitionEnd}
        onClose={handleDrawerClose}
        ModalProps={{ keepMounted: true }}
        sx={{
          display: { xs: "block", sm: "none" },
          "& .MuiDrawer-paper": { boxSizing: "border-box", width: 260 },
        }}
      >
        {drawerContent}
      </Drawer>

      <Drawer
        variant="permanent"
        anchor={drawerPosition} // Correctly position drawer based on state
        sx={{
          display: { xs: "none", sm: "block" },
          "& .MuiDrawer-paper": {
            boxSizing: "border-box",
            width: 260,
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
