import React from 'react';
import styled from 'styled-components';
import { Select as FinalFormSelect } from 'final-form-material-ui/src';
import { FormControlProps } from '@material-ui/core/FormControl';

export const Select = styled(
  ({
    className,
    ...props
  }: {
    className: string;
    formControlProps: FormControlProps;
    label: string;
  }) => (
    <FinalFormSelect
      formControlProps={{ className, ...props.formControlProps }}
      {...props}
    />
  ),
)`
  width: 100%;
`;
