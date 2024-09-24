"use client";
import React from "react";
import { Card, ButtonBase, SxProps } from "@mui/material";
import { styled } from "@mui/system";

type ClickableCardProps = {
  children: React.ReactNode;
  onClick: () => void;
  sx?: SxProps;
};

const HoverCard = styled(Card)(() => ({
  transition: "opacity 0.2s ease-in-out, transform .2s linear",
  "&:hover": {
    // opacity: 0.8, // Hover effect,
    transform: "scale(1.01)",
    background: "linear-gradient( rgba(0, 0, 0, 0.05),  rgba(0, 0, 0, 0.05))",
  },
}));

const ClickableCard = (props: ClickableCardProps) => {
  const { children, sx = {}, onClick = () => {} } = props;

  return (
    <ButtonBase
      sx={sx}
      onClick={onClick}
      disableRipple={false} // Enables ripple effect
    >
      <HoverCard elevation={1} sx={{ width: "100%" }}>
        {children}
      </HoverCard>
    </ButtonBase>
  );
};

export default ClickableCard;
