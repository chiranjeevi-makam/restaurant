import './index.css'

import {Component} from 'react'

import {Link} from 'react-router-dom'

import Cookies from 'js-cookie'

import {AiOutlineShoppingCart} from 'react-icons/ai'

import CartContext from '../../context/CartContext'

class Header extends Component {
  state = {cafeName: ''}

  componentDidMount() {
    this.getDetails1()
  }

  getDetails1 = async () => {
    const url = 'https://run.mocky.io/v3/77a7e71b-804a-4fbd-822c-3e365d3482cc'

    const position = {
      method: 'GET',
      headers: {
        Authorization:
          'Bearer 04e1354175f2f641a3943387d4203e1591c9ae05126da0ef1f454084e2a23477',
      },
    }

    const response = await fetch(url, position)
    const data = await response.json()

    const array = data.map(each1 => ({
      restaurantName: each1.restaurant_name,
    }))

    const totalDetails = array[0]

    const {restaurantName} = totalDetails
    this.setState({cafeName: restaurantName})
  }

  onClickLogout = () => {
    const {history} = this.props

    Cookies.remove('jwt_token')
    history.replace('/login')
  }

  render() {
    const {cafeName} = this.state
    return (
      <CartContext.Consumer>
        {value => {
          const {cartList} = value
          return (
            <nav className="headerContainer ">
              <Link to="/" className="restaurantName">
                <h1 key={cafeName}>{cafeName}</h1>
              </Link>

              <div className="cartAndName">
                <p>My Orders</p>
                <Link to="/cart" className="cartName">
                  <h1>
                    <AiOutlineShoppingCart />{' '}
                    <span className="count">{cartList.length}</span>
                  </h1>
                </Link>
                <button
                  type="button"
                  onClick={this.onClickLogout}
                  className="logbtn"
                >
                  LogOut
                </button>
              </div>
            </nav>
          )
        }}
      </CartContext.Consumer>
    )
  }
}

export default Header
