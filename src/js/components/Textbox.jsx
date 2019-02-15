import React from "react";

class Textbox extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    this.props.onTextChange(e.target.value);
  }

  render() {
    const text = this.props.text;
    return (
        <textarea
          value={text}
          onChange={this.handleChange}
        />
    );
  }
}

export default Textbox;