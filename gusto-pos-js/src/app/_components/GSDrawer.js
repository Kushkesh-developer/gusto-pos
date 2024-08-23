"use client";
import React, { useState } from 'react';
import Drawer from '@mui/material/Drawer';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import { Box, Typography } from '@mui/material';
import { theme } from '@/theme/theme';
import { useDrawerContext } from '../context/DrawerProvider';

const GSDrawer = ({ drawerWidth }) => {
  const [selectedTab, setSelectedTab] = useState("Starred");
  const { mobileOpen, handleDrawerClose, handleDrawerTransitionEnd } = useDrawerContext();

  const selectedColor = theme.palette.info.main;
  const unSelectedColor = theme.palette.primary.main;

  const drawer = (
    <div>
      <Toolbar>
        <Typography variant="h4" noWrap component="div" color={theme.palette.primary.main}>GustoPOS</Typography>
      </Toolbar>
      <List>
        {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => {
          return (
            <ListItem key={text} disablePadding>
              <ListItemButton sx={{
                backgroundColor: selectedTab === text ? theme.palette.primary.main : '',
                marginLeft: 1,
                marginRight: 1,
                borderRadius: 1,
                boxShadow: selectedTab === text ? "rgba(0, 0, 0, 0.1) 0px 4px 12px" : "none",
              }}
                onClick={() => setSelectedTab(text)}
              >
                <ListItemIcon
                  sx={{ color: selectedTab === text ? theme.palette.primary.contrastText : theme.palette.primary.main }}
                >
                  {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                </ListItemIcon>
                <ListItemText primary={text}
                  sx={{ color: selectedTab === text ? theme.palette.primary.contrastText : theme.palette.primary.main }}
                />
              </ListItemButton>
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
          keepMounted: true,
        }}
        sx={{
          display: { xs: 'block', sm: 'none' },
          '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
        }}
      >
        {drawer}
      </Drawer>
      <Drawer
        variant="permanent"
        sx={{
          display: { xs: 'none', sm: 'block' },
          '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
        }}
        open
      >
        {drawer}
      </Drawer>
    </Box>
  );
};

export default GSDrawer;
