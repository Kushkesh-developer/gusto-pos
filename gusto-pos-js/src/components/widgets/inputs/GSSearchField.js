'use client';
import React from 'react';
import { styled, alpha, useTheme } from '@mui/material';
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';

const Search = styled('div')(({ theme, disableMargin }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  height: 44, // Adjusted height to 44px
  backgroundColor: alpha(theme.palette.primary.main, 0.1),
  '&:hover': {
    backgroundColor: alpha(theme.palette.primary.main, 0.15),
  },
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: disableMargin ? 0 : theme.spacing(1),
    width: '35%',
  },
  [theme.breakpoints.up(900)]: {
    width: '180px',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  width: '100%',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
  },
}));

function GSSearchField({ placeHolder, outlined = false, onChange, sx = {} }) {
  const theme = useTheme();

  const borderStyle = outlined
    ? {
        border: '1px solid',
        borderColor: theme.palette.grey[500],
        backgroundColor: 'transparent',
        minWidth: '300px',
        '&:hover': {
          border: '1px solid',
          borderColor: theme.palette.primary.main,
          backgroundColor: 'transparent',
        },
      }
    : {};

  return (
    <Search disableMargin={true} sx={{ ...borderStyle, ...sx }}>
      <SearchIconWrapper>
        <SearchIcon />
      </SearchIconWrapper>
      <StyledInputBase
        placeholder={placeHolder}
        inputProps={{ 'aria-label': 'search' }}
        onChange={(e) => onChange?.(e.target.value)}
      />
    </Search>
  );
}

export default GSSearchField;
