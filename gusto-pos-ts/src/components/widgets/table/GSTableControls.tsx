import React from "react";

import Button from "@mui/material/Button";
import Checkbox from "@mui/material/Checkbox";
import AddIcon from "@mui/icons-material/Add";
import Grid from "@mui/material/Grid2";
import { MenuItem, ListItemText, Menu, useMediaQuery } from "@mui/material";
import GSSearchField from "@/components/widgets/inputs/GSSearchField";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import GSActionButton from "@/components/widgets/buttons/GSActionButton";
import { ColumnType } from "@/types/table-types";
import { useLocalization } from "@/context/LocalizationProvider";
import * as XLSX from "xlsx"; // For Excel export
import jsPDF from "jspdf";
import "jspdf-autotable";
import autoTable from "jspdf-autotable";
import { useTheme } from "@mui/material";

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
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  currentItems?: any[];
  renderFilterElement?: React.ReactElement | null;
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
  currentItems,
  customButtonAction,
}: GSTableControlsProps) => {
  const handleSearchChange = (value: string) => {
    setSearchQuery?.(value.toLowerCase());
  };

  const theme = useTheme();

  const isBelowLg = useMediaQuery(theme.breakpoints.down("lg"));

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

  // PDF Export Function
  const exportToPDF = () => {
    const doc = new jsPDF();

    // Extracting table headers and data from columns
    const tableHeaders = columns.map((col) => col.label); // labels as headers
    const tableData = columns.map((col) => [
      col.visible ? "Visible" : "Hidden",
    ]); // visibility as data (or you can include actual table data)

    // Using autoTable to generate the table
    doc.text(TableTitle || "Table Export", 20, 10);
    autoTable(doc, {
      head: [tableHeaders],
      body: tableData,
    });

    doc.save(`${TableTitle || "table-export"}.pdf`);
  };

  // Excel Export Function
  const exportToExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(
      columns.map((col) => ({ label: col.label, visible: col.visible }))
    );
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Table Export");
    XLSX.writeFile(workbook, "table-export.xlsx");
  };
  // Inside GSTableControls
  // const printData = () => {
  //   const printWindow = window.open("", "_blank");
  //   if (printWindow) {
  //     // Constructing the table header
  //     const tableHeader = `<tr>${columns
  //       .filter((col) => col.visible)
  //       .map((col) => `<th>${col.label}</th>`)
  //       .join("")}</tr>`;
  
  //     // Constructing the table rows, providing a fallback for currentItems
  //     const tableRows = (currentItems ?? [])
  //       .map((item) => {
  //         return `<tr>${columns
  //           .filter((col) => col.visible)
  //           .map((col) => `<td>${item[col.key]}</td>`)
  //           .join("")}</tr>`;
  //       })
  //       .join("");
  
  //     // Complete HTML structure for the print
  //     const printContent = `
  //       <html>
  //         <head>
  //           <style>
  //             table {
  //               width: 100%;
  //               border-collapse: collapse;
  //             }
  //             th, td {
  //               border: 1px solid black;
  //               padding: 8px;
  //               text-align: left;
  //             }
  //           </style>
  //         </head>
  //         <body>
  //           <h1>${TableTitle || "Table Data"}</h1>
  //           <table>
  //             <thead>${tableHeader}</thead>
  //             <tbody>${tableRows}</tbody>
  //           </table>
  //         </body>
  //       </html>
  //     `;
  
  //     printWindow.document.write(printContent);
  //     printWindow.document.close();
  //     printWindow.print();
  //   }
  // };
  //  above logic is also correct but the later one is more feasible 
  const printData = () => {
    const printWindow = window.open("", "_blank");
    if (printWindow) {
      // Constructing the table header
      const tableHeader = `<tr>${columns
        .filter((col) => col.visible)
        .map((col) => `<th>${col.label}</th>`)
        .join("")}</tr>`;
  
      // Conditionally construct table rows only if currentItems is defined
      const tableRows = currentItems
        ? currentItems
            .map((item) => {
              return `<tr>${columns
                .filter((col) => col.visible)
                .map((col) => `<td>${item[col.key]}</td>`)
                .join("")}</tr>`;
            })
            .join("")
        : "";
  
      // Complete HTML structure for the print
      const printContent = `
        <html>
          <head>
            <style>
              table {
                width: 100%;
                border-collapse: collapse;
              }
              th, td {
                border: 1px solid black;
                padding: 8px;
                text-align: left;
              }
            </style>
          </head>
          <body>
            <h1>${TableTitle || "Table Data"}</h1>
            <table>
              <thead>${tableHeader}</thead>
              <tbody>${tableRows}</tbody>
            </table>
          </body>
        </html>
      `;
  
      printWindow.document.write(printContent);
      printWindow.document.close();
      printWindow.print();
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
          justifyContent: {
            xs: "flex-start",
            md: renderFilterElement ? "flex-start" : "flex-end",
            lg: renderFilterElement ? "flex-start" : "flex-end",
            xl: "flex-end",
          },
        }}
        size={{ xs: 12, lg: renderFilterElement ? 12 : 8.5, xl: 7.8 }}
      >
        {renderFilterElement && (
          <Grid size={{ xs: 12, lg: 3 }}>{renderFilterElement}</Grid>
        )}
        <Grid container spacing={0} size={{ xs: 12, lg: 9 }}>
          {showPrint && <GSActionButton label="Print" onClick={printData} />}
          {showExcel && (
            <GSActionButton label="Export to Excel" onClick={exportToExcel} />
          )}
          {showPdf && (
            <GSActionButton label="Export to PDF" onClick={exportToPDF} />
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
