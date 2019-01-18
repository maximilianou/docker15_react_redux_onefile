// components/App.js
import React from "react";
import List from "./List";
import Form from "./Form";
import '../App.css';
const App = () => (
  <div className="App">
    <div className="App-header">
      <h2>Add a new article</h2>
      <Form />
    </div>
    <div className="">
      <h2>Articles</h2>
      <List />
    </div>
  </div>
);

export default App;