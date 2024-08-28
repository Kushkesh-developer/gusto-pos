import React, { useState } from "react";
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
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import GSActionButton from "@/components/widgets/buttons/GSActionButton";
interface GSTableControlsProps {
  handleFilterClick: (event: React.MouseEvent<HTMLElement>) => void;
  toggleColumnVisibility: (name: string) => void;
  setSearchQuery: (query: string) => void;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  columnNames: string[];
  columnVisibility: Record<string, boolean>;
  anchorEl: HTMLElement | null;
  TableTitle: string;
  showPrint?: boolean;
  showExcel?: boolean;
  showPdf?: boolean;
  modifierSelect?: boolean;
  href?: string;
  showTransfer?: boolean;
  filterSelect?: boolean;
  dateRange?: boolean;
  hideSearch?: boolean;
  startDate?: string;
  endDate?: string;
  id?: string;
  open?: boolean;
}

const GSTableControls: React.FC<GSTableControlsProps> = ({
  handleFilterClick,
  toggleColumnVisibility,
  setSearchQuery,
  columnNames,
  columnVisibility,
  // anchorEl,
  TableTitle,
  showPrint,
  showExcel,
  showPdf,
  modifierSelect,
  href,
  showTransfer,
  filterSelect,
  dateRange,
  hideSearch,
  id,
  // open,
  onChange,
  startDate,
  endDate,
}) => {
  const [_dateRange, setDateRange] = useState<{
    startDate: string;
    endDate: string;
  }>({
    startDate: "",
    endDate: "",
  });
  const handleSearchChange = (value: string) => {
    setSearchQuery(value.toLowerCase());
    // Add additional logic here if necessary
  };
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
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
      {!hideSearch && (
        <div style={{ width: "400px" }}>
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
          marginLeft: "12px",
        }}
      >
        {href && (
          <Link href={href} passHref>
            <Button variant="contained" color="primary" startIcon={<AddIcon />}>
              {TableTitle}
            </Button>
          </Link>
        )}
      </div>

      {showTransfer && href && (
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
          {showPrint && (
            <GSActionButton label="Print" onClick={() => window.print()} />
          )}
          {showExcel && (
            <GSActionButton
              label="Export to Excel"
              onClick={() => {
                // Add your Excel export logic here
              }}
            />
          )}
          {showPdf && (
            <GSActionButton
              label="Export to PDF"
              onClick={() => {
                // Add your PDF export logic here
              }}
            />
          )}
          <Button
            id="basic-button"
            aria-controls={open ? "basic-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
            onClick={handleClick}
            variant="outlined"
            startIcon={<FilterAltIcon />}
          ></Button>
          <Menu
            id="basic-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            MenuListProps={{
              "aria-labelledby": "basic-button",
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
        </Grid>
      )}
    </div>
  );
};

export default GSTableControls;
