import React, { useState } from 'react';
import {
  combineValidators,
  min,
  max,
  setValidationMessagesOnFirstError,
} from '../shared/validators';
import { IMarketItem } from '../interfaces/marketItem';
import { Translation } from './translation';
import { Select } from '../components/atoms/select';
import { Field } from '../components/atoms/field';
import { DoubleFieldArea } from '../components/atoms/double-field-area';
import { MenuItem } from '@material-ui/core';
import { TextField } from 'final-form-material-ui/src';
import { SubmitButton } from '../components/atoms/submit-button';
import { connect } from 'react-redux';
import { IStore } from '../interfaces/store';

export const Form = connect(mapStateToProps)((props) => {
  const [selectedValue, setSelectedValue] = useState(
    props.data[0] && props.data[0].MarketName,
  );

  const onChange = (value: string) => {
    setSelectedValue(value);
    props.form.mutators.setBaseRate(
      props.data.find((item: IMarketItem) => item.MarketName === value).Bid,
    );
    return value;
  };

  const currentItem = props.data.find(
    (item: IMarketItem) => item.MarketName === selectedValue,
  );

  const rateValidation = setValidationMessagesOnFirstError(
    {
      min: (
        <React.Fragment>
          <Translation translateKey="convertor.form.rate.min" />{' '}
          {currentItem.Low}
        </React.Fragment>
      ),
      max: (
        <React.Fragment>
          <Translation translateKey="convertor.form.rate.max" />{' '}
          {currentItem.High}
        </React.Fragment>
      ),
    },
    combineValidators([min(currentItem.Low), max(currentItem.High)]),
  );

  const countValidation = setValidationMessagesOnFirstError(
    {
      min: <Translation translateKey="convertor.form.count.min" />,
    },
    combineValidators([min(0, true)]),
  );

  return (
    <form onSubmit={props.handleSubmit}>
      <Field
        component={Select as any}
        defaultValue={selectedValue}
        name="marketName"
        parse={onChange}
      >
        {props.data.map((item: IMarketItem) => {
          return (
            <MenuItem value={item.MarketName} key={item.MarketName}>
              {item.MarketName}
            </MenuItem>
          );
        })}
      </Field>
      <DoubleFieldArea>
        <Field
          required={true}
          name="rate"
          id="rate"
          label={<Translation translateKey="convertor.form.rate.label" />}
          type="number"
          min="0"
          step="0.1"
          component={TextField}
          validate={rateValidation}
          defaultValue={currentItem.Bid}
        />
        <Field
          required={true}
          name="count"
          id="count"
          label={<Translation translateKey="convertor.form.count.label" />}
          type="number"
          min="0"
          component={TextField}
          defaultValue={1}
          step="0.1"
          validate={countValidation}
        />
      </DoubleFieldArea>
      <SubmitButton
        variant="contained"
        size="large"
        color="primary"
        type="submit"
        disabled={props.loading}
      >
        <Translation translateKey="convertor.convert" />
      </SubmitButton>
    </form>
  );
});

function mapStateToProps(store: IStore, props: any) {
  return {
    ...props,
    ...store.Market,
  };
}
