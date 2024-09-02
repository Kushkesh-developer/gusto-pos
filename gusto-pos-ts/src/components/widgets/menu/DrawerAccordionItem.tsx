import React from "react";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@mui/material";
import { useRouter } from "next/navigation";
import KeyboardArrowDown from "@mui/icons-material/KeyboardArrowDown";
import { drawerItemColors } from "@/theme/colors";

interface DrawerAccordionItemProps {
  icon: React.ReactNode;
  name: string;
  path: string;
  subMenus: Array<{ name: string; path: string }>;
  isSelected: boolean;
  onSelectMenu: (path: string) => void;
}

const DrawerAccordionItem = ({
  icon,
  name,
  path,
  subMenus,
  isSelected,
  onSelectMenu,
}: DrawerAccordionItemProps) => {
  const router = useRouter();

  const handleClick = (subMenuPath: string) => {
    onSelectMenu(subMenuPath);
    router.push(subMenuPath);
  };

  return (
    <Accordion disableGutters sx={{ width: "100%", boxShadow: "none" }}>
      <AccordionSummary
        expandIcon={<KeyboardArrowDown />}
        aria-controls="panel-content"
        id="panel-header"
        sx={{
          backgroundColor: isSelected
            ? drawerItemColors.selectedBackground
            : "",
          height: 44,
          alignItems: "center",
          paddingLeft: 3,
        }}
      >
        <ListItemIcon
          sx={{
            color: isSelected
              ? drawerItemColors.selectedText
              : drawerItemColors.nonSelectedText,
            height: "100%",
            minWidth: 40,
          }}
        >
          {icon}
        </ListItemIcon>
        <ListItemText
          primary={name}
          sx={{ color: isSelected ? drawerItemColors.selectedText : drawerItemColors.nonSelectedText }}
        />
      </AccordionSummary>
      <AccordionDetails sx={{ p: 0, pl: 6, pr: 1 }}>
        <List>
          {subMenus.map((subMenu, idx) => (
            <ListItem
              key={idx}
              sx={{
                backgroundColor:
                  isSelected && subMenu.path === path
                    ? drawerItemColors.selectedBackground
                    : "",
                boxShadow: isSelected && subMenu.path === path ? 1 : 0,
                pl: 3,
                borderRadius: 1,
                height: 44,
                ":hover": {
                  backgroundColor:
                    isSelected && subMenu.path === path
                      ? drawerItemColors.hoverBackground
                      : "#0000000a",
                },
                fontSize: "14px",
              }}
              onClick={() => handleClick(subMenu.path)}
            >
              <ListItemText
                primary={
                  <Typography
                    sx={{
                      fontSize: 14,
                      color: isSelected && subMenu.path === path
                        ? drawerItemColors.selectedText
                        : drawerItemColors.nonSelectedText,
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
          ))}
        </List>
      </AccordionDetails>
    </Accordion>
  );
};

export default DrawerAccordionItem;
