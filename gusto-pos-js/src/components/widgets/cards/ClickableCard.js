"use client";
import React from "react";
import { Card, ButtonBase } from "@mui/material";
import { alpha, styled } from "@mui/system";

const HoverCard = styled(Card)(({ theme }) => ({
  transition: "opacity 0.2s ease-in-out, transform .2s linear",
  "& .MuiCardContent-root ": {
    backgroundImage: `linear-gradient(to bottom right, ${alpha(theme.palette.primary.light, 0.1)}, ${alpha(theme.palette.primary.dark, 0.3)})`,
  },
  borderStyle: "solid",
  "&:hover": {
    // opacity: 0.8, // Hover effect,
    transform: "scale(1.01)",
    // background: "linear-gradient( rgba(0, 0, 0, 0.05),  rgba(0, 0, 0, 0.05))",
  },
}));

const ClickableCard = (props) => {
  const {
    children,
    sx = {},
    onClick = () => {},
    variant = "elevation",
    hoverCardSX = {},
  } = props;

  return (
    <ButtonBase
      sx={sx}
      onClick={onClick}
      disableRipple={false} // Enables ripple effect
    >
      <HoverCard
        elevation={1}
        sx={{ width: "100%", ...hoverCardSX }}
        variant={variant}
      >
        {children}
      </HoverCard>
    </ButtonBase>
  );
};

export default ClickableCard;
