import React, { Component } from 'react'
import '../App.css'
import DisplayBooks from './DisplayBooks'
import Header from './Header';
import { Link } from 'react-router-dom';

class DisplayShelf extends Component {
    
    render() {
    const books = this.props.book
    const changeBookShelf=this.props.changeBookShelf

    let shelves = [
        { shelf: 'currentlyReading', title: 'Currently reading', array: [] },
        { shelf: 'wantToRead', title: 'Want to read', array: [] },
        { shelf: 'read', title: 'Read', array: [] }
    ]
    
    //filter books by shelf
    shelves.forEach((shelf) => {
        shelf.array = books.filter((item) => {
            return item.shelf === shelf.shelf
        })
    })
    
    return (
        <div className='list-books'>
            <Header/>
            <DisplayBooks shelf={shelves[0].array} title={shelves[0].title} changeBookShelf={changeBookShelf}/>
            <DisplayBooks shelf={shelves[1].array} title={shelves[1].title} changeBookShelf={changeBookShelf}/>
            <DisplayBooks shelf={shelves[2].array} title={shelves[2].title} changeBookShelf={changeBookShelf}/>

            <div className="open-search">
                <Link to='/search' >Add a new book</Link>
            </div>
        </div>
    )
}
}

export default DisplayShelf
