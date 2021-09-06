import styled from '@emotion/styled'

export const JaenImageContainer = styled.span`
  &:hover {
    ${(props: {editable: boolean}) =>
      props.editable ? 'filter: brightness(70%); cursor: pointer;' : ''}
  }
`
