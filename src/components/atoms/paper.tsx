import { Paper as MaterialPaper } from '@material-ui/core';
import styled from 'styled-components';
import { theme } from '../../theme';

export const Paper = styled(MaterialPaper)`
  max-width: 640px;
  margin: 0 auto;
  padding: ${theme.spacing.unit * 2}px ${theme.spacing.unit * 4}px;
`;
