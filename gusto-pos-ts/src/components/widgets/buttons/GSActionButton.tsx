import React from "react";
import Button from "@mui/material/Button";

interface GSActionButtonProps {
  label: string;
  onClick: () => void;
  variant?: "text" | "outlined" | "contained";
  startIcon?: React.ReactNode;
  sx?: object;
}

const GSActionButton: React.FC<GSActionButtonProps> = ({
  label,
  onClick,
  variant = "outlined",
  startIcon,
  sx = { marginRight: "10px" },
}) => {
  return (
    <Button variant={variant} onClick={onClick} startIcon={startIcon} sx={sx}>
      {label}
    </Button>
  );
};

export default GSActionButton;
