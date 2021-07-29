import React from 'react'
import { useSelector } from 'react-redux'
import LoginForm from './LoginForm'

const Login = () => {
  const user = useSelector(state => state.loggedUser)

  return (
    !user
      ? <LoginForm />
      : ''
  )
}

export default Login