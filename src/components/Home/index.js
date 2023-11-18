import {Component} from 'react'
import Loader from 'react-loader-spinner'
import './index.css'
import {AiOutlineShoppingCart} from 'react-icons/ai'
import Cookies from 'js-cookie'

import {Link} from 'react-router-dom'

import CartContex from '../../context/CartContext'

const initial = {
  loading: 'load',
  success: 'success',
}

class Home extends Component {
  state = {
    total: [],
    active: 'Salads and Soup',
    displayData: [],
    status: initial.loading,
    cafeName: '',
  }

  componentDidMount() {
    this.getDetails()
  }

  onClickLogout = () => {
    const {history} = this.props

    Cookies.remove('jwt_token')
    history.replace('/login')
  }

  getDetails = async () => {
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
    console.log(data)
    const array = data.map(each => ({
      tableMenuList: each.table_menu_list,
      restaurantName: each.restaurant_name,
    }))

    const totalDetails = array[0]

    const {tableMenuList, restaurantName} = totalDetails
    this.setState({cafeName: restaurantName})

    const forMat = tableMenuList.map(each => ({
      categoryDishes: each.category_dishes.map(each1 => ({
        dishId: each1.dish_id,
        dishName: each1.dish_name,
        dishAvailability: each1.dish_Availability,
        dishCurrency: each1.dish_currency,
        dishType: each1.dish_Type,
        dishCalories: each1.dish_calories,
        dishImage: each1.dish_image,
        dishPrice: each1.dish_price,
        dishDescription: each1.dish_description,
        nexturl: each1.nexturl,
        addonCat: each1.addonCat,
        quantity: 0,
      })),

      menuCategory: each.menu_category,
      menuCategoryId: each.menu_category_id,
      menuCategoryImage: each.menu_category_image,
      nexturl: each.nexturl,
    }))
    console.log('forMat:-->', forMat)
    this.setState({total: forMat, status: initial.success})
    const single = forMat[0]
    const {categoryDishes} = single
    this.setState({displayData: categoryDishes})
  }

  getDisplay = id => {
    const {total} = this.state
    this.setState({active: id})
    const dis = total.filter(each => each.menuCategory === id)
    const filterData = dis[0]
    const {categoryDishes} = filterData
    this.setState({displayData: categoryDishes})
  }

  increaseQuantity = dishId => {
    const {displayData} = this.state
    this.setState({
      displayData: displayData.map(data =>
        data.dishId === dishId ? {...data, quantity: data.quantity + 1} : data,
      ),
    })
  }

  decrementCartItemQuantity = dishId => {
    const {displayData} = this.state
    this.setState({
      displayData: displayData.map(data =>
        data.dishId === dishId && data.quantity !== 0
          ? {...data, quantity: data.quantity - 1}
          : data,
      ),
    })
  }

  loaingView = () => (
    <div className="loader-container">
      <Loader type="TailSpin" color="#D81F26" height={50} width={50} />
    </div>
  )

  successView = () => {
    const {total, active, displayData, cafeName} = this.state
    return (
      <CartContex.Consumer>
        {value => {
          const {
            addCartItem,
            incrementCartItemQuantity,
            decrementCartItemQuantity,
            cartList,
          } = value

          return (
            <div className="menu">
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
              <ul className="category">
                {total.map(object => (
                  <li key={object.menuCategory}>
                    <button
                      type="button"
                      className={
                        object.menuCategory === active
                          ? 'menudex'
                          : 'menuButton'
                      }
                      onClick={() => this.getDisplay(object.menuCategory)}
                      key={object.menuCategory}
                    >
                      {object.menuCategory}
                    </button>
                  </li>
                ))}
              </ul>
              <ul className="displayList">
                {displayData.map(dish => (
                  <li key={dish.dishId} className="item">
                    <div key={dish.dishId}>
                      <h1 className="list_head" key={dish.dishName}>
                        {dish.dishName}
                      </h1>
                      <p key={`${dish.dishCurrency}${dish.dishPrice}`}>
                        {dish.dishCurrency} {dish.dishPrice}
                      </p>
                      <p className="describe" key={dish.dishDescription}>
                        {dish.dishDescription}
                      </p>
                      {dish.dishAvailability ? (
                        <div className="quantity">
                          <button
                            type="button"
                            className="customization"
                            onClick={() => {
                              this.decrementCartItemQuantity(dish.dishId)
                              decrementCartItemQuantity(dish.dishId)
                            }}
                          >
                            -
                          </button>{' '}
                          <p>{dish.quantity || 0}</p>
                          <button
                            type="button"
                            className="customization"
                            onClick={() => {
                              this.increaseQuantity(dish.dishId)
                              incrementCartItemQuantity(dish.dishId)
                            }}
                          >
                            +
                          </button>
                        </div>
                      ) : (
                        <p className="not">Not Available</p>
                      )}
                      {dish.addonCat.length > 0 ? (
                        <p style={{color: 'blue'}} key="addonCat">
                          Customizations available
                        </p>
                      ) : null}

                      {dish.dishAvailability && dish.quantity ? (
                        <button
                          type="button"
                          onClick={() => {
                            addCartItem(dish)
                          }}
                        >
                          ADD TO CART
                        </button>
                      ) : null}
                    </div>

                    <p className="calories" key={dish.dishCalories}>
                      {dish.dishCalories} calories
                    </p>
                    <img
                      src={dish.dishImage}
                      alt={dish.dishName}
                      key={dish.dishName}
                      className="imagewidth"
                    />
                  </li>
                ))}
              </ul>
            </div>
          )
        }}
      </CartContex.Consumer>
    )
  }

  renderView = () => {
    const {status} = this.state

    switch (status) {
      case 'load':
        return this.loaingView()

      case 'success':
        return this.successView()
      default:
        return null
    }
  }

  render() {
    return this.renderView()
  }
}

export default Home
