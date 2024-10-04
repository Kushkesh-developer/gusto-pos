import React from "react";
import {
  ListItem,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from "@mui/material";
import DrawerMenuButton from "./DrawerMenuButton";
import { DrawerMenuItemProps } from "@/types/DrawerTypes";
import KeyboardArrowDown from "@mui/icons-material/KeyboardArrowDown";
import { useDrawerContext } from "@/context/DrawerProvider";

const DrawerMenuItem = ({ menu }: DrawerMenuItemProps) => {
  const { selectedTab, selectedDropDown, handleDropdownChange } =
    useDrawerContext();

  const isSelected = selectedTab === menu.path;
  const isSelectedParent = selectedDropDown.includes(menu.path);

  return (
    <ListItem disablePadding>
      {!menu.subMenus?.length ? (
        <DrawerMenuButton menu={menu} isSelected={isSelected} />
      ) : (
        <Accordion
          disableGutters
          sx={{ width: "100%", boxShadow: "none", background: "none" }}
          expanded={isSelectedParent}
        >
          <AccordionSummary
            expandIcon={<KeyboardArrowDown />}
            aria-controls="panel1-content"
            id="panel1-header"
            sx={{
              height: 44,
              alignItems: "center", 
              paddingLeft: 0,
              ".MuiAccordionSummary-expandIconWrapper": {
                color: "text.primary",
              },
            }}
            onClick={() =>
              selectedDropDown.includes(menu.path)
                ? handleDropdownChange("")
                : handleDropdownChange(menu.path)
            }
          >
            <DrawerMenuButton menu={menu} isSelected={false} isAccordion />
          </AccordionSummary>
          <AccordionDetails sx={{ p: 0, pl: 0, pr: 1 }}>
            {menu.subMenus?.map?.((subMenu, idx) => (
              <DrawerMenuButton
                key={idx}
                menu={subMenu}
                isSelected={selectedTab === subMenu.path}
                isSubmenu
              />
            ))}
          </AccordionDetails>
        </Accordion>
      )}
    </ListItem>
  );
};

export default DrawerMenuItem;
