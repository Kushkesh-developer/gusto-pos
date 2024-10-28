import React from "react";

import Button from "@mui/material/Button";
import Checkbox from "@mui/material/Checkbox";
import AddIcon from "@mui/icons-material/Add";
import Grid from "@mui/material/Grid2";
import { MenuItem, ListItemText, Menu, } from "@mui/material";
import GSSearchField from "@/components/widgets/inputs/GSSearchField";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import GSActionButton from "@/components/widgets/buttons/GSActionButton";
import { ColumnType } from "@/types/table-types";
import { useLocalization } from "@/context/LocalizationProvider";
import * as XLSX from "xlsx"; // For Excel export
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
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  currentItems?: any[];
  renderFilterElement?: React.ReactElement | null;
  customButtonAction?: () => void; // Added for custom button action
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
  const handleSearchChange = (value: string) => {
    setSearchQuery?.(value.toLowerCase());
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
    doc.text(tableTitle || "Table Export", 20, 10);
    autoTable(doc, {
      head: [tableHeaders],
      body: tableData,
    });

    doc.save(`${tableTitle || "table-export"}.pdf`);
  };

  // Excel Export Function
  const exportToExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(
      columns.map((col) => ({ label: col.label, visible: col.visible })),
    );
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Table Export");
    XLSX.writeFile(workbook, "table-export.xlsx");
  };
  // Inside GSTableControls
  const printData = () => {
    const printWindow = window.open("", "_blank");
    if (printWindow) {
      // Constructing the table header
      const tableHeader = `<tr>${columns
        .filter((col) => col.visible)
        .map((col) => `<th>${col.label}</th>`)
        .join("")}</tr>`;

      // Constructing the table rows, providing a fallback for currentItems
      const tableRows = (currentItems ?? [])
        .map((item) => {
          return `<tr>${columns
            .filter((col) => col.visible)
            .map((col) => `<td>${item[col.key]}</td>`)
            .join("")}</tr>`;
        })
        .join("");

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
            <h1>${tableTitle || "Table Data"}</h1>
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
  //  above logic is also correct but the later one is more feasible
  // const printData = () => {
  //   const printWindow = window.open("", "_blank");
  //   if (printWindow) {
  //     // Constructing the table header
  //     const tableHeader = `<tr>${columns
  //       .filter((col) => col.visible)
  //       .map((col) => `<th>${col.label}</th>`)
  //       .join("")}</tr>`;

  //     // Conditionally construct table rows only if currentItems is defined
  //     const tableRows = currentItems
  //       ? currentItems
  //           .map((item) => {
  //             return `<tr>${columns
  //               .filter((col) => col.visible)
  //               .map((col) => `<td>${item[col.key]}</td>`)
  //               .join("")}</tr>`;
  //           })
  //           .join("")
  //       : "";

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
      <div
        style={{display:"flex",gap:"16px"}} 
      >
        {!hideSearch && (
          <GSSearchField
            onChange={handleSearchChange}
            disableMargin
            sx={{minWidth:"155px"}}
            placeHolder={translate("Search")}
          />
        )}

        {tableTitle && (
         
          <Button
            onClick={handleButtonClick}
            variant="contained"
            color="primary"
            startIcon={<AddIcon />}
            sx={{ minWidth: "60%" }}
          >
            {tableTitle || translate("add_outlet")}
          </Button>
         
        )}
      </div>

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
        {renderFilterElement && (
          renderFilterElement
        )}
        {showPrint && <GSActionButton label={translate("print")} onClick={printData} />}
        {showExcel && (
          <GSActionButton label={translate("export_to_excel")} onClick={exportToExcel} />
        )}
        {showPdf && (
          <GSActionButton label={translate("export_to_pdf")} onClick={exportToPDF} />
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
    </div>
  );
};

export default GSTableControls;
