import React, { useState } from 'react';
import Grid from '@mui/material/Grid2';
import GSCard from '@/components/widgets/cards/GSCard';
import Box from '@mui/material/Box';
import Switch from '@mui/material/Switch';
import Typography from '@mui/material/Typography';








const FormLayout = ({ cardHeading, children, showSwitch = false }) => {
  const [isOpen, setIsOpen] = useState(true);
  const childrenArray = React.Children.toArray(children);

  // Separate CircularImage with priority
  const priorityImage = childrenArray.find(
    (child) => React.isValidElement(child) && child.props?.priority === true
  );

  // Filter children without grid, excluding the priority image
  const childWithoutGrid = childrenArray.filter(
    (child) =>
    React.isValidElement(child) && (child.props?.withoutGrid || child.props?.priority)
  );

  // Filter grid children, excluding the priority image
  const childWithGrid = childrenArray.filter(
    (child) =>
    React.isValidElement(child) && !child.props?.withoutGrid && !child.props?.priority
  );

  const handleSwitchChange = () => {
    setIsOpen(!isOpen);
  };

  const cardHeadingWithSwitch =
  <Box display="flex" justifyContent="space-between" alignItems="center" width="100%">
      <Typography variant="h6">{cardHeading}</Typography>
      {showSwitch && <Switch checked={isOpen} onChange={handleSwitchChange} color="primary" />}
    </Box>;


  return (
    <GSCard heading={cardHeadingWithSwitch}>
      {isOpen &&
      <Box p={2}>
          {/* Render priority image first if exists */}
          {priorityImage &&
        <Box display="flex" mb={2}>
              {priorityImage}
            </Box>
        }

          {/* Grid components */}
          <Grid container spacing={2}>
            {childWithGrid.map((child, index) =>
          <Grid size={{ xs: 12, md: 6 }} key={index}>
                {child}
              </Grid>
          )}
          </Grid>
          {/* Other withoutGrid components */}
          {childWithoutGrid.length > 0 &&
        <Box mb={2}>{childWithoutGrid.filter((child) => !child.props?.priority)}</Box>
        }
        </Box>
      }
    </GSCard>);

};

export default FormLayout;