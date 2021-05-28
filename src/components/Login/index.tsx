import {MDBContainer, MDBRow, MDBCol, MDBBtn, MDBInput} from 'mdb-react-ui-kit'
import React, {useState} from 'react'

interface LoginFormProps {
  onSubmit: (username: string, password: string) => void
}

const LoginForm: React.FC<LoginFormProps> = props => {
  const [username, setUsername] = useState('snekman')
  const [password, setPassword] = useState('')

  const {onSubmit} = props

  return (
    <MDBContainer>
      <MDBRow>
        <MDBCol md="6">
          <form>
            <p className="h5 text-center mb-4">Log in</p>
            <div className="grey-text">
              <MDBInput
                label="Type your username"
                icon="envelope"
                type="username"
                error="wrong"
                success="right"
                value={username}
                onChange={(e: React.FormEvent<HTMLInputElement>) =>
                  setUsername(e.currentTarget.value)
                }
              />
              <MDBInput
                label="Type your password"
                icon="lock"
                type="password"
                value={password}
                onChange={(e: React.FormEvent<HTMLInputElement>) =>
                  setPassword(e.currentTarget.value)
                }
              />
            </div>
            <div className="text-center">
              <MDBBtn onClick={() => onSubmit(username, password)}>
                Login
              </MDBBtn>
            </div>
          </form>
        </MDBCol>
      </MDBRow>
    </MDBContainer>
  )
}

export default LoginForm
