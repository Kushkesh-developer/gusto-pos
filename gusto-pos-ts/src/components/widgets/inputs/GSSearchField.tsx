"use client";
import React from "react";
import { styled, alpha, SxProps } from "@mui/material/styles";
import { useTheme } from "@mui/material";
import InputBase from "@mui/material/InputBase";
import SearchIcon from "@mui/icons-material/Search";

interface GSSearchFieldProps {
  placeHolder?: string;
  onChange?: (_value: string) => void;
  disableMargin?: boolean;
  outlined?: boolean;
  sx?: SxProps;
}

const Search = styled("div")<{ disableMargin?: boolean }>(
  ({ theme, disableMargin }) => ({
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    height: 40,
    backgroundColor: alpha(theme.palette.primary.main, 0.1),
    "&:hover": {
      backgroundColor: alpha(theme.palette.primary.main, 0.15),
    },
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: disableMargin ? 0 : theme.spacing(1),
      width: "auto",
    },
  }),
);

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  width: "100%",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
  },
}));

function GSSearchField({
  placeHolder,
  outlined = false,
  onChange,
  sx = {},
}: GSSearchFieldProps) {
  const theme = useTheme();

  const borderStyle = outlined
    ? {
        border: "1px solid",
        borderColor: theme.palette.grey[500],
        backgroundColor: "transparent",
        "&:hover": {
          border: "1px solid",
          borderColor: theme.palette.primary.main,
          backgroundColor: "transparent",
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
        inputProps={{ "aria-label": "search" }}
        onChange={(e) => onChange?.(e.target.value)}
      />
    </Search>
  );
}

export default GSSearchField;
