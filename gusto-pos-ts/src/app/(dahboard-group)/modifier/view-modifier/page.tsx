"use client";
import React, { useEffect, useState } from "react";
import { Typography, Divider, Stack } from "@mui/material";
import GSTable from "@/components/widgets/table/GSTable";
import GSTableControls from "@/components/widgets/table/GSTableControls";
import { theme } from "@/theme/theme";
import SelectInput from "@/components/widgets/inputs/GSSelectInput";
import { useLocalization } from "@/context/LocalizationProvider";

const groupOptions = [
  { label: "Hot", value: "hot" },
  { label: "Cold", value: "cold" },
];

const modifierOptions = [
  { label: "Onion Ring", value: "onionRing" },
  { label: "Coleslaw", value: "coleslaw" },
];

const Page = () => {
  const { translate } = useLocalization();
  const mockResponse = [
    {
      modifier: "Onion Ring",
      group: "Hot",
      location: "Chai Chee",
      price: "$1.00",
    },
    {
      modifier: "Coleslaw",
      group: "8181 2828",
      location: "Chai Chee",
      price: "$1.00",
    },
  ];

  const [response] = useState(mockResponse);
  const [filteredUsers, setFilteredUsers] = useState(mockResponse);
  const [searchQuery, setSearchQuery] = useState("");

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredUsers.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);
  const columnNames = [
    "Modifier / Add on",
    "Group",
    "Location",
    "Price",
    "Action",
  ];
  const [columnVisibility, setColumnVisibility] = useState({
    "Modifier / Add on": true,
    Group: true,
    Location: true,
    Price: true,
    Action: true,
  });

  const toggleColumnVisibility = (columnName: string) => {
    setColumnVisibility((prevVisibility: any) => ({
      ...prevVisibility,
      [columnName]: !prevVisibility[columnName],
    }));
  };

  useEffect(() => {
    const filteredRows = response.filter((items) => {
      const item =
        `${items.modifier} ${items.group} ${items.location}`.toLowerCase();
      const sanitizedSearch = searchQuery.toLowerCase().trim();
      return item.includes(sanitizedSearch);
    });
    setFilteredUsers(filteredRows);
  }, [searchQuery, response]);

  return (
    <div style={{ padding: "24px" }}>
      <Typography variant="h4" gutterBottom color={theme.palette.primary.main}>
        View Modifier
      </Typography>
      <Divider />
      <div style={{ marginTop: "15px" }}>
        <GSTableControls
          setSearchQuery={setSearchQuery}
          columnNames={columnNames}
          columnVisibility={columnVisibility}
          toggleColumnVisibility={toggleColumnVisibility}
          TableTitle="Add new modifier"
          href="/customers/add-customer"
          showFilter
          renderFilterElement={
            <>
              <SelectInput
                options={groupOptions}
                placeholder={translate("select_group")}
                height="40px"
              />
              <SelectInput
                options={modifierOptions}
                placeholder={translate("select_modifier")}
                height="40px"
              />
            </>
          }
        />
      </div>
      <GSTable
        columnNames={columnNames}
        columnVisibility={columnVisibility}
        filteredUsers={filteredUsers}
        currentItems={currentItems}
        currentPage={currentPage}
        totalPages={totalPages}
        handlePageChange={(e, page) => setCurrentPage(page)}
        keyMapping={{
          "Modifier / Add on": "modifier",
          Group: "group",
          Location: "location",
          Price: "price",
        }}
      />
    </div>
  );
};

export default Page;
