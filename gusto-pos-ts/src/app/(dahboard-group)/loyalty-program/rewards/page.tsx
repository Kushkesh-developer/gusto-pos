"use client";
import React, { useEffect, useState } from "react";
import { Typography, Divider, Stack} from "@mui/material";
import GSTable from "@/components/widgets/table/GSTable";
import { useLocalization } from "@/context/LocalizationProvider";
import GSTableControls from "@/components/widgets/table/GSTableControls";
import { theme } from "@/theme/theme";
import { mockResponse } from "@/mock/rewards";
import { ColumnType } from "@/types/table-types";
import LoyalityDrawer from "@/components/loyalty-program/LoyalityDrawer";


const columnNames: ColumnType[] = [
  { label: "No.", key: "No", visible: true },
  { label: "Reward Name", key: "RewardName", visible: true },
  { label: "Image", key: "image", visible: true },
  { label: "Points required to claim", key: "Pointsrequiredtoclaim", visible: true },
  { label: "Reward Valid Period", key: "RewardValidPeriod", visible: true },
  { label: "Show / Hide on POS", key: "ShowPOS", visible: true },
  {
    label: "Action",
    key: "action",
    visible: true,
    isAction: true,
    actions: [
      {
        type: "edit",
        // eslint-disable-next-line no-console
        handler: () => console.log("Edit"),
      },
      {
        type: "delete",             

        // eslint-disable-next-line no-console
        handler: () => console.log("Delete"),
      },
    ],
  },
];

const Page = () => {
  const { translate } = useLocalization();
  const [response] = useState(mockResponse);
  const [filteredUsers, setFilteredUsers] = useState(mockResponse);
  const [showUserDrawer, setShowUserDrawer] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  useEffect(() => {
    const filteredRows = response.filter((item) => {
      const itemName = `${item.RewardName}`.toLowerCase();
      const sanitizedSearch = searchQuery.toLowerCase().trim();
      return itemName.includes(sanitizedSearch);
    });
    setFilteredUsers(filteredRows);
  }, [searchQuery, response]);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredUsers.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);
  const [columns, setColumns] = useState(columnNames);

  return (
    <Stack padding={3} spacing={2}>
      <Typography variant="h4" gutterBottom color={theme.palette.primary.main}>
        Rewards
      </Typography>
      <Divider />
      <LoyalityDrawer
         open={showUserDrawer}
         onClose={() => setShowUserDrawer(false)}
      />
      <Stack marginTop={2}>
        <GSTableControls
          setSearchQuery={setSearchQuery}
          setColumnsVisibility={(newColumns) => setColumns(newColumns)}
          columns={columns}
          TableTitle={translate("add_rewards")}
          customButtonAction={() => setShowUserDrawer(true)}
          showPrint
          showExcel
          showPdf
          showFilter
        />
      </Stack>
      <GSTable
        columns={columns}
        filteredUsers={filteredUsers}
        currentItems={currentItems}
        currentPage={currentPage}
        totalPages={totalPages}
        handlePageChange={(e, page) => setCurrentPage(page)}
        keyMapping={Object.fromEntries(
          columns.map((col) => [col.label, col.key]),
        )}
      />
    </Stack>
  );
};

export default Page;
