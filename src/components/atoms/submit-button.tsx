import styled from 'styled-components';
import { Button } from '@material-ui/core';
import { theme } from '../../theme';

export const SubmitButton = styled(Button)`
  width: 100%;
  margin-top: ${theme.spacing.unit * 3}px !important;
`;
