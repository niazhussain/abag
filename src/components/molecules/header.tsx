import { AppBar, Typography, Toolbar } from '@material-ui/core';
import styled from 'styled-components';

const CustomToolbar = styled(Toolbar)`
  justify-content: space-between;
`;

export const Header = (props: {
  text: React.ReactNode;
  children: React.ReactNodeArray | React.ReactNode;
}) => {
  return (
    <AppBar>
      <CustomToolbar variant="dense">
        <Typography color="inherit" variant="h6">
          {props.text}
        </Typography>
        <div>{props.children}</div>
      </CustomToolbar>
    </AppBar>
  );
};
