import React, { ReactElement } from "react";
import Button from "@mui/material/Button";
import Checkbox from "@mui/material/Checkbox";
import AddIcon from "@mui/icons-material/Add";
import Grid from "@mui/material/Grid2";
import { MenuItem, ListItemText, Menu, Stack } from "@mui/material";
import GSSearchField from "@/components/widgets/inputs/GSSearchField";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import GSActionButton from "@/components/widgets/buttons/GSActionButton";
import { ColumnType } from "@/types/table-types";
import { useLocalization } from "@/context/LocalizationProvider";
import useMediaQuery from "@mui/material/useMediaQuery"; // Import useMediaQuery

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
  customButtonAction?: () => void;
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
    item.visible = !item.visible;
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

  const isSmallScreen = useMediaQuery("(max-width:900px)"); // Media query for screens below 900px
  const isMediumScreen = useMediaQuery("(min-width:767px) and (max-width:1200px)"); // Media query for screens between 900px and 1200px

  return (
    <div
      style={{
        display: "flex",
        flexDirection: isSmallScreen ? "column" : "row",
        justifyContent: "space-between",
        marginBottom: "20px",
        width: "100%",
        gap: 3,
        alignItems: isSmallScreen || isMediumScreen  ? "flex-start" : "center",
       
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: isSmallScreen ? "column" : "row",
          justifyContent: isSmallScreen ? "flex-start" : "space-between",
          gap: "16px",
          width: isSmallScreen ? "100%" : "auto",
        }}
      >
        {!hideSearch && (
          <GSSearchField
            onChange={handleSearchChange}
            disableMargin
            placeHolder={translate("Search")}
            style={{
              width: isSmallScreen ? "50%" : "auto", // 50% width for small screens
            }}
          />
        )}

        <Button
          onClick={handleButtonClick}
          variant="contained"
          startIcon={<AddIcon />}
          sx={{
            backgroundColor: "#1A3765",
            color: "#fff",
            height: "40px",
            width: isSmallScreen ? "125px" : "auto", // 125px width for small screens
            padding: "0 12px",
            boxShadow: "none",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            '&:hover': {
              backgroundColor: "#162f56",
              boxShadow: "none",
            },
          }}
        >
          {TableTitle || translate("add_outlet")}
        </Button>
      </div>

      <Stack
        container
        direction="row"
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "flex-end",
          width: "100%",
          gap: "16px",
          flexWrap: isSmallScreen || isMediumScreen ? "wrap" : "nowrap", // Wrap items on small and medium screens
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
              <ListItemText sx={{ fontSize: "12px" }} primary={column.label} />
            </MenuItem>
          ))}
        </Menu>
      </Stack>
    </div>
  );
};

export default GSTableControls;
