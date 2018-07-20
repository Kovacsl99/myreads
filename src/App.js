import React from 'react'
import './App.css'
import DisplayShelf from './components/DisplayShelf';
import { BrowserRouter, Route } from 'react-router-dom';
import Search from './components/Search';
import * as BooksAPI from './BooksAPI'


class BooksApp extends React.Component {
    
    state = {
        book: []
    }

    //get the list of the books from the shelves
    componentDidMount() {
        BooksAPI.getAll().then((books) => {
            this.setState({ book: books })
        })
    }
    
    //put book to other shelf
    changeBookShelf = (nBook, nShelf) => {
        BooksAPI.update(nBook, nShelf).then(() =>{
            nBook.shelf = nShelf

            var updatedBooks = this.state.book.filter( book => book.id !== nBook.id )
    
            updatedBooks.push(nBook);
            this.setState({ book: updatedBooks })
        })
      }

    render() {

        return (
            <div>
                <BrowserRouter>
                    <div className='app'>
                        <Route path='/' exact render={() => (
                            <DisplayShelf changeBookShelf={this.changeBookShelf} book={this.state.book}/>
                        )}/>
                        <Route path='/search' render={() => (
                            <Search changeBookShelf={this.changeBookShelf} book={this.state.book}/>
                        )}/>
                    </div>
                </BrowserRouter>
            </div>
        )
    }
}

export default BooksApp
