import React, { Component } from "react";
import { Jumbotron } from "react-bootstrap";
import homeimage from "../home_image.jpeg";

class Homepage extends Component {
  render() {
    const styles = {
      backgroundImage: `url(${homeimage})`,
      backgroundSize: "cover",
      backgroundRepeat: "no-repeat",
      height: "180vh",
    };
    return (
      <div>
        <Jumbotron style={styles}>
          <div
            style={{
              marginTop: "50px",
              display: "flex",
              justifyContent: "center",
            }}
          >
            <h1
              style={{
                color: "white",
                fontFamily: "Lobster",
                fontSize: "70px",
              }}
            >
              BudgetEats
            </h1>
            <p></p>
          </div>
        </Jumbotron>
      </div>
    );
  }
}

export default Homepage;
