/**
 * @license
 *
 * SPDX-FileCopyrightText: Copyright © 2021 snek.at
 * SPDX-License-Identifier: EUPL-1.2
 *
 * Use of this source code is governed by an EUPL-1.2 license that can be found
 * in the LICENSE file at https://snek.at/license
 */
import styled, {css} from 'styled-components'

export const DropDown = styled.div`
  transition: 0.2s all;
  -webkit-transition: 0.2s all;
  background: purple;
  display: inline-block;
`

export const Image = styled.img`
  max-width: 100%;
  max-height: 100%;

  transition: 0.2s all;
  -webkit-transition: 0.2s all;

  object-fit: cover;

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
