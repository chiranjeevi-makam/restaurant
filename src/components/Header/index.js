import './index.css'

import {Link, withRouter} from 'react-router-dom'

import Cookies from 'js-cookie'

import {AiOutlineShoppingCart} from 'react-icons/ai'

import CartContext from '../../context/cartContext'

const Header = props => {
  const onClickLogout = () => {
    const {history} = props

    Cookies.remove('jwt_token')
    history.replace('/login')
  }

  return (
    <CartContext.Consumer>
      {value => {
        const {cartList} = value
        return (
          <nav className="headerContainer ">
            <Link to="/" className="restaurantName">
              <h1 key="UNI Resto Cafe">UNI Resto Cafe</h1>
            </Link>

            <div className="cartAndName">
              <h1>My Orders</h1>
              <Link to="/cart" className="cartName">
                <h1>
                  <AiOutlineShoppingCart />{' '}
                  <span className="count">{cartList.length}</span>
                </h1>
              </Link>
              <button type="button" onClick={onClickLogout} className="logbtn">
                LogOut
              </button>
            </div>
          </nav>
        )
      }}
    </CartContext.Consumer>
  )
}

export default withRouter(Header)
