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

interface GSTableControlsProps {
  columnNames: string[];
  columnVisibility: Record<string, boolean>;
  anchorEl: HTMLElement | null;
  handleFilterClick: (event: React.MouseEvent<HTMLElement>) => void;
  toggleColumnVisibility: (name: string) => void;
  TableTitle: string;
  setSearchQuery: (query: string) => void;
  print?: boolean;
  excel?: boolean;
  pdf?: boolean;
  modifierSelect?: boolean;
  href?: string;
  transfer?: boolean;
  filterSelect?: boolean;
  dateRange?: boolean;
  NoSearch?: boolean;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  startDate?: string;
  endDate?: string;
  id?: string;
  open?: boolean;
}

const GSTableControls: React.FC<GSTableControlsProps> = ({
  columnNames,
  columnVisibility,
  anchorEl,
  handleFilterClick,
  toggleColumnVisibility,
  TableTitle,
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

  return (
    <Box
      sx={{
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
              {TableTitle}
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
          <Box>
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
          </Box>
        </Grid>
      )}
    </Box>
  );
};

export default GSTableControls;
