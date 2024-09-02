import React from "react";
import { ListItem, Accordion, AccordionSummary, AccordionDetails } from "@mui/material";
import DrawerMenuButton from "./DrawerMenuButton";
import { DrawerMenuItemProps } from "@/types/DrawerTypes";
import KeyboardArrowDown from "@mui/icons-material/KeyboardArrowDown";
import { getButtonStyles } from "@/utils/drawerUtils";

const DrawerMenuItem = ({ menu, selectedTab, onSelectMenu }: DrawerMenuItemProps) => {

  const isSelected = selectedTab === menu.path;

  return (
    <ListItem disablePadding>
      {!menu.subMenus?.length ? (
        <DrawerMenuButton
          menu={menu}
          isSelected={isSelected}
          onSelectMenu={onSelectMenu}
        />
      ) : (
        <Accordion disableGutters sx={{ width: "100%", boxShadow: "none" }}>
          <AccordionSummary
            expandIcon={<KeyboardArrowDown />}
            aria-controls="panel1-content"
            id="panel1-header"
            sx={{ height: 44, alignItems: "center", paddingLeft: 0 }}
          >
            <DrawerMenuButton
              menu={menu}
              isSelected={isSelected}
              onSelectMenu={() => {}}
              isAccordion
            />
          </AccordionSummary>
          <AccordionDetails sx={{ p: 0, pl: 0, pr: 1 }}>
            {menu.subMenus?.map?.((subMenu, idx) => (
              <DrawerMenuButton
                key={idx}
                menu={subMenu}
                isSelected={selectedTab === subMenu.path}
                onSelectMenu={onSelectMenu}
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
