import './index.css'

import {Component} from 'react'

import {Redirect} from 'react-router-dom'

import Cookies from 'js-cookie'

class Login extends Component {
  state = {username: '', password: '', message: ''}

  updateName = event => {
    this.setState({username: event.target.value})
  }

  updatePassword = event => {
    this.setState({password: event.target.value})
  }

  success = jwtToken => {
    const {history} = this.props

    history.replace('/')

    Cookies.set('jwt_token', jwtToken, {expires: 10})
  }

  fail = e => {
    this.setState({message: e})
  }

  submitForm = async event => {
    event.preventDefault()

    const {username, password} = this.state

    const details = {
      username,
      password,
    }

    const url = 'https://apis.ccbp.in/login'

    const position = {
      method: 'POST',
      body: JSON.stringify(details),
    }

    const response = await fetch(url, position)
    const data = await response.json()
    console.log(data)
    if (response.ok) {
      this.success(data.jwt_token)
    } else {
      this.fail(data.error_msg)
    }
  }

  render() {
    const {username, password, message} = this.state
    console.log(username)
    console.log(password)

    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken !== undefined) {
      return <Redirect to="/" />
    }

    return (
      <div className="loginContainer">
        <form className="formContainer" onSubmit={this.submitForm}>
          <h1 className="cafeName">UNI Resto Cafe</h1>
          <div>
            <label htmlFor="username">USERNAME</label>
            <br />

            <input
              type="text"
              className="inputElememt"
              id="username"
              onChange={this.updateName}
              placeholder="rahul"
            />
          </div>
          <br />
          <div>
            <label htmlFor="userpassword" className="labelElememt">
              PASSWORD
            </label>
            <br />

            <input
              type="password"
              className="inputElememt"
              id="userpassword"
              onChange={this.updatePassword}
              placeholder="rahul@2021"
            />
          </div>

          <p className="error">{message}</p>

          <div className="loginButton">
            <button className="btn" type="submit">
              Login
            </button>
          </div>
        </form>
      </div>
    )
  }
}

export default Login
