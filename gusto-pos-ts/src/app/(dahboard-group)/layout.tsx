import type { Metadata } from "next";
import { Rubik } from "next/font/google";
import { Box, CssBaseline, Drawer, ThemeProvider, Toolbar } from "@mui/material";
import { theme } from "@/theme/theme";
import { DrawerProvider } from "@/context/DrawerProvider";
import GSHeader from "../_components/GSHeader";
import GSDrawer from "../_components/GSDrawer";

const inter = Rubik({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "GustoPOS",
  description: "GustoPOS is theme to make your life easier for POS admin teams",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const drawerWidth = 240;

  return (
    <DrawerProvider>
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        <GSHeader drawerWidth={drawerWidth}/>
        <GSDrawer drawerWidth={drawerWidth}/>
        <Box
          component="main"
          sx={{ flexGrow: 1, minHeight: '100vh', width: { sm: `calc(100% - ${drawerWidth}px)` } }}
        >
          <Toolbar sx={{ backgroundColor: "transparent" }} />
          {children}
        </Box>
      </Box>
    </DrawerProvider>
  );
}
