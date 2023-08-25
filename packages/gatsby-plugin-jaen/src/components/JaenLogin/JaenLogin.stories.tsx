import {ComponentMeta, Story} from '@storybook/react'
import React from 'react'
import {JaenLogin} from './JaenLogin'
export default {
  title: 'JaenLogin',
  component: JaenLogin,
  parameters: {
    layout: 'fullscreen'
  }
} as ComponentMeta<typeof JaenLogin>

type ComponentProps = React.ComponentProps<typeof JaenLogin>

export const WithBackground: Story<ComponentProps> = () => {
  return (
    <>
      <iframe
        id="frameiii"
        height="1000px"
        width="100%"
        src="https://snek-docs-git-photonq-jem-at.vercel.app"
      />
      <JaenLogin
        goBackPath="https://snek.at"
        signUpPath="/signup?source=login"
        forgotPasswordPath="/password_reset"
        onSignIn={async data => {
          alert(JSON.stringify(data))

          throw new Error('Invalid username or password')
        }}
      />
    </>
  )
}

export const WithoutBackgroud: Story<ComponentProps> = () => {
  return (
    <>
      <JaenLogin
        goBackPath="https://snek.at"
        signUpPath="/signup?source=login"
        forgotPasswordPath="/password_reset"
        onSignIn={async data => {
          alert(JSON.stringify(data))

          throw new Error('Invalid username or password')
        }}
      />
    </>
  )
}
