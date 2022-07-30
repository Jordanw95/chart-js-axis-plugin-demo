import React from "react";
import ReactDom from "react-dom";
import "./index.css";
const App = () => (
	<div className="container">
		<p>an itemmmmmm</p>
		<div onClick={() => console.log("something")} >A button</div>
	</div>
);
ReactDom.render(<App />, document.getElementById("root"));
