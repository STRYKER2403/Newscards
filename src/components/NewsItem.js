import React, { Component } from 'react'

export class NewsItem extends Component {

  render() {
    let {title,description,ImageUrl,newsUrl,author,date,source} = this.props;
    return (
      <div>  
        <div className="card my-3">
        <span className="position-absolute top-0 translate-middle badge rounded-pill bg-danger" style={{left : "90%" , zIndex : "1"}}>{source}</span>
        <img src={ImageUrl?ImageUrl:"https://resize.indiatvnews.com/en/resize/newbucket/715_-/2022/09/smartwatch-pixabay-1663594523.jpg"} className="card-img-top" alt="..."/>
        <div className="card-body">
            <h5 className="card-title">{title}...</h5>
            <p className="card-text">{description}...</p>
            <p className="card-text"><small className="text-muted">By {author} on {new Date(date).toGMTString()}</small></p>
            <a href={newsUrl} target = "_blank" rel="noreferrer" className="btn btn-dark btn-sm btn-primary">Read More</a>
        </div>
        </div>
      </div>
    )
  }
}

export default NewsItem
