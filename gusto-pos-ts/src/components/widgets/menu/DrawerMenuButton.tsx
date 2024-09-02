import React from "react";
import { ListItemButton, ListItemIcon, ListItemText, Typography } from "@mui/material";
import { DrawerMenuButtonProps } from "@/types/DrawerTypes";
import { getButtonStyles } from "@/utils/drawerUtils";

const DrawerMenuButton = ({
    menu,
    isSelected,
    onSelectMenu,
    isAccordion = false,
    isSubmenu = false,
}: DrawerMenuButtonProps) => {
    const buttonStyles = getButtonStyles(isSelected, isAccordion);

    return (
        <ListItemButton
            sx={{
                ...buttonStyles,
                pl: isSubmenu ? 4 : 2,
                height: 44, ml: isSubmenu ? 4 : 1, mr: 1
            }}
            disableRipple={isAccordion} //Remove ripple effect if it's dropdown menu
            onClick={() => onSelectMenu(menu.path)}
        >
            {!isSubmenu && <ListItemIcon sx={{ color: buttonStyles.color, minWidth: 40 }}>
                {menu.icon}
            </ListItemIcon>}
            <ListItemText
                primary={
                    <Typography
                        sx={{
                            fontSize: 14,
                            color: buttonStyles.color,
                            whiteSpace: "nowrap",
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                        }}
                    >
                        {menu.name}
                    </Typography>
                }
            />
        </ListItemButton>
    );
};

export default DrawerMenuButton;
