import React, { Component } from "react";
import ReactDOM from "react-dom";

const brackets = /\(.*?\).?/gi;
const whitespace = /\s+/gi;

const count = text => text.split(whitespace).filter(word => word !== "").length;
const format = text => text.replace(brackets, "");
const citations = text =>
  text.match(brackets) == null ? 0 : text.match(brackets).length;

const wordCount = text => {
  let totalWords = count(text);
  let formattedCount = count(format(text));
  let citationWords = totalWords - formattedCount;
  let citationCount = citations(text);

  return `
      This text has ${totalWords} words in total. 
      ${citationCount} citations use ${citationWords} words.
      This text has ${formattedCount} words without citations.
      `;
};

class App extends React.Component {
  constructor(props) {
    super(props);
    this.handleTextChange = this.handleTextChange.bind(this);
    this.state = {
      text: "Enter text here",
      welcome:
        "Enter your text in the box below to get information on word count"
    };
  }

  handleTextChange(text) {
    this.setState({ text });
  }

  render() {
    return (
      <div className="container">
        <div className="side">
          <h1 className="Title">Cite-Count</h1>
          <h2 className="Subheading">Word counts (sans citations)</h2>
          <p className="Info">{wordCount(this.state.text)}</p>
          <p className="Disclaimer">
            * All content between brackets is excluded from the final word
            count, including bracketed comments.
          </p>
        </div>
        <div className="content">
          <div className="main">
            <Textbox
              className="main"
              text={this.state.text}
              onTextChange={this.handleTextChange}
            />
          </div>
        </div>
      </div>
    );
  }
}

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
      <div className="Input">
        <textarea
          className="TextArea"
          value={text}
          onChange={this.handleChange}
        />
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("root"));
