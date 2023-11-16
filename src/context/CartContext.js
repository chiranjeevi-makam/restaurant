import React from 'react'

const CartContext = React.createContext({
  cartList: [],
  cafeName: '',
  removeAllCartItems: () => {},
  addCartItem: () => {},
  removeCartItem: () => {},
  incrementCartItemQuantity: () => {},
  decrementCartItemQuantity: () => {},
  changeCafeName: () => {},
})

export default CartContext
