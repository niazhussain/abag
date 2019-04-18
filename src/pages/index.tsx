import React, { useState, Dispatch, SetStateAction } from 'react';
import { Layout } from '../components/templates/layout';
import { Buttons } from '../containers/buttons';
import { Translation } from '../containers/translation';
import { Snackbar } from '@material-ui/core';
import { Form as FinalForm } from 'react-final-form';

import { combineHooks } from '../shared/initial-hooks/combine-hooks';
import { loadMarketItems } from '../shared/initial-hooks/load-market-items';
import { loadTranslation } from '../shared/initial-hooks/load-translation';
import { ActionHeader } from '../components/oraginthms/action-header';
import { Paper } from '../components/atoms/paper';
import { Form } from '../containers/form';
import { withHandleError } from '../containers/handle-error';
import { LOAD_MARKET_ITEMS } from '../store/actions/market';
import { IMarketStore } from '../interfaces/marketStore';

const snackbarPosition = { vertical: 'top', horizontal: 'center' };

interface FormState {
  count?: number;
  rate?: number;
  marketName?: string;
}

interface CurrencyProps {
  refresh: typeof LOAD_MARKET_ITEMS;
  children?: React.ReactNode;
}

const Currency = withHandleError((props: CurrencyProps & IMarketStore) => {
  const mutators = {
    setBaseRate: ([value], state, { changeValue }) => {
      return changeValue(state, 'rate', () => value);
    },
  };

  const [submitFormData, setSubmitFormData]: [
    FormState,
    Dispatch<SetStateAction<FormState>>
  ] = useState({});
  const [open, setOpen] = useState(false);

  const onSubmit = (values: FormState) => {
    setOpen(true);
    setSubmitFormData(values);
  };

  return (
    <Layout title={<Translation translateKey="title" />} buttons={Buttons}>
      <Paper>
        <ActionHeader
          title={<Translation translateKey="convertor.title" />}
          loading={props.loading}
          refresh={props.refresh}
        />
        <FinalForm
          mutators={mutators}
          onSubmit={onSubmit}
          component={Form}
          validateOnBlur={true}
        />
        <Snackbar
          anchorOrigin={snackbarPosition as any}
          open={open}
          autoHideDuration={6000}
          message={
            !!Object.keys(submitFormData).length && (
              <span>
                <Translation translateKey="convertor.success" />{' '}
                {(submitFormData.count / submitFormData.rate).toFixed(2)}
                {submitFormData.marketName.split('-')[1]}
              </span>
            )
          }
        />
      </Paper>
    </Layout>
  );
});

Currency.getInitialProps = combineHooks([loadMarketItems, loadTranslation]);

export default Currency;
