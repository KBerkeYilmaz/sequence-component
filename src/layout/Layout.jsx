import React, { Component } from "react";
import Header from "./Header/Header";
import { Toaster } from "react-hot-toast";

class Layout extends Component {
  constructor(props) {
    super(props);
    this.state = {
      children: props.children,
    };
  }

  render() {
    return (
      <div className="relative bg-white">
        <Header />
        {this.props.children}
        <Toaster />
      </div>
    );
  }
}
export default Layout;
