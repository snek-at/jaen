/**
 * @license
 *
 * SPDX-FileCopyrightText: Copyright © 2021 snek.at
 * SPDX-License-Identifier: EUPL-1.2
 *
 * Use of this source code is governed by an EUPL-1.2 license that can be found
 * in the LICENSE file at https://snek.at/license
 */
import styled from 'styled-components'

export const FilePreview = styled.div`
  position: fixed; /* Sit on top of the page content */
  display: ${(p: {visible: boolean}) =>
    p.visible ? 'block' : 'none'}; /* Hidden by default */
  width: 100%; /* Full width (cover the whole page) */
  height: 100%; /* Full height (cover the whole page) */
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5); /* Black background with opacity */
  //cursor: pointer; /* Add a pointer on hover */
  z-index: 99999;
  text-align: center;
  //line-height: 0;
`

export const Header = styled.div`
  position: relative;
  display: flex;
  /* cursor: pointer !important; */
  z-index: 999999;
  height: 5vh;
  background-color: black;
  /* float: right; */
  width: 100%;
  justify-content: flex-end;
  z-index: 2;
`

export const HeaderElement = styled.div`
  cursor: pointer;
  text-align: right;
  display: flex;
  color: white;
  align-items: center;
  font-size: 1rem;

  > * {
    margin-left: 20px;
  }

  margin-right: 50px;

  span {
    cursor: default;
  }
`

export const Content = styled.div`
  height: 100%;
  position: relative;
  z-index: 1;
  transition: transform 0.2s; /* Animation */
`

export const Image = styled.img`
  //width: calc(100vh * ${(p: {scale: number}) => p.scale});
  height: auto;
  margin: 0;
  position: absolute;
  top: calc(50% - 5vh);
  left: 50%;
  transform-origin: 0 0;
  -ms-transform: scale(${(p: {scale: number}) => p.scale}) translate(-50%, -50%);
  transform: scale(${(p: {scale: number}) => p.scale}) translate(-50%, -50%);
`
