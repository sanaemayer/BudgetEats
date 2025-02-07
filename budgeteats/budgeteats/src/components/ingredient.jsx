import React, { Component } from "react";
import IngredientCart from "./ingredientCart";
import IngredientSearch from "./ingredientSearch";

const tableStyle = {
  width: "48%",
  margin: "2%",
  display: "inline-block",
  borderRadius: 10,
  height: 750,
};

class Ingredient extends Component {
  state = {
    apiData: [],
    stores: [],
    ingredients: [],
    filterIngredients: [],
    addedIngredients: [],
    ingredientsName: [],
  };

  addIngredient = (ingredient) => {
    var addedIngredients = this.state.addedIngredients;
    const index = addedIngredients.indexOf(ingredient);
    if (index === -1) {
      addedIngredients = [...this.state.addedIngredients, ingredient];
      this.setState({ addedIngredients });
    }
  };

  removeIngredient = (ingredient) => {
    var addedIngredients = this.state.addedIngredients;
    const index = addedIngredients.indexOf(ingredient);

    if (index > -1) {
      addedIngredients.splice(index, 1);
    }

    this.setState({ addedIngredients });
  };

  addFilter = (input) => {
    var filterIngredients = this.state.ingredients.filter((ingredient) =>
      ingredient[0].toLowerCase().includes(input.toLowerCase())
    );
    this.setState({ filterIngredients });
  };

  modifyData(ingredients) {
    var stores = ["Aldi", "Kroger", "Trader's Joe", "Publix", "Walmart"];
    //localhost:8000/api/foods
    var ingredientsName = [];

    ingredients.forEach((ingredient) => {
      const index = ingredientsName.indexOf(ingredient.name);
      if (index === -1) {
        ingredientsName.push(ingredient.name);
      }
    });

    //What we have: store name, item name, item price per store
    var newFormat = [];
    ingredientsName.forEach((name) => {
      var items = new Array(stores.length + 1);
      items[0] = name;
      var filter = ingredients.filter((ingredient) =>
        ingredient.name.includes(name)
      );
      filter.forEach((item) => {
        stores.forEach((store, index) => {
          if (store === item.store) {
            items[index + 1] = item.price;
          }
        });
      });
      newFormat.push(items);
    });

    this.setState({
      ingredients: newFormat,
      stores,
      filterIngredients: newFormat,
      ingredientsName,
    });
  }

  componentDidMount() {
    fetch("http://localhost:8000/api/foods/")
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        this.modifyData(data);
      })
      .catch((e) => console.log(e));
  }

  render() {
    return (
      <div style={{ display: "flex" }}>
        <div style={tableStyle}>
          <IngredientSearch
            ingredients={this.state.filterIngredients}
            addIngredient={this.addIngredient}
            onSearch={this.filterIngredients}
            stores={this.state.stores}
            ingredientsName={this.state.ingredientsName}
            addFilter={this.addFilter}
          />
        </div>
        <div style={tableStyle}>
          <IngredientCart
            addedIngredients={this.state.addedIngredients}
            removeIngredient={this.removeIngredient}
            stores={this.state.stores}
          />
        </div>
      </div>
    );
  }
}

export default Ingredient;
