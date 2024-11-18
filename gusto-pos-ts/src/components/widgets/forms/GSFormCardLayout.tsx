import React, { useState } from 'react';
import Grid from '@mui/material/Grid2';
import GSCard from '../cards/GSCard';
import Box from '@mui/material/Box';
import Switch from '@mui/material/Switch';
import Typography from '@mui/material/Typography';

interface FormLayoutProps {
  cardHeading: React.ReactNode;
  children: React.ReactNode;
  showSwitch?: boolean;
  heading?: React.ReactNode;
}

const FormLayout = ({ cardHeading, children, showSwitch = false }: FormLayoutProps) => {
  const [isOpen, setIsOpen] = useState(true);
  const childrenArray = React.Children.toArray(children);

  const childWithoutGrid = childrenArray.filter(
    (child: React.ReactNode) => React.isValidElement(child) && child.props?.withoutGrid,
  ) as React.ReactElement[];

  const childWithGrid = childrenArray.filter(
    (child: React.ReactNode) => React.isValidElement(child) && !child.props?.withoutGrid,
  ) as React.ReactElement[];

  const handleSwitchChange = () => {
    setIsOpen(!isOpen);
  };

  const cardHeadingWithSwitch = (
    <Box display="flex" justifyContent="space-between" alignItems="center" width="100%">
      <Typography variant="h6">{cardHeading}</Typography>
      {showSwitch && <Switch checked={isOpen} onChange={handleSwitchChange} color="primary" />}
    </Box>
  );

  return (
    <GSCard heading={cardHeadingWithSwitch}>
      {isOpen && (
        <Box p={2}>
          <Grid container spacing={2}>
            {childWithGrid.map((child, index) => (
              <Grid size={{ xs: 12, md: 6 }} key={index}>
                {child}
              </Grid>
            ))}
          </Grid>
          {childWithoutGrid}
        </Box>
      )}
    </GSCard>
  );
};

export default FormLayout;
