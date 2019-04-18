import { Field as FinalFormField } from 'react-final-form';
import { theme } from '../../theme';
import styled from 'styled-components';

export const Field = styled(FinalFormField)`
  margin: ${theme.spacing.unit}px 0 !important;
`;
