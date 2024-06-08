import React, { Component } from "react";
import Header from "./Header/Header";

class Layout extends Component {
  constructor(props) {
    super(props);
    this.state = {
      children: props.children,
    };
  }

  render() {
    return (
      <div className="relative bg-white  bg-dot-black/[0.2] dark:bg-black dark:bg-dot-white/[0.2]">
        <Header />

        {this.props.children}
        
      </div>
    );
  }
}
export default Layout;
