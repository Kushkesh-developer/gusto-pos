import React from "react";
import Stack from "@mui/material/Stack";
import GSCard from "../cards/GSCard";

interface FormLayoutProps {
  cardHeading: string;
  children: React.ReactNode[];
}

const FormLayout: React.FC<FormLayoutProps> = ({ cardHeading, children }) => {
  return (
    <GSCard heading={cardHeading}>
      <Stack spacing={2} sx={{ padding: "30px" }}>
        {children.map((child, index) => (
          <Stack key={index} direction="row" spacing={2}>
            {child}
          </Stack>
        ))}
      </Stack>
    </GSCard>
  );
};

export default FormLayout;
