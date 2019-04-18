import { TableRow } from '../atoms/table-row';
import { IconButton } from '@material-ui/core';
import StarBorderIcon from '@material-ui/icons/StarBorderOutlined';
import StarIcon from '@material-ui/icons/StarOutlined';
import { IMarketItem } from '../../interfaces/marketItem';

interface TableItemProps {
  handleClick: () => void;
  children?: React.ReactNode;
}

export const TableItem = (props: TableItemProps & IMarketItem) => (
  <TableRow>
    {props.MarketName}
    {props.Bid}
    {props.Ask}
    <IconButton onClick={props.handleClick} color="primary">
      {props.favorite ? <StarIcon /> : <StarBorderIcon />}
    </IconButton>
  </TableRow>
);
