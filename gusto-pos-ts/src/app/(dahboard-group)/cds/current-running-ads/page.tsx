"use client";
import React, { useEffect, useState } from "react";
import { Typography, Divider, useTheme, Box } from "@mui/material";
import GSTable from "@/components/widgets/table/GSTable";
import SelectInput from "@/components/widgets/inputs/GSSelectInput";
import GSTableControls from "@/components/widgets/table/GSTableControls";
import { useLocalization } from "@/context/LocalizationProvider";
import { ColumnType } from "@/types/table-types";
import {outletsOptions,floorOptions,mockResponse} from "@/mock/cds"


const Page = () => {
  const { translate } = useLocalization();

  // Mock data

  const [response] = useState(mockResponse);
  const [filteredUsers, setFilteredUsers] = useState(mockResponse);
  const [searchQuery, setSearchQuery] = useState("");
  const theme = useTheme();

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredUsers.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);

  const columnNames: ColumnType[] = [
    { label: "Order", key: "order", visible: true },
    { label: "Name", key: "Name", visible: true },
    { label: "Image", key: "image", visible: true },
    { label: "Outlets", key: "outlets", visible: true },
    { label: "Start Date", key: "startDate", visible: true },
    { label: "End Date", key: "endDate", visible: true },
    { label: "Impression", key: "impression", visible: true },
    { label: "Status", key: "status", visible: true },
    {
      label: "Action",
      key: "action",
      visible: true,
      isAction: true,
      actions: [
        {
          type: "edit",
          // eslint-disable-next-line no-console
          handler: () => console.log("edit"),
        },
        {
          type: "delete",
          // eslint-disable-next-line no-console
          handler: () => console.log("delete"),
        },
      ],
    },
   
  ];
  const [columns, setColumns] = useState(columnNames);
  // Filter users based on search query
  useEffect(() => {
    const filteredRows = response.filter((user) => {
      const userData =
        `${user.order} ${user.Name} ${user.status}`.toLowerCase();
      const sanitizedSearch = searchQuery.toLowerCase().trim();
      return userData.includes(sanitizedSearch);
    });
    setFilteredUsers(filteredRows);
  }, [searchQuery, response]);

  return (
    <Box style={{ padding: "24px" }}>
      <Typography variant="h4" gutterBottom color={theme.palette.primary.main}>
        {translate("current_running_ads")}
      </Typography>
      <Divider />
      <Box mt={"40px"}>
        <GSTableControls
          setSearchQuery={setSearchQuery}
          setColumnsVisibility={(newColumns) => setColumns(newColumns)} 
          columns={columns}
          renderFilterElement={
            <Box
              display="flex"
              gap="10px"
              justifyContent="end"
              pb="10px"
              width="100%"
            >
              <SelectInput
                options={floorOptions}
                placeholder={translate("select_floor")}
                height="40px"
              />
              <SelectInput
                options={outletsOptions}
                placeholder={translate("select_outlets")}
                height="40px"
              />
            </Box>
          }
          showFilter
        />
      </Box>
      <GSTable
        columns={columns}
        filteredUsers={filteredUsers}
        currentItems={currentItems} // Ensure this is passed
        currentPage={currentPage}
        totalPages={totalPages}
        handlePageChange={(e, page) => setCurrentPage(page)}
        keyMapping={Object.fromEntries(
          columnNames.map((col) => [col.label, col.key]),
        )}
      />
      <Box mt={"50px"}>
        {" "}
        <Typography
          variant="h4"
          gutterBottom
          color={theme.palette.primary.main}
        >
          Tables
        </Typography>
        <Divider />
        <Box mt={"40px"}>
          <GSTableControls
            setSearchQuery={setSearchQuery}
            setColumnsVisibility={(newColumns) => setColumns(newColumns)}
            columns={columns}
            TableTitle="Add Table"
            showFilter
            href="/staff/add-staff"
            renderFilterElement={
              <Box
                display="flex"
                gap="10px"
                justifyContent="end"
                pb="10px"
                width="100%"
              >
                <SelectInput
                  options={floorOptions}
                  placeholder={translate("select_floor")}
                  height="40px"
                />
                <SelectInput
                  options={outletsOptions}
                  placeholder={translate("select_outlets")}
                  height="40px"
                />
              </Box>
            }
          />
        </Box>
        <GSTable
          columns={columns}
          filteredUsers={filteredUsers}
          currentItems={currentItems} // Ensure this is passed
          currentPage={currentPage}
          totalPages={totalPages}
          handlePageChange={(e, page) => setCurrentPage(page)}
          keyMapping={Object.fromEntries(
            columnNames.map((col) => [col.label, col.key]),
          )}
        />
      </Box>
    </Box>
  );
};

export default Page;
