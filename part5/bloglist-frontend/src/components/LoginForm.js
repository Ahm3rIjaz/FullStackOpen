import React from 'react'

const LoginForm = ({
  username,
  password,
  handleUsernameChange,
  handlePasswordChange,
  handleLogin,
}) => {
  return (
    <div>
      <h2>Log in to application</h2>
      <form onSubmit={handleLogin}>
        username <input id="username" type="text" value={username} name='Username' onChange={handleUsernameChange}/><br/>
        password <input id="password" type="password" value={password} name='Password' onChange={handlePasswordChange}/><br/>
        <button id="login-button" type="submit">login</button>
      </form>
    </div>
  )
}

export default LoginForm