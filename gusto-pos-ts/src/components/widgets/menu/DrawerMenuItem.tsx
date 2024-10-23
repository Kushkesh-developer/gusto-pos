import React from "react";
import {
  ListItem,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from "@mui/material";
import DrawerMenuButton from "./DrawerMenuButton";
import { DrawerMenuItemProps } from "@/types/drawer-types";
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
            expandIcon={<KeyboardArrowDown sx={{ color: "#1B3C73" }} />}
            aria-controls="panel1-content"
            id="panel1-header"
            sx={{
              height: 60,
              paddingLeft: 2,
              ".MuiAccordionSummary-expandIconWrapper": {
                color: "#1B3C73",
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
          <AccordionDetails sx={{ paddingLeft: 2 }}>
            {menu.subMenus?.map((subMenu, idx) => (
              <>
                {/* Adjust size and color if needed */}
                <DrawerMenuButton
                  key={idx}
                  menu={subMenu}
                  isSelected={selectedTab === subMenu.path}
                  isSubmenu
                />
              </>
            ))}
          </AccordionDetails>
        </Accordion>
      )}
    </ListItem>
  );
};

export default DrawerMenuItem;
