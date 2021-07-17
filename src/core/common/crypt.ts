/**
 * @license
 *
 * SPDX-FileCopyrightText: Copyright © 2021 snek.at
 * SPDX-License-Identifier: EUPL-1.2
 *
 * Use of this source code is governed by an EUPL-1.2 license that can be found
 * in the LICENSE file at https://snek.at/license
 */
import CryptoJS from 'crypto-js'

const encrypt = <T>(plaintext: T, key: string): string => {
  const ciphertext = CryptoJS.AES.encrypt(
    JSON.stringify(plaintext),
    key
  ).toString()

  return ciphertext
}

const decrypt = <T>(ciphertext: string, key: string): T => {
  const bytes = CryptoJS.AES.decrypt(ciphertext, key)
  const plaintext = bytes.toString(CryptoJS.enc.Utf8)

  const parsed = JSON.parse(plaintext) as T

  return parsed
}

export {encrypt, decrypt}
