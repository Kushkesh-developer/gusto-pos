import React from "react";
import { Box, Typography, Paper, Stack } from "@mui/material";
import { theme } from "@/theme/theme";
import { alpha } from "@mui/material/styles";
interface FormLayoutProps {
  heading: string;
  onSubmit: React.FormEventHandler<HTMLFormElement>;
  children: React.ReactNode[];
}

const FormLayout: React.FC<FormLayoutProps> = ({
  heading,
  onSubmit,
  children,
}) => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "flex-start",
        alignItems: "flex-start",
      }}
    >
      <Box sx={{ width: "1135px" }}>
        <Paper
          elevation={3}
          sx={{ boxShadow: "0 3px 10px rgba(0, 0, 0, 0.2)" }}
        >
          <Typography
            variant="h6"
            gutterBottom
            sx={{
              backgroundColor: "#1b3b701a",
              padding: "1rem",
              borderRadius: "4px",
            }}
          >
            {heading}
          </Typography>
          <form onSubmit={onSubmit}>
            <Stack spacing={2} sx={{ padding: "30px" }}>
              {children.map((child, index) => (
                <Stack key={index} direction="row" spacing={2}>
                  {child}
                </Stack>
              ))}
            </Stack>
          </form>
        </Paper>
      </Box>
    </Box>
  );
};

export default FormLayout;
