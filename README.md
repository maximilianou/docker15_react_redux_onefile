---

####Trying to simplify One File Explanation of React Redux.
This is the minimal example i have seen.

( This could help in a realtime interview, cut an paste, and do the react redux exercise, showing that you manage the concepts, fast, clear.. or not so.
Changing this code, adding inputs in the form, or adding another form, "connecting it with the redux store" and changing the view, or adding another views "connecting it with the redux store", and making more actions, will help you show faster your understanding or react redux.
And you can show how to make many differents redux stores, for a partition of your busness data layer in the view.
- Later you talk about Hierarchy of the filesystem ('like unix man hier') when you have many business logic accions. )

---

The environment runs with, editor vscode, and docker-compose just to use it.
And we can change the code, and see changes on runtime.

```bash
code . 

docker-compose up
```

---

```javascript

// index.js, react redux, onefile flatting explanation.
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import * as serviceWorker from './serviceWorker';
import { Provider, connect } from "react-redux";
import './App.css';
import uuidv1 from "uuid";
import { createStore } from 'redux'; 
//// Route (business logic) actions, with tipified constant Names.
//// To change de state of the Global store App
const ADD_ARTICLE = "ADD_ARTICLE";
const initialState = {
  articles: []
};
const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_ARTICLE:
      return { ...state, articles: [ ...state.articles, action.payload ] };    
    default:
      return state;
  }
};
//// Create an "Input Form React Component", connected with redux store state.
//// Write down the html view of this component.
//// Write down the handlers in javascript methods, for dom events. 
//// Connect the dom events handlers in the html view.
//// Dispatch de state of the Component, to the redux (global) store.
const store = createStore(rootReducer);
const addArticle = article => ({
  type: ADD_ARTICLE,
  payload: article
});
const mapDispatchToProps = dispatch => {
  return {
    addArticle: article => dispatch(addArticle(article))
  };
};
class ConnectedForm extends React.Component {
  constructor() {
    super();
    this.state = {
      title: ""
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleChange(event) {
    this.setState({ [event.target.id]: event.target.value });
  }
  handleSubmit(event) {
    event.preventDefault();
    const { title } = this.state;
    const id = uuidv1();
    this.props.addArticle({ title, id });
    this.setState({ title: "" });
  }
  render() {
    const { title } = this.state;
    return (
      <form onSubmit={this.handleSubmit}>
        <div className="">
          <label htmlFor="title">Title</label>
          <input
            type="text"
            className=""
            id="title"
            value={title}
            onChange={this.handleChange}
          />
        </div>
        <button type="submit" className="">
          SAVE
        </button>
      </form>
    );
  }
}
const Form = connect(null, mapDispatchToProps)(ConnectedForm);
//// Create a Function with de html view in jsx from react, 
//// And connect the state properties to the redux store
//// Like an observer/observable, from general design patterns.
const mapStateToProps = state => {
  return { articles: state.articles };
};
const ConnectedList = ({ articles }) => (
  <ul className="">
    {articles.map(el => (
      <li className="" key={el.id}>
        {el.title}
      </li>
    ))}
  </ul>
);
const List = connect(mapStateToProps)(ConnectedList);
//// Create de view in jsx, width html and React Component of the Application
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
//// Making the action of rendering the final DOM in html, in 'index.html'->'div#app'
//// we have to connect the Global Redux store of the Rreact App, 
////       with the Provider react-redux Component
ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.querySelector("#app")
);
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();

```

---


