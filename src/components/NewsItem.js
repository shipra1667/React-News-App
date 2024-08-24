import React, { Component } from 'react'

export class NewsItem extends Component {

  render() {
    let {title, description, imageUrl, newsUrl, author, dateTime} = this.props;
    return (
      <div className="card">
        <button type="button" className="btn btn-danger" style={{width:'fit-content', marginTop:'-20px'}}>
          {author}
        </button>
        <img className="card-img-top" src={imageUrl?imageUrl:'https://cdn.pixabay.com/photo/2016/09/04/17/46/news-1644696_960_720.png'} alt=""/>
        <div className="card-body">
          <h5 className="card-title">{title}...</h5>
          <p className="card-text">{description}</p>
          <p className='text-danger'>{dateTime}</p>
          <a href={newsUrl} className="btn btn-sm btn-dark">Read More</a>
        </div>
      </div>
    )
  }
}

export default NewsItem
