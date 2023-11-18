import {Component} from 'react'
import {Switch, BrowserRouter, Redirect, Route} from 'react-router-dom'
import Home from './components/Home'
import Login from './components/Login'
import CartContext from './context/CartContext'
import Cart from './components/Cart'
import ProtectedRoute from './components/ProtectedRoute'
import NotFound from './components/NotFound'

class App extends Component {
  state = {
    cartList: [],
    cafeName: '',
  }

  changeCafeName = word => {
    this.setState({cafeName: word})
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

  removeAllCartItems = () => {
    this.setState({cartList: []})
  }

  incrementCartItemQuantity = dishId => {
    this.setState(prevState => ({
      cartList: prevState.cartList.map(eachCartItem => {
        if (dishId === eachCartItem.dishId) {
          const updatedQuantity = eachCartItem.quantity + 1
          return {...eachCartItem, quantity: updatedQuantity}
        }
        return eachCartItem
      }),
    }))
  }

  decrementCartItemQuantity = dishId => {
    const {cartList} = this.state
    const productObject = cartList.find(
      eachCartItem => eachCartItem.dishId === dishId,
    )
    if (productObject && productObject.quantity > 1) {
      this.setState(prevState => ({
        cartList: prevState.cartList.map(eachCartItem => {
          if (dishId === eachCartItem.dishId) {
            const updatedQuantity = eachCartItem.quantity - 1
            return {...eachCartItem, quantity: updatedQuantity}
          }
          return eachCartItem
        }),
      }))
    } else {
      this.removeCartItem(dishId)
    }
  }

  removeCartItem = dishId => {
    const {cartList} = this.state
    const updatedCartList = cartList.filter(
      eachCartItem => eachCartItem.dishId !== dishId,
    )

    this.setState({cartList: updatedCartList})
  }

  addCartItem = product => {
    const {cartList} = this.state
    const productObject = cartList.find(
      eachCartItem => eachCartItem.dishId === product.dishId,
    )

    if (productObject) {
      this.setState(prevState => ({
        cartList: prevState.cartList.map(eachCartItem => {
          if (productObject.dishId === eachCartItem.dishId) {
            const updatedQuantity = eachCartItem.quantity + product.quantity

            return {...eachCartItem, quantity: updatedQuantity}
          }

          return eachCartItem
        }),
      }))
    } else {
      const updatedCartList = [...cartList, product]

      this.setState({cartList: updatedCartList})
    }
  }

  render() {
    const {cartList, cafeName} = this.state

    return (
      <CartContext.Provider
        value={{
          cartList,
          cafeName,

          addCartItem: this.addCartItem,
          removeCartItem: this.removeCartItem,
          incrementCartItemQuantity: this.incrementCartItemQuantity,
          decrementCartItemQuantity: this.decrementCartItemQuantity,
          removeAllCartItems: this.removeAllCartItems,
          changeCafeName: this.changeCafeName,
        }}
      >
        <BrowserRouter>
          <Switch>
            <Route exact path="/login" component={Login} />
            <ProtectedRoute exact path="/" component={Home} />
            <ProtectedRoute exact path="/cart" component={Cart} />
            <ProtectedRoute path="/not-found" component={NotFound} />
            <Redirect to="/not-found" />
          </Switch>
        </BrowserRouter>
      </CartContext.Provider>
    )
  }
}

export default App
