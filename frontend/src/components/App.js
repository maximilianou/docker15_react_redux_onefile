// components/App.js
import React from "react";
import { connect } from "react-redux";
import '../App.css';
import uuidv1 from "uuid";
import { createStore } from 'redux'; 
////////////////////////////////////////
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
/////////////////////////////////////////
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
        <div className="form-group">
          <label htmlFor="title">Title</label>
          <input
            type="text"
            className="form-control"
            id="title"
            value={title}
            onChange={this.handleChange}
          />
        </div>
        <button type="submit" className="btn btn-success btn-lg">
          SAVE
        </button>
      </form>
    );
  }
}
const Form = connect(null, mapDispatchToProps)(ConnectedForm);
////////////////////////////////////
const mapStateToProps = state => {
  return { articles: state.articles };
};
const ConnectedList = ({ articles }) => (
  <ul className="list-group list-group-flush">
    {articles.map(el => (
      <li className="list-group-item" key={el.id}>
        {el.title}
      </li>
    ))}
  </ul>
);
const List = connect(mapStateToProps)(ConnectedList);
///////////////////////////////////////
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
export { App, store };