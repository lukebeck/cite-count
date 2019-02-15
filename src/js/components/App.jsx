import React from "react";
import ReactDOM from "react-dom";
import Textbox from "./Textbox.jsx";
import { GitHub } from "react-feather";

const brackets = /\(.*?\).?/gi;
const whitespace = /\s+/gi;

const count = text => text.split(whitespace).filter(word => word !== "").length;
const format = text => text.replace(brackets, "");
const citations = text =>
  text.match(brackets) == null ? 0 : text.match(brackets).length;

const plural = (count, word) => (count == 1 ? word : word + "s");

const Data = props => (
  <div>
    <p>
      Word count: <span>{props.data.totalCount}</span>
    </p>
    <p>
      Word count excluding citations: <span>{props.data.formattedCount}</span>
    </p>
    <p>
      This text uses <b>{props.data.totalCount - props.data.formattedCount}</b>{" "}
      {plural(props.data.totalCount - props.data.formattedCount, "word")} across{" "}
      <b>{props.data.citationCount}</b>{" "}
      {plural(props.data.citationCount, "citation")}.
    </p>
  </div>
);

class App extends React.Component {
  constructor(props) {
    super(props);
    this.handleTextChange = this.handleTextChange.bind(this);
    this.state = {
      text: "Enter text (with citations) here..."
    };
  }

  handleTextChange(text) {
    this.setState({ text });
  }

  analyseText(text) {
    let results = {
      totalCount: count(text),
      formattedCount: count(format(text)),
      citationCount: citations(text)
    };
    return results;
  }

  render() {
    return (
      <div className="container">
        <div className="side">
          <div className="github">
            <a href="https://github.com/lukebeck/cite-count">
            <GitHub color={"rgba(40,40,40,0.5)"} size={20}/>
            </a>
          </div>
          <h1>Cite-Count</h1>
          <h2>Word counts (sans citations)</h2>
          <Data data={this.analyseText(this.state.text)} />
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

ReactDOM.render(<App />, document.getElementById("root"));
