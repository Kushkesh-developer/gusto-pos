import React from "react";
import Button from "@mui/material/Button";

const GSActionButton = ({
  label,
  onClick,
  variant = "outlined",
  startIcon,
  sx = { marginRight: "0px" },
}) => {
  return (
    <Button
      variant={variant}
      onClick={onClick}
      startIcon={startIcon}
      {...(sx && { sx })}
    >
      {label}
    </Button>
  );
};

export default GSActionButton;
