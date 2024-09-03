import React from "react";
import Button from "@mui/material/Button";
import Checkbox from "@mui/material/Checkbox";
import AddIcon from "@mui/icons-material/Add";
import Link from "next/link";
import Grid from '@mui/material/Grid2';
import {  MenuItem, ListItemText,  Menu } from "@mui/material";
import GSSearchField from "@/components/widgets/inputs/GSSearchField";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import GSActionButton from "@/components/widgets/buttons/GSActionButton";
interface GSTableControlsProps {
  handleFilterClick?: (event: React.MouseEvent<HTMLElement>) => void;
  toggleColumnVisibility?: (name: string) => void;
  setSearchQuery?: (query: string) => void;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  columnNames?: string[];
  columnVisibility?: Record<string, boolean>;
  TableTitle: string;
  showPrint?: boolean;
  showExcel?: boolean;
  showPdf?: boolean;
  showFilter?: boolean;
  href?: string;
  hideSearch?: boolean;
}


  const GSTableControls = ({
    toggleColumnVisibility,
    setSearchQuery,
    columnNames,
    columnVisibility,
    TableTitle,
    showPrint,
    showExcel,
    showPdf,
    showFilter,
    href,
    hideSearch,
  }: GSTableControlsProps) => {
  const handleSearchChange = (value: string) => {
    (setSearchQuery as (query: string) => void)(value.toLowerCase());
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
          <GSSearchField
            onChange={handleSearchChange}
            disableMargin
            placeHolder="Search"
          />
        </div>
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

      {toggleColumnVisibility && columnVisibility && (
        <Grid
        container
        columnSpacing="8px"
        direction="row"
        sx={{ display: "flex", justifyContent: "flex-end", alignItems: "center",width:"100%", }}>
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
          {showFilter && (
            <Button
              id="basic-button"
              aria-controls={open ? "basic-menu" : undefined}
              aria-haspopup="true"
              aria-expanded={open ? "true" : undefined}
              onClick={handleClick}
              variant="outlined"
              startIcon={<FilterAltIcon />}
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                minWidth: 0, // To prevent button from stretching horizontally
                padding: "7px", // Adjust padding as needed
                "& .MuiButton-startIcon": {
                  marginRight: 0,
                  marginLeft: 0,
                },
              }}
            />
          )}
          <Menu
            id="basic-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            MenuListProps={{
              "aria-labelledby": "basic-button",
            }}
          >
            {columnNames?.map((name) => (
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
