import React from "react";
import Button from "@mui/material/Button";
import Checkbox from "@mui/material/Checkbox";
import AddIcon from "@mui/icons-material/Add";
import PrintIcon from "@mui/icons-material/Print";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import AssignmentIcon from '@mui/icons-material/Assignment';
import Excel from "../../../../public/excel.svg";
import Grid from "@mui/material/Grid2";
import { MenuItem, ListItemText, Menu, Box } from "@mui/material";
import GSSearchField from "@/components/widgets/inputs/GSSearchField";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import GSActionButton from "@/components/widgets/buttons/GSActionButton";
import GSSwitchButton from "@/components/widgets/switch/GSSwitchButton";
import { ColumnType } from "@/types/table-types";
import { useLocalization } from "@/context/LocalizationProvider";
import * as XLSX from "xlsx";
import jsPDF from "jspdf";
import "jspdf-autotable";
import autoTable from "jspdf-autotable";

interface GSTableControlsProps {
  handleFilterClick?: (_event: React.MouseEvent<HTMLElement>) => void;
  setSearchQuery?: (_query: string) => void;
  onChange?: (_event: React.ChangeEvent<HTMLInputElement>) => void;
  setColumnsVisibility?: (_columns: ColumnType[]) => void;
  columns: ColumnType[];
  tableTitle?: string;
  showPrint?: boolean;
  showExcel?: boolean;
  showPdf?: boolean;
  showFilter?: boolean;
  href?: string;
  hideSearch?: boolean;
  currentItems?: any[]; // eslint-disable-line
  renderFilterElement?: React.ReactElement | null;
  customButtonAction?: () => void;
}

const GSTableControls = ({
  setSearchQuery,
  setColumnsVisibility,
  columns,
  tableTitle,
  showPrint,
  showExcel,
  showPdf,
  showFilter,
  href,
  hideSearch,
  renderFilterElement,
  currentItems,
  customButtonAction,
}: GSTableControlsProps) => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => setAnchorEl(null);
  const { translate } = useLocalization();

  const toggleColumnVisibility = (key: string) => {
    const item = columns.find((column) => column.key === key);
    if (item) {
      item.visible = !item.visible;
      setColumnsVisibility?.([...columns]);
    }
  };

  const handleSearchChange = (value: string) => {
    setSearchQuery?.(value.toLowerCase());
  };

  const excludeActionColumn = (columns: ColumnType[], data: any[]) => {
    // Filter out the action column by checking its key
    const filteredColumns = columns.filter((col) => col.key !== "action");
    const filteredData = data.map((item) =>
      filteredColumns.map((col) => item[col.key] === undefined ? "" : item[col.key])
    );
    return { filteredColumns, filteredData };
  };

  const PrintData = () => {
    const { filteredColumns, filteredData } = excludeActionColumn(columns, currentItems || []);
    const printWindow = window.open("", "_blank");
    if (printWindow) {
      const tableHeaders = filteredColumns.map((col) => col.label);
      printWindow.document.write(`
        <html>
          <head><title>${tableTitle || "Print Table"}</title></head>
          <body>
            <h2>${tableTitle || "Table Export"}</h2>
            <table border="1" cellpadding="5" cellspacing="0">
              <thead><tr>${tableHeaders.map(header => `<th>${header}</th>`).join("")}</tr></thead>
              <tbody>
                ${filteredData.map(row => `<tr>${row.map(cell => `<td>${cell}</td>`).join("")}</tr>`).join("")}
              </tbody>
            </table>
          </body>
        </html>
      `);
      printWindow.document.close();
      printWindow.print();
    }
  };

  const exportToPDF = () => {
    const { filteredColumns, filteredData } = excludeActionColumn(columns, currentItems || []);
    const doc = new jsPDF();
    const tableHeaders = filteredColumns.map((col) => col.label);

    doc.text(tableTitle || "Table Export", 20, 10);
    autoTable(doc, {
      head: [tableHeaders],
      body: filteredData,
    });
    doc.save(`${tableTitle || "table-export"}.pdf`);
  };

  const exportToExcel = () => {
    if (!currentItems || currentItems.length === 0) {
      alert("No data available for export");
      return;
    }

    const { filteredColumns, filteredData } = excludeActionColumn(columns, currentItems);
    const tableHeaders = filteredColumns.map((col) => col.label);
    const worksheet = XLSX.utils.aoa_to_sheet([tableHeaders, ...filteredData]);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Table Export");
    XLSX.writeFile(workbook, "table-export.xlsx");
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: { xs: "column", md: "row" },
        justifyContent: "space-between",
        marginBottom: "20px",
        width: "100%",
        gap: { xs: "16px", md: "16px" },
      }}
    >
      <Box sx={{ display: "flex", flexDirection: "row", gap: "16px" }}>
        {!hideSearch && (
          <GSSearchField onChange={handleSearchChange} disableMargin placeHolder={translate("Search")} />
        )}

        {tableTitle && (
          <Button
            onClick={() => href ? window.location.href = href : customButtonAction?.()}
            variant="contained"
            color="primary"
            startIcon={<AddIcon />}
            sx={{ height: "39px", whiteSpace: "nowrap", minWidth: "fit-content" }}
          >
            {tableTitle || translate("add_outlet")}
          </Button>
        )}
      </Box>

      <Box sx={{ display: "flex", flexDirection: "row", gap: "16px", alignItems: "center" }}>
        <Grid
          container
          spacing={2}
          sx={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: { xs: "flex-start", md: "flex-end" },
          }}
        >
          {renderFilterElement}
          {showPrint && (
            <Button onClick={PrintData} variant="outlined" sx={{ padding: "7px", minWidth: 0 }}>
              <PrintIcon />
            </Button>
          )}
          {showExcel && (
            <Button onClick={exportToExcel} variant="outlined" sx={{ padding: "7px", minWidth: 0 }}>
              <Excel width={24} height={24} fill="#3973b6" />
            </Button>
          )}
          {showPdf && (
            <Button onClick={exportToPDF} variant="outlined" sx={{ padding: "7px", minWidth: 0 }}>
              <PictureAsPdfIcon />
            </Button>
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
          <Menu id="basic-menu" anchorEl={anchorEl} open={open} onClose={handleClose}>
            {columns.map((column) => (
              <MenuItem key={column.key} sx={{ height: "26px" }}>
                {["Show on Web", "Show on POS"].includes(column.key) ? (
                  <GSSwitchButton
                    checked={column.visible}
                    onChange={() => toggleColumnVisibility(column.key)}
                    label={column.label}
                  />
                ) : (
                  <>
                    <Checkbox
                      checked={column.visible}
                      onChange={() => toggleColumnVisibility(column.key)}
                    />
                    <ListItemText sx={{ fontSize: "12px" }} primary={column.label} />
                  </>
                )}
              </MenuItem>
            ))}
          </Menu>
        </Grid>
      </Box>
    </Box>
  );
};

export default GSTableControls;
