import React from 'react';
import { Typography, Button } from '@material-ui/core';
import { ActionsArea } from '../atoms/actions-area';
import RefreshIcon from '@material-ui/icons/RefreshOutlined';

export const ActionHeader = (props: {
  refresh: () => any;
  loading: boolean;
  title: React.ReactElement;
}) => (
  <ActionsArea>
    <Typography variant="h2">{props.title}</Typography>
    <Button
      onClick={props.refresh}
      color="primary"
      variant="fab"
      disabled={props.loading}
    >
      <RefreshIcon />
    </Button>
  </ActionsArea>
);
