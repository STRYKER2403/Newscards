import React, { Component } from 'react'

export class NewsItem extends Component {

  render() {
    let {title,description,ImageUrl,newsUrl} = this.props;
    return (
      <div>
        <div className="card my-3">
        <img src={ImageUrl?ImageUrl:"https://resize.indiatvnews.com/en/resize/newbucket/715_-/2022/09/smartwatch-pixabay-1663594523.jpg"} className="card-img-top" alt="..."/>
        <div className="card-body">
            <h5 className="card-title">{title}...</h5>
            <p className="card-text">{description}...</p>
            <a href={newsUrl} target = "_blank" rel="noreferrer" className="btn btn-dark btn-sm btn-primary">Read More</a>
        </div>
        </div>
      </div>
    )
  }
}

export default NewsItem
