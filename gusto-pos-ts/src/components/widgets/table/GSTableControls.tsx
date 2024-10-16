import React, { ReactElement } from "react";
import Button from "@mui/material/Button";
import Checkbox from "@mui/material/Checkbox";
import AddIcon from "@mui/icons-material/Add";
import Grid from "@mui/material/Grid2";
import { MenuItem, ListItemText, Menu, Box, useMediaQuery } from "@mui/material";
import GSSearchField from "@/components/widgets/inputs/GSSearchField";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import GSActionButton from "@/components/widgets/buttons/GSActionButton";
import { ColumnType } from "@/types/table-types";
import { useLocalization } from "@/context/LocalizationProvider";
import {  useTheme } from "@mui/material";

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
  customButtonAction?: () => void; // Added for custom button action
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
  customButtonAction,
}: GSTableControlsProps) => {
  const handleSearchChange = (value: string) => {
    (setSearchQuery as (_query: string) => void)(value.toLowerCase());
  };

  const theme = useTheme();

const isBelowLg = useMediaQuery (theme.breakpoints.down("lg"));  
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const { translate } = useLocalization();

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

  const handleButtonClick = () => {
    if (href) {
      window.location.href = href;
    } else if (customButtonAction) {
      customButtonAction();
    }
  };

  return (
    <Grid
      container
      spacing={2}
      sx={{
        justifyContent: "space-between",
           marginBottom: "20px",
      }}
      // style={{
      //   display: "flex",
      //   justifyContent: "space-between",
      //   marginBottom: "20px",
      //   width: "100%",
      //   gap: 3,
      // }}
    >
    <Grid container spacing={2} size={{ xs: 12, lg: 3.5, xl: 4.2 }}>
        {!hideSearch && (
          <Grid size={{ xs: 6 }}>
            <GSSearchField
              onChange={handleSearchChange}
              disableMargin
              placeHolder={translate("Search")}
            />
          </Grid>
        )}

        <Grid size={{ xs: 6 }}>
          <Button
            onClick={handleButtonClick}
            variant="contained"
            color="primary"
            startIcon={<AddIcon />}
            sx={{ width: "200px" }}
          >
            {TableTitle || translate("add_outlet")}
          </Button>
        </Grid>
      </Grid>

      <Grid
       container={isBelowLg}
      // spacing={15}
        sx={{
          display: "flex",
          alignSelf: "flex-start",
           justifyContent: { xs: "flex-start", md: !!renderFilterElement?"flex-start":"flex-end",lg: !!renderFilterElement?"flex-start":"flex-end", xl:"flex-end"},
        }}
        size={{ xs: 12, lg: !!renderFilterElement?12:8.5, xl: 7.8 }}
      >
        {
          !!renderFilterElement && 
        <Grid size={{ xs: 12, lg:3}}>
          {renderFilterElement}
        </Grid>
        }
        <Grid container spacing={0} size={{ xs: 12,lg: 9}}>
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
                minWidth: 0,
                padding: "7px",
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
                <ListItemText
                  sx={{ fontSize: "12px" }}
                  primary={column.label}
                />
              </MenuItem>
            ))}
          </Menu>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default GSTableControls;
