import {Component} from 'react'
import './App.css'

import {AiOutlineShoppingCart} from 'react-icons/ai'

class App extends Component {
  state = {
    total: [],
    active: 'Salads and Soup',
    displayData: [],
    name: '',
    cart: {},
  }

  componentDidMount() {
    this.getDetails()
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
    console.log(array)
    const totalDetails = array[0]

    const {tableMenuList, restaurantName} = totalDetails
    this.setState({name: restaurantName})
    console.log(restaurantName)
    console.log('tableMenuList', tableMenuList)
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
      })),

      menuCategory: each.menu_category,
      menuCategoryId: each.menu_category_id,
      menuCategoryImage: each.menu_category_image,
      nexturl: each.nexturl,
    }))
    console.log('forMat:-->', forMat)
    this.setState({total: forMat})
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

  updateQuantity = (dishId, quantityChange) => {
    const {displayData, cart} = this.state

    const updatedDisplayData = displayData.map(dish => {
      if (dish.dishId === dishId) {
        const currentQuantity = dish.quantity || 0
        const newQuantity = Math.max(currentQuantity + quantityChange, 0)

        if (newQuantity > 0) {
          cart[dishId] = newQuantity
        } else {
          delete cart[dishId]
        }

        return {...dish, quantity: newQuantity}
      }
      return dish
    })

    this.setState({displayData: updatedDisplayData, cart})
  }

  calculateCartCount = () => {
    const {cart} = this.state
    const cartCount = Object.values(cart).reduce(
      (acc, quantity) => acc + quantity,
      0,
    )
    return cartCount
  }

  render() {
    const {total, active, displayData, name} = this.state
    const cartCount = this.calculateCartCount()

    return (
      <div className="menu">
        <nav className="header">
          <h1 className="main_head" key={name}>
            {name}
          </h1>
          <div className="order">
            <h1>My Orders</h1>
            <h1 className="cart-icon">
              {' '}
              <AiOutlineShoppingCart />{' '}
              <span className="count">{cartCount}</span>{' '}
            </h1>
          </div>
        </nav>
        <ul className="category">
          {total.map(object => (
            <li key={object.menuCategory}>
              <button
                type="button"
                className={
                  object.menuCategory === active ? 'menudex' : 'menuButton'
                }
                onClick={() => this.getDisplay(object.menuCategory)}
              >
                {object.menuCategory}
              </button>
            </li>
          ))}
        </ul>
        <ul className="displayList">
          {displayData.map(dish => (
            <li key={dish.dishId} className="item">
              <div>
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
                      onClick={() => this.updateQuantity(dish.dishId, 1)}
                    >
                      +
                    </button>{' '}
                    <p>{dish.quantity || 0}</p>
                    <button
                      type="button"
                      className="customization"
                      onClick={() => this.updateQuantity(dish.dishId, -1)}
                    >
                      -
                    </button>
                  </div>
                ) : (
                  <p className="not">Not Available</p>
                )}
                {dish.addonCat.length > 0 ? (
                  <p style={{color: 'blue'}}>Customizations available</p>
                ) : null}
              </div>

              <p className="calories" key={dish.dishCalories}>
                {dish.dishCalories} calories
              </p>
              <img
                src={dish.dishImage}
                alt={dish.dishName}
                className="imagewidth"
              />
            </li>
          ))}
        </ul>
      </div>
    )
  }
}

export default App
