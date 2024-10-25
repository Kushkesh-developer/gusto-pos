"use client";
import { Box, CssBaseline, Toolbar } from "@mui/material";
import { useDrawerContext, DrawerProvider } from "@/context/DrawerProvider"; // Ensure this is the correct path
import GSHeader from "@/components/widgets/headers/GSHeader";
import GSDrawer from "@/components/widgets/menu/GSDrawer";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const drawerWidth = 260;

  return (
    <DrawerProvider>
      <RootLayoutWithDrawer drawerWidth={drawerWidth}>
        {children}
      </RootLayoutWithDrawer>
    </DrawerProvider>
  );
}

function RootLayoutWithDrawer({
  children,
  drawerWidth,
}: {
  children: React.ReactNode;
  drawerWidth: number;
}) {
  const { drawerPosition } = useDrawerContext(); // Get the current drawer position (left or right)

  return (
    <Box sx={{ display: "flex", flex: "1 1 auto" }}>
      <CssBaseline />
      <GSHeader drawerWidth={drawerWidth} />
      <GSDrawer />
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          // minHeight: "100vh",
          display: "flex",
          justifyContent: "center", // Center the content
          alignItems: "unset", // Center the content vertically (optional)
          marginTop: "64px", // Adjust this based on your GSHeader's height to ensure content is below header
          // Conditionally set margins based on drawer position and whether it's open
          marginLeft: {
            xs: 0, // No margin on mobile
            sm: drawerPosition === "left" ? "210px" : "-50px",
          },
          marginRight: {
            xs: 0, // No margin on mobile
            sm: drawerPosition === "right" ? `${drawerWidth}px` : 0,
          },
          transition: "margin 0.3s ease-in-out", // Smooth transition for margin changes
        }}
      >
        <Toolbar />
        {children}
      </Box>
    </Box>
  );
}
