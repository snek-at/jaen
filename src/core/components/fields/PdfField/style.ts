import styled, {css} from 'styled-components'

export const DropDown = styled.div`
  transition: 0.2s all;
  -webkit-transition: 0.2s all;
  background: purple;
  display: inline-block;
`

export const PdfViewer = styled.div`
  height: 90vh;
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
