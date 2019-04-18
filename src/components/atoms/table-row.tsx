import React from 'react';
import {
  TableCell,
  TableRow as MaterialTableRow,
  Tooltip,
  TableSortLabel,
} from '@material-ui/core';

export interface TableRowProps {
  children?: React.ReactNode;
  isHeader?: boolean;
  sortTitle?: React.ReactElement;
  orderBy?: string;
  order?: 'desc' | 'asc';
  cellsContent?: CellContent[];
}

export interface CellContent {
  name: string;
  handleClick: () => void;
  text: React.ReactElement;
}

export const TableRow = (props: TableRowProps) => {
  const renderHeaderRow = () =>
    props.cellsContent.map((cellContent: CellContent, index) => (
      <TableCell key={index}>
        <Tooltip title={props.sortTitle} placement="bottom" enterDelay={300}>
          <TableSortLabel
            active={props.orderBy === cellContent.name}
            direction={props.order}
            onClick={cellContent.handleClick}
          >
            {cellContent.text}
          </TableSortLabel>
        </Tooltip>
      </TableCell>
    ));

  return (
    <MaterialTableRow>
      {props.isHeader
        ? renderHeaderRow()
        : React.Children.map(props.children, (cellContent, index) => (
            <TableCell key={index}>{cellContent}</TableCell>
          ))}
    </MaterialTableRow>
  );
};
