import {Component} from 'react'
import './App.css'

class App extends Component {
  state = {
    total: [],
    active: 'Salads and Soup',
    displayData: [],
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
    const array = data.map(each => ({
      tableMenuList: each.table_menu_list,
    }))
    const totalDetails = array[0]

    const {tableMenuList} = totalDetails
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
      })),
      menuCategory: each.menu_category,
      menuCategoryId: each.menu_category_id,
      menuCategoryImage: each.menu_category_image,
      nexturl: each.nexturl,
    }))

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
    const {displayData} = this.state
    const updatedDisplayData = displayData.map(dish => {
      if (dish.dishId === dishId) {
        const currentQuantity = dish.quantity || 0
        const newQuantity = currentQuantity + quantityChange

        return {...dish, quantity: Math.max(newQuantity, 0)}
      }
      return dish
    })

    this.setState({displayData: updatedDisplayData})
  }

  render() {
    const {total, active, displayData} = this.state
    return (
      <div className="menu">
        <nav className="header">
          <h1 className="main_head">UNI Resto Cafe</h1>
          <h1>My Orders</h1>
        </nav>
        <ul className="category">
          {total.map(object => (
            <li>
              <button
                type="button"
                key={object.menuCategory}
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
                <p className="list_head">{dish.dishName}</p>
                <p>
                  {dish.dishCurrency} {dish.dishPrice}
                </p>
                <p className="describe">{dish.dishDescription}</p>
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
              </div>
              <p className="calories">{dish.dishCalories} calories</p>
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
