import React from "react";
import Grid from '@mui/material/Grid2';
import GSCard from "../cards/GSCard";
import Box from '@mui/material/Box';

interface FormLayoutProps {
  cardHeading: string;
  children: React.ReactNode | React.ReactNode[];
}

const FormLayout = ({ cardHeading,children}) => {
  const childrenArray = React.Children.toArray(children);

  // Filter children based on the 'withoutGrid' prop
  const childWithoutGrid = childrenArray.filter((child: React.ReactNode) => 
    React.isValidElement(child) && child.props?.withoutGrid
  ) as React.ReactElement[];

  const childWithGrid = childrenArray.filter((child: React.ReactNode) => 
    React.isValidElement(child) && !child.props?.withoutGrid
  ) as React.ReactElement[];

  return (
    <GSCard heading={cardHeading}>
      <Box p={2}>
        <Grid container spacing={2}>
          {childWithGrid.map((child, index) => (
            <Grid size={{ xs: 12, md: 6 }} key={index}>
              {child}
            </Grid>
          ))}
        </Grid>
        {childWithoutGrid.map((child, index) => (
          <React.Fragment key={index}>{child}</React.Fragment>
        ))}
      </Box>
    </GSCard>
  );
};

export default FormLayout;
