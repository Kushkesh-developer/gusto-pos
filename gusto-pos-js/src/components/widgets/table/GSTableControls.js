import React from 'react';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import AddIcon from '@mui/icons-material/Add';
import PrintIcon from '@mui/icons-material/Print';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import Excel from '@/public/excel.svg';
import Grid from '@mui/material/Grid2';
import { MenuItem, ListItemText, Menu, Box } from '@mui/material';
import GSSearchField from '@/components/widgets/inputs/GSSearchField';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import GSSwitchButton from '@/components/widgets/switch/GSSwitchButton';

import { useLocalization } from '@/context/LocalizationProvider';
import { useTheme } from '@mui/material';
import * as XLSX from 'xlsx';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import autoTable from 'jspdf-autotable';





















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
  customButtonAction
}) => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => setAnchorEl(null);
  const { translate } = useLocalization();
  const theme = useTheme();

  const toggleColumnVisibility = (key) => {
    const item = columns.find((column) => column.key === key);
    if (item) {
      item.visible = !item.visible;
      setColumnsVisibility?.([...columns]);
    }
  };

  const handleSearchChange = (value) => {
    setSearchQuery?.(value.toLowerCase());
  };

  const excludeActionColumn = (columns, data) => {
    const filteredColumns = columns.filter((col) => col.key !== 'action');
    const filteredData = data.map((item) =>
    filteredColumns.map((col) => item[col.key] === undefined ? '' : item[col.key])
    );
    return { filteredColumns, filteredData };
  };

  const PrintData = () => {
    try {
      const { filteredColumns, filteredData } = excludeActionColumn(columns, currentItems || []);

      // Create HTML content
      const htmlContent = `
        <!DOCTYPE html>
        <html>
          <head>
            <title>${tableTitle || 'Print Table'}</title>
            <style>
              table { border-collapse: collapse; width: 100%; }
              th, td { border: 1px solid #ddd; padding: 8px; text-align: left; }
              th { background-color: #f2f2f2; }
              h2 { margin-bottom: 20px; }
            </style>
          </head>
          <body>
            <h2>${tableTitle || 'Table Export'}</h2>
            <table>
              <thead>
                <tr>
                  ${filteredColumns.map((col) => `<th>${col.label}</th>`).join('')}
                </tr>
              </thead>
              <tbody>
                ${filteredData.
      map(
        (row) =>
        `<tr>${row.
        map((cell) => `<td>${cell !== null ? String(cell) : ''}</td>`).
        join('')}</tr>`
      ).
      join('')}
              </tbody>
            </table>
          </body>
        </html>
      `;

      // Create Blob and URL
      const blob = new Blob([htmlContent], { type: 'text/html' });
      const blobUrl = URL.createObjectURL(blob);

      // Create and append iframe
      const printFrame = document.createElement('iframe');
      printFrame.style.position = 'fixed';
      printFrame.style.right = '0';
      printFrame.style.bottom = '0';
      printFrame.style.width = '0';
      printFrame.style.height = '0';
      printFrame.style.border = 'none';

      document.body.appendChild(printFrame);

      // Load content and print
      printFrame.onload = () => {
        setTimeout(() => {
          if (printFrame.contentWindow) {
            printFrame.contentWindow.print();
          }

          // Cleanup after print dialog closes
          setTimeout(() => {
            document.body.removeChild(printFrame);
            URL.revokeObjectURL(blobUrl);
          }, 1000);
        }, 100);
      };

      printFrame.src = blobUrl;
    } catch (error) {
      console.error('Print failed:', error);
      alert('Failed to print. Please try again.');
    }
  };

  const exportToPDF = () => {
    const { filteredColumns, filteredData } = excludeActionColumn(columns, currentItems || []);
    const doc = new jsPDF();
    const tableHeaders = filteredColumns.map((col) => col.label);

    doc.text(tableTitle || 'Table Export', 20, 10);
    autoTable(doc, {
      head: [tableHeaders],
      body: filteredData
    });
    doc.save(`${tableTitle || 'table-export'}.pdf`);
  };

  const exportToExcel = () => {
    if (!currentItems || currentItems.length === 0) {
      alert('No data available for export');
      return;
    }

    const { filteredColumns, filteredData } = excludeActionColumn(columns, currentItems);
    const tableHeaders = filteredColumns.map((col) => col.label);
    const worksheet = XLSX.utils.aoa_to_sheet([tableHeaders, ...filteredData]);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Table Export');
    XLSX.writeFile(workbook, 'table-export.xlsx');
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: { xs: 'column', md: 'row' },
        justifyContent: 'space-between',
        marginBottom: '20px',
        width: '100%',
        gap: { xs: '16px', md: '16px' }
      }}>

      <Box sx={{ display: 'flex', flexDirection: 'row', gap: '16px' }}>
        {!hideSearch &&
        <GSSearchField
          onChange={handleSearchChange}
          disableMargin
          placeHolder={translate('search')} />

        }

        {tableTitle &&
        <Button
          onClick={() => href ? window.location.href = href : customButtonAction?.()}
          variant="contained"
          color="primary"
          startIcon={<AddIcon />}
          sx={{
            height: '44px',
            whiteSpace: 'nowrap',
            minWidth: 'fit-content'
          }}>

            {tableTitle || translate('add_outlet')}
          </Button>
        }
      </Box>

      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          gap: '16px',
          alignItems: 'center'
        }}>

        <Grid
          container
          spacing={2}
          sx={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: { xs: 'flex-start', md: 'flex-end' }
          }}>

          {renderFilterElement}
          {showPrint &&
          <Button onClick={PrintData} variant="outlined" sx={{ padding: '7px', minWidth: 0 }}>
              <PrintIcon />
            </Button>
          }
          {showExcel &&
          <Button onClick={exportToExcel} variant="outlined" sx={{ padding: '7px', minWidth: 0 }}>
              <Excel width={24} height={24} fill={theme.palette.primary.main} />
            </Button>
          }
          {showPdf &&
          <Button onClick={exportToPDF} variant="outlined" sx={{ padding: '7px', minWidth: 0 }}>
              <PictureAsPdfIcon />
            </Button>
          }
          {showFilter &&
          <Button
            id="basic-button"
            aria-controls={open ? 'basic-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
            onClick={handleClick}
            variant="outlined"
            startIcon={<FilterAltIcon />}
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              minWidth: 0,
              width: '40px',
              padding: '7px',
              '& .MuiButton-startIcon': {
                marginRight: 0,
                marginLeft: 0
              }
            }} />

          }
          <Menu id="basic-menu" anchorEl={anchorEl} open={open} onClose={handleClose}>
            {columns.map((column) =>
            <MenuItem
              key={column.key}
              sx={{
                height: '26px',
                cursor: 'pointer',
                '&:hover': {
                  backgroundColor: 'action.hover'
                },
                paddingLeft: '0px'
              }}
              onClick={() => toggleColumnVisibility(column.key)}>

                {['Show on Web', 'Show on POS'].includes(column.key) ?
              <GSSwitchButton
                checked={column.visible}
                onChange={(e) => {
                  e.stopPropagation(); // Prevent MenuItem onClick from firing
                  toggleColumnVisibility(column.key);
                }}
                label={column.label} /> :


              <>
                    <Checkbox
                  checked={column.visible}
                  onChange={(e) => {
                    e.stopPropagation(); // Prevent MenuItem onClick from firing
                    toggleColumnVisibility(column.key);
                  }}
                  onClick={(e) => e.stopPropagation()} // Prevent MenuItem onClick from firing
                />
                    <ListItemText sx={{ fontSize: '12px' }} primary={column.label} />
                  </>
              }
              </MenuItem>
            )}
          </Menu>
        </Grid>
      </Box>
    </Box>);

};

export default GSTableControls;