"use client";
import { Box, CssBaseline, Toolbar, Typography } from "@mui/material";
import { useDrawerContext, DrawerProvider } from "@/context/DrawerProvider"; // Ensure this is the correct path
import MenuHeader from "@/components/widgets/headers/MenuHeader";
import DrawerMenu from "@/components/widgets/menu/DrawerMenu";
import { useLocalization } from "@/context/LocalizationProvider";

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
  const { drawerPosition, mobileOpen } = useDrawerContext(); // Get the current drawer position (left or right)
  const { translate } = useLocalization();

  return (
    <Box sx={{ display: "flex", flex: "1 1 auto" }}>
      <CssBaseline />
      <MenuHeader drawerWidth={drawerWidth} />
      <DrawerMenu />
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          // minHeight: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "unset",
          marginTop: "64px",

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
        {mobileOpen ? null : (
          <Toolbar sx={{ display: { xs: "none", sm: "block" } }} />
        )}
        <Box sx={{ flexGrow: 1, display: "flex", flexDirection: "column" }}>
          {children}
          <Typography
            fontSize={12}
            textAlign={"center"}
            sx={{
              mt: 2,
              p: 1,
            }}
            color={"text.secondary"}
          >
            {translate("copyright_text")}
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}
