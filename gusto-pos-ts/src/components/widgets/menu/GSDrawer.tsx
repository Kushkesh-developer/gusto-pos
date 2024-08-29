"use client";
import React, { useEffect, useState } from "react";
import Drawer from "@mui/material/Drawer";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import KeyboardArrowDown from "@mui/icons-material/KeyboardArrowDown";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Typography,
} from "@mui/material";
import { useDrawerContext } from "@/context/DrawerProvider";
import { theme } from "@/theme/theme";
import navigationMenu from "@/constants/navigation";
import { useRouter } from "next/navigation";

interface GSDrawerProps {
  drawerWidth: number;
}

const GSDrawer = ({ drawerWidth }: GSDrawerProps) => {
  const [selectedTab, setSelectedTab] = useState("");
  const { mobileOpen, handleDrawerClose, handleDrawerTransitionEnd } =
    useDrawerContext();

  const router = useRouter();

  const backgroundColor = (selected: boolean) =>
    selected ? theme.palette.primary.main : "transparent";
  const textColor = (selected: boolean) =>
    selected ? theme.palette.primary.contrastText : theme.palette.primary.main;

  useEffect(() => {
    setSelectedTab(window.location.pathname);
  }, []);

  function onSelectMenu(path: string) {
    setSelectedTab(path);
    router.push(path);
  }

  const drawer = (
    <div>
      <Toolbar>
        <Typography
          variant="h4"
          noWrap
          component="div"
          color={theme.palette.primary.main}
        >
          GustoPOS
        </Typography>
      </Toolbar>
      <List>
        {navigationMenu.map((menu) => {
          let isSelected = selectedTab === menu.path;
          return (
            <ListItem key={menu.name} disablePadding>
              {!menu.subMenus?.length ? (
                <ListItemButton
                  sx={{
                    backgroundColor: backgroundColor(isSelected),
                    m: 0.5,
                    borderRadius: 1,
                    height: 44,
                    boxShadow: isSelected ? "#ccc 0px 1px 4px" : "none",
                    ":hover": {
                      backgroundColor: isSelected
                        ? theme.palette.primary.light
                        : "",
                    },
                  }}
                  onClick={() => onSelectMenu(menu.path)}
                >
                  <ListItemIcon
                    sx={{ color: textColor(isSelected), minWidth: 40 }}
                  >
                    {menu.icon}
                  </ListItemIcon>
                  <ListItemText
                    primary={menu.name}
                    sx={{
                      color: textColor(isSelected),
                    }}
                  />
                </ListItemButton>
              ) : (
                <Accordion
                  disableGutters
                  sx={{ width: "100%", boxShadow: "none" }}
                >
                  <AccordionSummary
                    expandIcon={<KeyboardArrowDown />}
                    aria-controls="panel1-content"
                    id="panel1-header"
                    sx={{
                      backgroundColor: isSelected
                        ? theme.palette.primary.main
                        : "",
                      height: 44,
                      alignItems: "center",
                      paddingLeft: 3,
                    }}
                  >
                    <ListItemIcon
                      sx={{
                        color: textColor(isSelected),
                        height: "100%",
                        minWidth: 40,
                      }}
                    >
                      {menu.icon}
                    </ListItemIcon>
                    <ListItemText
                      primary={menu.name}
                      sx={{ color: textColor(isSelected) }}
                    />
                  </AccordionSummary>
                  <AccordionDetails sx={{ p: 0, pl: 6, pr: 1 }}>
                    <List>
                      {menu.subMenus?.map?.((subMenu, idx) => {
                        //Selection flag overrides is submenu is selected
                        isSelected = selectedTab === subMenu.path;
                        return (
                          <ListItem
                            button
                            key={idx}
                            sx={{
                              backgroundColor: backgroundColor(isSelected),
                              boxShadow: isSelected
                                ? "#ccc 0px 4px 12px"
                                : "none",
                              pl: 3,
                              borderRadius: 1,
                              height: 44,
                              ":hover": {
                                backgroundColor: isSelected
                                  ? theme.palette.primary.light
                                  : "#0000000a",
                              },
                              fontSize: "14px",
                            }}
                            onClick={() => onSelectMenu(subMenu.path)}
                          >
                            <ListItemText
                              primary={
                                <Typography
                                  sx={{
                                    fontSize: 14, // Force the font size to 14px
                                    color: textColor(isSelected),
                                    whiteSpace: "nowrap",
                                    overflow: "hidden",
                                    textOverflow: "ellipsis",
                                  }}
                                >
                                  {subMenu.name}
                                </Typography>
                              }
                              sx={{ width: "max-content" }}
                            />
                          </ListItem>
                        );
                      })}
                    </List>
                  </AccordionDetails>
                </Accordion>
              )}
            </ListItem>
          );
        })}
      </List>
    </div>
  );

  return (
    <Box
      component="nav"
      sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
      aria-label="mailbox folders"
    >
      <Drawer
        variant="temporary"
        open={mobileOpen}
        onTransitionEnd={handleDrawerTransitionEnd}
        onClose={handleDrawerClose}
        ModalProps={{
          keepMounted: true, // Better open performance on mobile.
        }}
        sx={{
          display: { xs: "block", sm: "none" },
          "& .MuiDrawer-paper": { boxSizing: "border-box", width: drawerWidth },
        }}
      >
        {drawer}
      </Drawer>
      <Drawer
        variant="permanent"
        sx={{
          display: { xs: "none", sm: "block" },
          "& .MuiDrawer-paper": { boxSizing: "border-box", width: drawerWidth },
        }}
        open
      >
        {drawer}
      </Drawer>
    </Box>
  );
};

export default GSDrawer;
