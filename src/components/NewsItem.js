import React from 'react'

function NewsItem(props){
    let {title,description,ImageUrl,newsUrl,author,date,source} = props;
    return (
      <div>  
        <div className="card my-3 text-white bg-dark">
        <div>  
        <span className="position-absolute badge rounded-pill bg-danger" style={{right:"0"}}>{source}</span>
        </div>
        <img src={ImageUrl?ImageUrl:"https://resize.indiatvnews.com/en/resize/newbucket/715_-/2022/09/smartwatch-pixabay-1663594523.jpg"} className="card-img-top" alt="..."/>
        <div className="card-body">
            <h5 className="card-title">{title}...</h5>
            <p className="card-text">{description}...</p>
            <p className="card-text"><small className="text-muted">By {author} on {new Date(date).toGMTString()}</small></p>
            <a href={newsUrl} target = "_blank" rel="noreferrer" className="btn btn-light btn-sm btn-primary">Read More</a>
        </div>
        </div>
      </div>
    )
}

export default NewsItem
