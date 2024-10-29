import React, { useEffect, useState, MutableRefObject } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Checkbox from "@mui/material/Checkbox";
import AddIcon from "@mui/icons-material/Add";
import Link from "next/link";
import {
  Box,
  Grid,
  MenuItem,
  ListItemText,
  Select,
  InputLabel,
  FormControl,
  Menu,
} from "@mui/material";
import GSSearchField from "@/components/widgets/inputs/GSSearchField";

const GSTableControls = ({
  columnNames,
  columnVisibility,
  anchorEl,
  handleFilterClick,
  toggleColumnVisibility,
  tableTitle,
  setSearchQuery,
  print,
  excel,
  pdf,
  modifierSelect,
  href,
  transfer,
  filterSelect,
  dateRange,
  NoSearch,
  id,
  open,
  onChange,
  startDate,
  endDate,
}) => {
  const [_dateRange, setDateRange] = useState({
    startDate: "",
    endDate: "",
  });
  const handleSearchChange = (value) => {
    setSearchQuery(value.toLowerCase());
    // Add additional logic here if necessary
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        marginBottom: "20px",
        width: "100%",
        gap: 3,
      }}
    >
      {!NoSearch && (
        <div className="w-[600px] ">
          <GSSearchField onChange={handleSearchChange} />
        </div>
      )}

      {modifierSelect && (
        <>
          <Grid item xs={12} sm={3}>
            <FormControl fullWidth>
              <InputLabel>Select Group</InputLabel>
              <Select defaultValue="">
                <MenuItem value="Hot">Hot</MenuItem>
                <MenuItem value="Cold">Cold</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={3}>
            <FormControl fullWidth>
              <InputLabel>Select Modifier</InputLabel>
              <Select defaultValue="">
                <MenuItem value="OnionRing">Onion Ring</MenuItem>
                <MenuItem value="Coleslaw">Coleslaw</MenuItem>
              </Select>
            </FormControl>
          </Grid>
        </>
      )}

      {dateRange && (
        <Grid item xs={12} sm={3}>
          <FormControl fullWidth>
            <TextField
              label="Enter Date"
              variant="outlined"
              value={
                _dateRange.startDate && _dateRange.endDate
                  ? `${_dateRange.startDate} - ${_dateRange.endDate}`
                  : ""
              }
              InputProps={{
                startAdornment: (
                  <img src="/images/calendar-icon.svg" alt="Calendar Icon" />
                ),
              }}
            />
          </FormControl>
        </Grid>
      )}

      {filterSelect && (
        <Grid item xs={12} sm={3}>
          <FormControl fullWidth>
            <InputLabel>Filter by Type</InputLabel>
            <Select defaultValue="">
              <MenuItem value="Option1">Option 1</MenuItem>
              <MenuItem value="Option2">Option 2</MenuItem>
            </Select>
          </FormControl>
        </Grid>
      )}

      <div
        style={{
          width: "100%",
          display: "flex",
          alignItems: "center",
        }}
      >
        {href && (
          <Link href={href} passHref>
            <Button variant="contained" color="primary" startIcon={<AddIcon />}>
              {tableTitle}
            </Button>
          </Link>
        )}
      </div>

      {transfer && href && (
        <div>
          <Link href={href} passHref>
            <Button
              variant="contained"
              color="primary"
              startIcon={
                <img
                  src="/images/white-transfer-icon.svg"
                  alt="Transfer Icon"
                />
              }
            >
              Bulk Transfer
            </Button>
          </Link>
        </div>
      )}

      {toggleColumnVisibility && columnVisibility && (
        <Grid
          item
          xs={12}
          sm={12}
          md="auto"
          container
          justifyContent="flex-end"
          alignItems="center"
          gap={1}
        >
          <Button onClick={handleFilterClick}>filter</Button>
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            // onClose={() => setAnchorEl(null)}
            PaperProps={{
              sx: {
                maxHeight: 400,
                width: "auto",
              },
            }}
          >
            {columnNames.map((name) => (
              <MenuItem key={name} onClick={() => toggleColumnVisibility(name)}>
                <Checkbox
                  checked={columnVisibility[name]}
                  onChange={() => toggleColumnVisibility(name)}
                  name={name}
                />
                <ListItemText primary={name} />
              </MenuItem>
            ))}
          </Menu>
          <div>
            {print && (
              <Button
                variant="outlined"
                sx={{ marginRight: "10px" }}
                onClick={() => window.print()}
              >
                Print
              </Button>
            )}
            {excel && (
              <Button variant="outlined" sx={{ marginRight: "10px" }}>
                Export to Excel
              </Button>
            )}
            {pdf && (
              <Button variant="outlined" sx={{ marginRight: "10px" }}>
                Export to PDF
              </Button>
            )}
          </div>
        </Grid>
      )}
    </div>
  );
};

export default GSTableControls;
