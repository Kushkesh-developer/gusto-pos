import React, { ReactElement } from "react";
import Button from "@mui/material/Button";
import Checkbox from "@mui/material/Checkbox";
import AddIcon from "@mui/icons-material/Add";
import Link from "next/link";
import Grid from "@mui/material/Grid2";
import { MenuItem, ListItemText, Menu } from "@mui/material";
import GSSearchField from "@/components/widgets/inputs/GSSearchField";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import GSActionButton from "@/components/widgets/buttons/GSActionButton";

interface ColumnType {
  label: string;
  key: string;
  visible: boolean;
  isAction?: boolean;
}

interface GSTableControlsProps {
  handleFilterClick?: (_event: React.MouseEvent<HTMLElement>) => void;
  setSearchQuery?: (_query: string) => void;
  onChange?: (_event: React.ChangeEvent<HTMLInputElement>) => void;
  setColumnsVisibility?: (_columns: ColumnType[]) => void;
  columns: ColumnType[];
  TableTitle?: string;
  showPrint?: boolean;
  showExcel?: boolean;
  showPdf?: boolean;
  showFilter?: boolean;
  href?: string;
  hideSearch?: boolean;
  renderFilterElement?: ReactElement | null;
}

const GSTableControls = ({
  setSearchQuery,
  setColumnsVisibility,
  columns,
  TableTitle,
  showPrint,
  showExcel,
  showPdf,
  showFilter,
  href,
  hideSearch,
  renderFilterElement,
}: GSTableControlsProps) => {
  const handleSearchChange = (value: string) => {
    (setSearchQuery as (_query: string) => void)(value.toLowerCase());
  };
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const toggleColumnVisibility = (key: string) => {
    const item: ColumnType = columns.find((column) => column.key === key) || {
      label: "",
      key: "",
      visible: false,
    };
    item.visible = !item.visible; // JS reference pattern will change the array values internally;
    const newColumns = [...columns];
    setColumnsVisibility?.(newColumns);
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
      {/* Change Area - This div will only display if href is provided */}
      <div
        style={{
          width: "100%",
          display: href ? "flex" : "none", // Conditionally render the div based on href
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
      {/* End of Change Area */}

      <Grid
        container
        // columnSpacing="8px"
        direction="row"
        sx={{
          display: "flex",
          justifyContent: "flex-end",
          alignItems: "center",
          width: "100%",
        }}
      >
        {!!renderFilterElement && renderFilterElement}
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
          {columns?.map((column) => (
            <MenuItem key={column.key} sx={{ height: "26px" }}>
              <Checkbox
                checked={column.visible}
                onChange={() => toggleColumnVisibility(column.key)}
                name={column.label}
              />
              <ListItemText sx={{ fontSize: "12px" }} primary={column.label} />
            </MenuItem>
          ))}
        </Menu>
      </Grid>
    </div>
  );
};

export default GSTableControls;
