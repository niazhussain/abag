import React from 'react';
import { Layout } from '../components/templates/layout';
import { Buttons } from '../containers/buttons';
import { Translation } from '../containers/translation';
import {
  LOAD_MARKET_ITEMS,
  SET_FAVORITE,
  SET_SORTING,
} from '../store/actions/market';
import { Table, TableBody } from '@material-ui/core';
import { IMarketItem } from '../interfaces/marketItem';
import { connect } from 'react-redux';
import { IMarketStore } from '../interfaces/marketStore';
import { Dispatch, bindActionCreators } from 'redux';
import { loadMarketItems } from '../shared/initial-hooks/load-market-items';
import { IStore } from '../interfaces/store';
import { combineHooks } from '../shared/initial-hooks/combine-hooks';
import { loadTranslation } from '../shared/initial-hooks/load-translation';
import { ActionHeader } from '../components/oraginthms/action-header';
import { TableHead } from '../components/molecules/table-head';
import { withHandleError } from '../containers/handle-error';
import { sortedMarketData } from '../selectors/sorted-market-data';
import { TableItem } from '../components/molecules/table-item';

interface RatesProps {
  refresh: typeof LOAD_MARKET_ITEMS;
  setFavorite: typeof SET_FAVORITE;
  setSorting: typeof SET_SORTING;
  children?: React.ReactNode;
}

const Rates = withHandleError((props: IMarketStore & RatesProps) => {
  return (
    <Layout title={<Translation translateKey="title" />} buttons={Buttons}>
      <ActionHeader
        title={<Translation translateKey="rates.title" />}
        loading={props.loading}
        refresh={props.refresh}
      />
      <Table>
        <TableHead
          sortTitle={<Translation translateKey="rates.sort" />}
          order={props.sorting.order}
          orderBy={props.sorting.orderBy}
          cellsContent={[
            {
              name: 'name',
              handleClick: () => props.setSorting('name'),
              text: <Translation translateKey="rates.table.name" />,
            },
            {
              name: 'Bid',
              handleClick: () => props.setSorting('Bid'),
              text: <Translation translateKey="rates.table.bid" />,
            },
            {
              name: 'Ask',
              handleClick: () => props.setSorting('Ask'),
              text: <Translation translateKey="rates.table.ask" />,
            },
            {
              name: 'favorites',
              handleClick: () => props.setSorting('favorites'),
              text: <Translation translateKey="rates.table.favorites" />,
            },
          ]}
        />
        <TableBody>
          {props.data.map((item: IMarketItem) => {
            const handleClick = () =>
              props.setFavorite(item.MarketName, !item.favorite);

            return (
              <TableItem
                key={item.MarketName}
                handleClick={handleClick}
                {...item}
              />
            );
          })}
        </TableBody>
      </Table>
    </Layout>
  );
});

Rates.getInitialProps = combineHooks([loadMarketItems, loadTranslation]);

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Rates);

function mapStateToProps(store: IStore) {
  return {
    ...store.Market,
    data: sortedMarketData(store),
  };
}

function mapDispatchToProps(dispatch: Dispatch) {
  return bindActionCreators(
    {
      refresh: LOAD_MARKET_ITEMS,
      setFavorite: SET_FAVORITE,
      setSorting: SET_SORTING,
    },
    dispatch,
  );
}
