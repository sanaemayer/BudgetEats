import React, { Component } from "react";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";

class IncredientCart extends Component {
  state = {
    count: [],
  };

  removeIngredient = (ingredient) => {
    this.props.removeIngredient(ingredient);
  };

  setPrice = () => {
    // console.log(event.target.CounterInput);
    var count = this.state.count;
    var totalPrice = new Array(this.props.stores.length).fill(0);
    this.props.addedIngredients.forEach((ingredient, i) => {
      ingredient.slice(1).forEach((price, index) => {
        totalPrice[index] += price * count[i];
      });
    });

    return totalPrice;
  };

  incrementCounter = (i) => {
    var count = this.state.count;
    count[i]++;
    this.setState({ count });
  };

  decrementCounter = (i) => {
    if (this.state.count[i] > 1) {
      var count = this.state.count;
      count[i]--;
      this.setState({ count });
    }
  };

  returnItemPrice(price, i) {
    let item =
      price === 0
        ? "Not Found"
        : "$ " + parseFloat(price * this.state.count[i]).toFixed(2);
    return item;
  }
  render() {
    return (
      <div>
        <Table
          onChange={this.setPrice}
          striped
          bordered
          hover
          variant="light"
          responsive
        >
          <thead>
            <tr>
              <th>Ingredient Name</th>
              {this.props.stores.map((store, index) => {
                return <th key={index}>{store}</th>;
              })}
              <th>Value</th>
            </tr>
          </thead>
          <tbody>
            {this.props.addedIngredients.map((ingredient, i) => {
              var count = this.state.count;
              var countIndex = count.length;
              while (this.props.addedIngredients.length > countIndex) {
                count.push(1);
                ++countIndex;
              }
              return (
                <tr>
                  <td style={{ maxWidth: 80 }}>{ingredient[0]}</td>
                  {ingredient.slice(1).map((item, index) => {
                    return <td key={index}>{this.returnItemPrice(item, i)}</td>;
                  })}
                  <td
                    style={{
                      width: "100%",
                      display: "flex",
                      flexDirection: "row",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <Button
                      variant="secondary"
                      style={{ width: 35, height: 35 }}
                      onClick={() => this.decrementCounter(i)}
                    >
                      -
                    </Button>
                    <span style={{ marginLeft: 10, marginRight: 10 }}>
                      {this.state.count[i]}
                    </span>
                    <Button
                      variant="secondary"
                      style={{ width: 35, height: 35 }}
                      onClick={() => this.incrementCounter(i)}
                    >
                      +
                    </Button>
                  </td>
                  <td style={{ display: "flex", justifyContent: "center" }}>
                    <Button
                      onClick={() => this.removeIngredient(ingredient)}
                      variant="danger"
                    >
                      Remove
                    </Button>
                  </td>
                </tr>
              );
            })}
          </tbody>
          <tfoot>
            <tr>
              <th>Total</th>
              {this.setPrice().map((price, i) => {
                return <th key={i}>{"$ " + parseFloat(price).toFixed(2)}</th>;
              })}
            </tr>
          </tfoot>
        </Table>
      </div>
    );
  }
}

export default IncredientCart;
