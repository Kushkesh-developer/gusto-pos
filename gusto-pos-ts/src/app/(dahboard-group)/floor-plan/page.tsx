"use client"; 
import React, { useState } from 'react';
import { Box,  Paper, Select, MenuItem, Typography } from '@mui/material';
import Grid from "@mui/material/Grid2";
import Draggable from 'react-draggable';
import { SelectChangeEvent } from '@mui/material/Select';
import CustomButton from "@/components/widgets/buttons/GSCustomButton";
interface Table {
  id: number;
  shape: 'square' | 'circle'; // either 'square' or 'circle'
  label: string;
  seats: number; // Number of seats per table
}

const FloorPlan: React.FC = () => {
  const [tables, setTables] = useState<Table[]>([]);
  const [selectedFloor, setSelectedFloor] = useState<number | null>(1); // Track the selected floor

  // Function to add a new table
  const addTable = (shape: 'square' | 'circle') => {
    const seats = shape === 'square' ? 4 : 2; // Set seats based on shape
    const newTable: Table = {
      id: tables.length + 1,
      shape,
      label: shape === 'square' ? `S${tables.length + 1}` : `C${tables.length + 1}`,
      seats, // Assign seats based on shape
    };
    setTables([...tables, newTable]);
  };

  // Handle floor selection
  const handleFloorChange = (event: SelectChangeEvent<unknown>) => {
    setSelectedFloor(event.target.value as number);
  };

  // Calculate total number of seats for each type
  const totalSeaters = tables.reduce(
    (acc, table) => {
      if (table.seats === 4) acc.fourSeater += 1;
      if (table.seats === 2) acc.twoSeater += 1;
      return acc;
    },
    { fourSeater: 0, twoSeater: 0 }
  );

  return (
    <Box sx={{ padding: '20px',width:"90%" }} >
      {/* Header */}
      <Grid container justifyContent="space-between" alignItems="center" sx={{ mb: 2 }}>
        <Typography variant="h5">Floor Plan</Typography>
        <CustomButton variant="contained" type="submit">
          Save
        </CustomButton>
      </Grid>

      <Grid container spacing={2} sx={{display: 'flex',justifyContent: 'space-between'}}>
        {/* Left Panel */}
        <Grid size={{ xs: 3 }}>
          <Paper elevation={3} sx={{ padding: 2 }}>
            {/* Floor Selector */}
            <Select fullWidth value={selectedFloor} onChange={handleFloorChange}>
              <MenuItem value={1}>Select Floor</MenuItem>
              <MenuItem value={2}>Floor 1</MenuItem>
              <MenuItem value={3}>Floor 2</MenuItem>
            </Select>

            {/* Selected Floor Information */}
            {selectedFloor && (
              <Paper elevation={1} sx={{ padding: 1, marginTop: 2 }}>
                <Typography variant="body2">Selected Floor: Floor {selectedFloor}</Typography>
              </Paper>
            )}

            {/* Stats */}
            <Box mt={2}>
              <Typography variant="body1">Total Table: {tables.length}</Typography>
              <Typography variant="body2">4 Seater: {totalSeaters.fourSeater}</Typography>
              <Typography variant="body2">2 Seater: {totalSeaters.twoSeater}</Typography>
              <Typography variant="body2">Total Chair: {totalSeaters.fourSeater * 4 + totalSeaters.twoSeater * 2}</Typography>
            </Box>

            {/* Add Table Section */}
            <Box mt={4} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'start' ,gap:'3px'}}>
              <Typography variant="h6">Add Table</Typography>
              <Grid container spacing={2}>
                <Grid size={{ xs: 6 }}>
                  <Paper
                    onClick={() => addTable('square')}
                    variant="outlined"
                    sx={{
                      width: 80,
                      height: 80,
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                      cursor: 'pointer',
                    }}
                  >
                    <Typography variant="h3">□</Typography>
                   
                  </Paper>
                  <Typography variant="h6">chair</Typography>
                </Grid>
                <Grid size={{ xs: 6 }}>
                  <Paper
                    onClick={() => addTable('circle')}
                    variant="outlined"
                    sx={{
                      width: 80,
                      height: 80,
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                      cursor: 'pointer',
                    }}
                  >
                    <Typography variant="h3">○</Typography>
                   
                  </Paper>
                  <Typography variant="h6">Table</Typography>
                </Grid>
              </Grid>
            </Box>
          </Paper>
        </Grid>

        {/* Floor Plan Layout */}
        <Grid size={{ xs: 9 }}>
          <Paper elevation={3} sx={{ padding: 2, minHeight: 400, position: 'relative',height:'100vh' }}>
            {/* Tables Layout */}
            <Grid container spacing={2}>
              {tables.map((table) => (
                <Grid size={{ xs: 3 }} key={table.id}>
                  <Draggable>
                    <Paper
                      variant="outlined"
                      sx={{
                        width: table.shape === 'circle' ? 120 : 60,
                        height: table.shape === 'circle' ? 120 : 60,
                        borderRadius: table.shape === 'circle' ? '50%' : '0%',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        cursor: 'move',
                        position: 'absolute',
                      }}
                    >
                      <Typography>{table.label}</Typography>
                    </Paper>
                  </Draggable>
                </Grid>
              ))}
            </Grid>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default FloorPlan;
