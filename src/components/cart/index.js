import Header from '../Header'
import CartContex from '../../context/cartContext'
import './index.css'

const Cart = () => (
  <CartContex.Consumer>
    {value => {
      const {
        cartList,
        removeAllCartItems,
        removeCartItem,
        incrementCartItemQuantity,
        decrementCartItemQuantity,
      } = value
      console.log(cartList)
      return (
        <div className="cartContainer">
          <Header />
          {cartList.length === 0 ? (
            <div className="empty">
              <img
                src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-empty-cart-img.png"
                alt="Empty Cart"
              />{' '}
            </div>
          ) : (
            <button type="button" onClick={removeAllCartItems}>
              Remove All
            </button>
          )}
          <ul className="unorderList">
            {cartList.map(item => (
              <li className="list_show">
                <div>
                  <img
                    src={item.dishImage}
                    alt={item.dishName}
                    className="cartImageSize"
                  />
                  <p>{item.dishName}</p>
                </div>
                <div className="cartButtons">
                  <button
                    type="button"
                    className="btncart"
                    onClick={() => {
                      incrementCartItemQuantity(item.dishId)
                    }}
                  >
                    +
                  </button>
                  <p>{item.quantity}</p>
                  <button
                    type="button"
                    className="btncart"
                    onClick={() => {
                      decrementCartItemQuantity(item.dishId)
                    }}
                  >
                    -
                  </button>
                </div>
                <button
                  type="button"
                  className="crossMark"
                  onClick={() => {
                    removeCartItem(item.dishId)
                  }}
                >
                  X
                </button>
              </li>
            ))}
          </ul>
        </div>
      )
    }}
  </CartContex.Consumer>
)

export default Cart
