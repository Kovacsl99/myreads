import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import * as BooksAPI from '../BooksAPI'


class Search extends Component {
    
    state = {
        newBook: [],
        query: ''
    }

    //searching books from database, search term limited => see SEARCH_TERMS.md
    searchBooks = (e) => {
        const search = e.target.value
        this.setState({query: search})

        if (search) {
            BooksAPI.search(search, 30).then((item) => {
                item.length > 0 ? this.setState({newBook: item}) : this.setState({newBook: []})
            })
        }
        else this.setState({newBook: []})
    }
    
    render() {
        const book = this.props.book
        const changeBookShelf = this.props.changeBookShelf
        const noCover = 'https://vignette.wikia.nocookie.net/bakemonogatari1645/images/2/26/No-cover-placeholder.png'

    return (
        //search bar
        <div className="search-books">
        <div className="search-books-bar">
            <Link className="close-search" to='/'>Close</Link>
            <div className="search-books-input-wrapper">
                <input type="text" placeholder="Search by title or author" value={this.state.query} onChange={this.searchBooks}/>
            </div>
        </div>
        
        {/*search results*/}
        <div className="search-books-results">
            <ol className='books-grid'>{this.state.newBook.map((item) => {
                book.forEach((i) => {
                    if (i.id === item.id) {
                            item.shelf = i.shelf
                        }
                })
                    return (
                        <li key={item.id}>
                            <div className='book'>
                                <div className='book-top'>
                                    <img className='book-cover' alt={`book cover: ${item.title}`} src={`${item.imageLinks ? item.imageLinks.smallThumbnail : noCover}`} style={{
                                        width: 128, height: 193}}/>
                                    <div className="book-shelf-changer">
                                        <select
                                            onChange={e => changeBookShelf(item, e.target.value)}
                                            value={item.shelf ? item.shelf : 'none'}>
                                            <option value="move" disabled>Move to...</option>
                                            <option value="currentlyReading">Currently Reading</option>
                                            <option value="wantToRead">Want to Read</option>
                                            <option value="read">Read</option>
                                            <option value="none">None</option>
                                        </select>
                                    </div>
                                </div>
                                <div className='book-title'>{item.title}</div>
                                <div className='book-authors'>{item.authors}</div>
                            </div>
                        </li>
                    )
            })}</ol>
        </div>
    </div>

    )
    }
}

export default Search



