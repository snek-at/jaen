import styled, {css} from 'styled-components'

export const Pdf = styled.div`
  transition: 0.2s all;
  -webkit-transition: 0.2s all;

  ${(p: {editable: boolean}) =>
    p.editable &&
    css`
      &:hover {
        filter: brightness(70%);
        -webkit-filter: brightness(70%);

        cursor: pointer;
      }
    `};
`
