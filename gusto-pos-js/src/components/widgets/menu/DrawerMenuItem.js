import React from 'react';
import { ListItem, Accordion, AccordionSummary, AccordionDetails } from '@mui/material';
import DrawerMenuButton from './DrawerMenuButton';

import { useDrawerContext } from '@/context/DrawerProvider';
import ArrowDropDownRoundedIcon from '@mui/icons-material/ArrowDropDownRounded';

const DrawerMenuItem = ({ menu }) => {
  const { selectedTab, selectedDropDown, handleDropdownChange } = useDrawerContext();

  const isSelected = selectedTab === menu.path;
  const isSelectedParent = selectedDropDown.includes(menu.path);

  return (
    <ListItem disablePadding>
      {!menu.subMenus?.length ?
      <DrawerMenuButton menu={menu} isSelected={isSelected} /> :

      <Accordion
        disableGutters
        sx={{
          width: '100%',
          boxShadow: 'none',
          background: 'none',
          border: 'none'
        }}
        expanded={isSelectedParent}>

          <AccordionSummary
          expandIcon={<ArrowDropDownRoundedIcon />}
          aria-controls="panel1-content"
          id="panel1-header"
          sx={{
            height: 44,
            alignItems: 'center',
            paddingLeft: 0
          }}
          onClick={() =>
          selectedDropDown.includes(menu.path) ?
          handleDropdownChange('') :
          handleDropdownChange(menu.path)
          }>

            <DrawerMenuButton menu={menu} isSelected={false} isAccordion />
          </AccordionSummary>
          <AccordionDetails sx={{ p: 0, pl: 0, pr: 1 }}>
            {menu.subMenus?.map?.((subMenu, idx) =>
          <DrawerMenuButton
            key={idx}
            menu={subMenu}
            isSelected={selectedTab === subMenu.path}
            isSubmenu />

          )}
          </AccordionDetails>
        </Accordion>
      }
    </ListItem>);

};

export default DrawerMenuItem;