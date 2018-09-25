import React from 'react';
import { Route } from 'react-router-dom';
import * as BooksAPI from './BooksAPI';
import SearchPage from './SearchPage';
import MainPage from './MainPage';
import './App.css'


class BooksApp extends React.Component {
  state = {
    books: []
  }

  componentDidMount() {
    BooksAPI.getAll().then((books) => {
      this.setState({ books: books })
    })
  }

  // BooksAPI.getAll() and BooksAPI.update() are asynchronous. Inside your moveShelf function, you should wrap getAll() in a then to ensure that it runs after update() has finished
  // you want to make sure that .update() is done before running .getAll() again, so you should chain a .then() after .update() that includes the getAll method

  // but it should be like BooksAPI.update(book, shelf).then(() => { BooksAPI.getAll().then(books)... then you set the state in the final then

  moveShelf = (book, shelf) => {
    BooksAPI.update(book, shelf).then(() => { 
      BooksAPI.getAll().then((books) => {
      this.setState({ books: books })
    })


    });

    
  }

  render() {

    return (
      <div className="app">

        <Route exact path="/" render = {() => (
          <MainPage
            books={this.state.books}
            moveShelf={this.moveShelf}
          />
          )} />

        <Route path="/search" render = {() => (
          <SearchPage
          moveShelf={this.moveShelf}
          books={this.state.books}
          />
          )} />

      </div>
    )
  }
}

export default BooksApp;
