import React, { Component } from "react";
// import Value from "./components/Value"
import "./assets/css/reset.css";
import "./assets/css/style.css";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      formula: "",
      formCheck: false,
      viewValue: "0"
    };
  }
  numberCallback = () => {};
  formCallback = () => {};
  formCheck = v => {
    if (this.state.formCheck === false) {
      return this.state.viewValue + v;
    } else {
      alert("현재 연산을 수행 후 다음 연산 진행하세요.");
      return this.state.viewValue;
    }
  };
  reset = v => {
    this.setState({
      formula: "",
      formCheck: false
    });
    if (v === 0) {
      this.setState({
        viewValue: "0"
      });
    }
  };
  componentDidUpdate() {
    // console.log("componentDidUpdate", this.state.viewValue)
  }
  render() {
    return <div className="calc-wrap"></div>;
  }
}

export default App;
