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
import { ColumnType } from "@/types/table-types";
import { useLocalization } from "@/context/LocalizationProvider";

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
  customButtonAction
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

  return (
    <Grid
      container
      spacing={2}
      alignItems="flex-start"
      justifyContent="space-between"
      sx={{
        marginBottom: "20px",
        width: "100%",
      }}
    >
      {/* Search Bar */}
      {!hideSearch && (
        <Grid size={{ xs: 12, md: 6 }}>
          <GSSearchField
            onChange={handleSearchChange}
            disableMargin
            placeHolder={translate("Search")}
            sx={{width:"44px"}}
          />
        </Grid>
      )}

      {/* Add Button (conditionally rendered based on href) */}
      <Grid
        size={{ xs: 12, md: 6 }}
        sx={{ display: "flex", }}
      >
        {href ? (
          <Link href={href} passHref>
            <Button
              variant="contained"
              color="primary"
              startIcon={<AddIcon />}
              sx={{ width: "auto", marginLeft: "12px" }}
            >
              {TableTitle}
            </Button>
          </Link>
        ) : customButtonAction ? (
          <Button
            onClick={customButtonAction}
            variant="contained"
            startIcon={<AddIcon />}
            sx={{ display: 'flex', alignItems: 'center', width: "auto", marginLeft: "12px" }}
          >
            {TableTitle || translate("add_outlet")}
          </Button>
        ) : null}
      </Grid>

      {/* Control Buttons */}
      <Grid
        size={{ xs: 12, md: 6 }}
        sx={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: { xs: "flex-start", md: "flex-end" },
          alignItems: "center",
          gap: 2,
        }}
      >
        {!!renderFilterElement && <div>{renderFilterElement}</div>}

        {showPrint && (
          <div>
            <GSActionButton label="Print" onClick={() => window.print()} />
          </div>
        )}

        {showExcel && (
          <div>
            <GSActionButton
              label="Export to Excel"
              onClick={() => {
                // Add your Excel export logic here
              }}
            />
          </div>
        )}

        {showPdf && (
          <div>
            <GSActionButton
              label="Export to PDF"
              onClick={() => {
                // Add your PDF export logic here
              }}
            />
          </div>
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
      </Grid>
    </Grid>
  );
};

export default GSTableControls;
