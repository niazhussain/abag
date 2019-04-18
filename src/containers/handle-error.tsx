import React from 'react';
import {
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
  Dialog,
} from '@material-ui/core';
import { Translation } from './translation';
import { IStore } from '../interfaces/store';
import { Dispatch, AnyAction, bindActionCreators } from 'redux';
import { LOAD_MARKET_ITEMS } from '../store/actions/market';
import { connect } from 'react-redux';

interface WithHandleErrorProps {
  open: boolean;
  refresh: typeof LOAD_MARKET_ITEMS;
  children?: React.ReactNode;
}

export const withHandleError = <P extends object>(
  Component: React.ComponentType<P>,
) => {
  function mapStateToProps(store: IStore, props: P) {
    return {
      ...(props as object),
      open: store.Market.hasError,
    };
  }

  function mapDispatchToProps(dispatch: Dispatch<AnyAction>) {
    return bindActionCreators(
      {
        refresh: LOAD_MARKET_ITEMS,
      },
      dispatch,
    );
  }

  return connect(
    mapStateToProps,
    mapDispatchToProps,
  )((props: P & WithHandleErrorProps) => {
    return (
      <React.Fragment>
        <Component {...props} />
        <Dialog open={props.open} onClose={props.refresh}>
          <DialogTitle>
            <Translation translateKey="error.title" />
          </DialogTitle>
          <DialogContent>
            <DialogContentText>
              <Translation translateKey="error.message" />
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={props.refresh} color="secondary" autoFocus={true}>
              <Translation translateKey="error.ok" />
            </Button>
          </DialogActions>
        </Dialog>
      </React.Fragment>
    );
  });
};
