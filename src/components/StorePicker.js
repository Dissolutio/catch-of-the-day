import React from "react";
import PropTypes from 'prop-types';
import { getFunName } from "../helpers";

class StorePicker extends React.Component {
  static propTypes = {
    history: PropTypes.object
  }
  myInput = React.createRef();
  goToStore = (event) => {
    // 1. Stop form from submitting
    event.preventDefault();
    // 2. Get the text from input
    const storeName = this.myInput.value.value;
    // 3. Change the path to /store/whatever-they-entered
    this.props.history.push(`/store/${storeName}`);
  };
  render() {
    return (
      <form className="store-selector" onSubmit={this.goToStore}>
        <h2>Please Enter A Store</h2>
        <input 
          type="text" 
          ref={this.myInput}
          required 
          placeholder="Store Name" 
          defaultValue={getFunName()} />
        <button type="submit">Visit Store →</button>
      </form>
    );
  }
}

export default StorePicker;