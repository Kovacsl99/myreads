import React, { Component } from 'react'
import '../App.css'

class DisplayBooks extends Component {
    
    render() {
    
    const shelf = this.props.shelf
    const title = this.props.title
    const changeBookShelf = this.props.changeBookShelf
    const noCover = 'https://vignette.wikia.nocookie.net/bakemonogatari1645/images/2/26/No-cover-placeholder.png'
    
    return (
        <div className="bookshelf">
            <h2 className="bookshelf-title">{title}</h2>
                <div className='bookshelf-books'>
                    <ol className='books-grid'>{shelf.map((item) => {
                    return (
                        <li key={item.id}>
                            <div className='book'>
                                <div className='book-top'>
                                    <img className='book-cover' alt={`book cover: ${item.title}`} src={`${item.imageLinks ? item.imageLinks.smallThumbnail : noCover}`} style={{
                                        width: 128, height: 193}}/>
                                    <div className="book-shelf-changer">
                                        <select
                                            onChange={e => changeBookShelf(item, e.target.value)}
                                            value={item.shelf}>
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

export default DisplayBooks
