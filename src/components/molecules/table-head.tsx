import React from 'react';
import { TableHead as MaterialTableHead } from '@material-ui/core';
import { TableRow, TableRowProps } from '../atoms/table-row';

export const TableHead = (props: TableRowProps) => (
  <MaterialTableHead>
    <TableRow isHeader={true} {...props} />
  </MaterialTableHead>
);
