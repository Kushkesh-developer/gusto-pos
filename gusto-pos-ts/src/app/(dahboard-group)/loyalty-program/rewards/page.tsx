"use client";
import React, { useEffect, useState } from "react";
import { Stack } from "@mui/material";
import GSTable from "@/components/widgets/table/GSTable";
import { useLocalization } from "@/context/LocalizationProvider";
import GSTableControls from "@/components/widgets/table/GSTableControls";

import { rewardMock } from "@/mock/rewards";
import { ColumnType } from "@/types/table-types";
import LoyalityDrawer from "@/components/loyalty-program/LoyalityDrawer";
import PageHeader from "@/components/widgets/headers/PageHeader";

const Page = () => {

 const columnNames: ColumnType[] = [
    { label: "No.", key: "No", visible: true },
    { label: "Reward Name", key: "RewardName", visible: true },
    { label: "Image", key: "image", visible: true, type: "image" },
    { label: "Points required to claim", key: "Pointsrequiredtoclaim", visible: true },
    { label: "Reward Valid Period", key: "RewardValidPeriod", visible: true },
    { label: "Show on POS/Hide", key: "Show on POS", visible: true, type: "toggle" },
    {
      label: "Action",
      key: "action",
      visible: true,
      isAction: true,
      actions: [
        { type: "edit", handler: (id) => console.log("Edit:", id) },
        { type: "delete", handler: (id) => console.log("Delete:", id) },
      ],
    },
  ];
  const handleEdit = (id: string | number) => {
    // eslint-disable-next-line no-console
    console.log("Edit user with ID:", id);
    // Add any other logic you want for editing a user, such as routing to an edit page
  };

  // Delete function
  const handleDelete = (id: string | number) => {
    // eslint-disable-next-line no-console
    console.log("Delete user with ID:", id);
    // Filter out the user with the given ID
    setFilteredUsers((prevUsers) => prevUsers.filter((user) => user.id !== id));
  };
  const { translate } = useLocalization();
  const [response] = useState(rewardMock);
  const [filteredUsers, setFilteredUsers] = useState(rewardMock);
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
      <PageHeader title={translate("rewards")} />

      <LoyalityDrawer
        open={showUserDrawer}
        onClose={() => setShowUserDrawer(false)}
      />
      <Stack marginTop={2}>
        <GSTableControls
          setSearchQuery={setSearchQuery}
          setColumnsVisibility={(newColumns) => setColumns(newColumns)}
          columns={columns}
          tableTitle={translate("add_rewards")}
          customButtonAction={() => setShowUserDrawer(true)}
          showPrint
          showExcel
          showPdf
          showFilter
          currentItems={currentItems}
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
          columns.map((col) => [col.label, col.key])
        )}
        setFilteredUsers={setFilteredUsers}
      />
    </Stack>
  );
};

export default Page;
