"use client";
import React from "react";
import { usePathname, useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { Box, Tabs, Tab, Typography, Divider } from "@mui/material";
import { useLocalization } from "@/context/LocalizationProvider";

function a11yProps(index: number) {
  return {
    id: `tab-${index}`,
    "aria-controls": `tabpanel-${index}`,
  };
}

export default function InventoryLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { translate } = useLocalization();
  const router = useRouter();
  const path = usePathname();
  const [activeTab, setActiveTab] = useState(0);

  const tabs = [
    { label: translate("sales_order") },
    { label: translate("today_order"), route: "today-order" },
    { label: translate("future_order"), route: "future-order" },
    { label: translate("closed_order"), route: "closed-order" },
    { label: translate("serve_later_order"), route: "serve-later-order" },
  ];

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setActiveTab(newValue);
    router.push(`/sales-order/${tabs[newValue].route}`);
  };

  useEffect(() => {
    const matchedTab = tabs.findIndex((tab) => path.endsWith(tab.route));
    if (matchedTab >= 0) {
      setActiveTab(matchedTab);
    }
  }, [path]);

  return (
    <Box sx={{ display: "flex", padding: "24px" }}>
      {/* Main Content */}
      <Box sx={{ flexGrow: 1 }}>
        <Typography variant="h4" gutterBottom color="primary">
          {tabs[activeTab].label}
        </Typography>
        <Divider />
        <Box
          sx={{ borderBottom: 1, borderColor: "divider", marginTop: "15px" }}
        >
          <Tabs
            value={activeTab}
            onChange={handleTabChange}
            aria-label="sales Order tabs"
          >
            {tabs.map((tab, index) => (
              <Tab key={index} label={tab.label} {...a11yProps(index)} />
            ))}
          </Tabs>
        </Box>
        <Box sx={{ marginTop: "16px" }}>{children}</Box>
      </Box>
    </Box>
  );
}
