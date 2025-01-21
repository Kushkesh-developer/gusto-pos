import React from 'react';
import { styled } from '@mui/material/styles';
import { ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import { DrawerMenuButtonProps } from '@/types/drawer-types';
import { getButtonStyles } from '@/utils/drawerUtils';
import { useDrawerContext } from '@/context/DrawerProvider';

/**
 * Themed components created so you can configure them via createTheme().
 * use the name mentioned in the styled object
 /** */
const DrawerMenuButtonRoot = styled(ListItemButton, {
  shouldForwardProp: (prop: string) =>
    !['is_submenu', 'is_selected', 'is_accordion'].includes(prop),
  name: 'MuiDrawerMenuButton',
  slot: 'root',
})<{
  is_submenu: boolean;
  is_selected: boolean;
  is_accordion: boolean;
}>(({ theme, is_submenu, is_selected, is_accordion }) => {
  const style = getButtonStyles(theme, is_selected, is_accordion);

  return {
    paddingLeft: is_submenu ? theme.spacing(2) : theme.spacing(2),
    height: 40,
    marginLeft: is_submenu ? theme.spacing(6) : theme.spacing(1),
    marginRight: theme.spacing(1),
    backgroundColor: style.backgroundColor,
    color: style.color,
    borderRadius: theme.shape.borderRadius,
    boxShadow: is_selected ? theme.shadows[1] : 'none',
    marginTop: 1,
    position: 'relative', // Required for absolute positioning the dot
    '&:hover': {
      backgroundColor: style.hoverBackground,
    },

    // Circular dot styling
    ...(is_submenu && {
      '&::after': {
        content: '""',
        position: 'absolute',
        top: '50%', // Center the dot vertically
        left: theme.spacing(-2), // Set some distance from the left
        transform: 'translateY(-50%)', // Vertically center the dot
        width: 8, // Dot size
        height: 8,
        backgroundColor: is_selected ? theme.palette.primary.main : theme.palette.grey[500],
        borderRadius: '50%',
      },
    }),
  };
});

const DrawerMenuButtonIcon = styled(ListItemIcon, {
  shouldForwardProp: (prop: string) =>
    !['is_submenu', 'is_selected', 'is_accordion'].includes(prop),
  name: 'MuiDrawerMenuButton',
  slot: 'icon',
})<{ is_selected: boolean }>(({ theme, is_selected }) => {
  const style = getButtonStyles(theme, is_selected);

  return {
    color: style.color,
    minWidth: 35,
  };
});

const DrawerMenuButtonText = styled(ListItemText, {
  shouldForwardProp: (prop: string) =>
    !['is_submenu', 'is_selected', 'is_accordion'].includes(prop),
  name: 'MuiDrawerMenuButton',
  slot: 'text',
})<{ is_selected: boolean }>(({ theme, is_selected }) => {
  const style = getButtonStyles(theme, is_selected);

  return {
    width: '120px',
    '.MuiTypography-root': {
      fontSize: '0.875rem',
      whiteSpace: 'nowrap',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      color: style.color,
      display: 'block', // Ensure that the text is treated as a block element
    },
  };
});

const DrawerMenuButton = ({
  menu,
  isSelected,
  isAccordion = false,
  isSubmenu = false,
}: DrawerMenuButtonProps) => {
  const { handleTabChange, handleDrawerClose } = useDrawerContext();

  return (
    <DrawerMenuButtonRoot
      is_submenu={isSubmenu}
      is_selected={isSelected}
      is_accordion={isAccordion}
      disableRipple={isAccordion}
      onClick={() => {
        if (!isAccordion) {
          handleTabChange(menu.path);
          if (window.innerWidth < 1200) {
            // lg breakpoint is 1200px
            handleDrawerClose();
          }
        }
      }}
    >
      {!isSubmenu && (
        <DrawerMenuButtonIcon is_selected={isSelected}>{menu.icon}</DrawerMenuButtonIcon>
      )}
      <DrawerMenuButtonText primary={menu.name} is_selected={isSelected} />
    </DrawerMenuButtonRoot>
  );
};

export default DrawerMenuButton;
