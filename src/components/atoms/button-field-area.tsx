import styled from 'styled-components';
import { theme } from '../../theme';

export const ButtonFieldArea = styled.div`
  display: flex;
  justify-content: space-around;
  button {
    margin: ${theme.spacing.unit}px 0 ${theme.spacing.unit}px
      ${theme.spacing.unit}px;
    min-width: 148px;
  }
`;
