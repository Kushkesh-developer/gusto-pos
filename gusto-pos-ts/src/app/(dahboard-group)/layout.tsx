import type { Metadata } from "next";
import { Box, CssBaseline, Toolbar } from "@mui/material";
import { DrawerProvider } from "@/context/DrawerProvider";
import GSHeader from "@/components/widgets/GSHeader";
import GSDrawer from "@/components/widgets/GSDrawer";


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
      <Box sx={{ display: 'flex', flex: "1 1 auto"}}>
        <CssBaseline />
        <GSHeader drawerWidth={drawerWidth}/>
        <GSDrawer drawerWidth={drawerWidth}/>
        <Box
          component="main"
          sx={{ flex: "1 1 auto", minHeight: '100vh', width: { sm: `calc(100% - ${drawerWidth}px)` }}}
        >
          <Toolbar sx={{ backgroundColor: "transparent" }} />
            {children}
        </Box>
      </Box>
    </DrawerProvider>
  );
}
