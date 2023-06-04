import React, { useEffect, useState } from 'react';
import NewsItem from './NewsItem';
import Spinner from './Spinner';
import PropTypes from 'prop-types';
import InfiniteScroll from "react-infinite-scroll-component";

function News(props){
    
    const [articles, setarticles] = useState([]);
    const [loading, setloading] = useState(false);
    const [page, setpage] = useState(1);
    const [totalResults, settotalResults] = useState(0);
    
    const capitalizeFirstLetter=(string)=> {
        return string.charAt(0).toUpperCase() + string.slice(1);
    } 

     const UpdateNews= async ()=>{
        props.setProgress(10);
        const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page}&pageSize=${props.pageSize}`;
        setloading(true);
        props.setProgress(30);
        let data = await fetch(url);
        let parsedata = await data.json();
        props.setProgress(70);
       
        setarticles(parsedata.articles);
        settotalResults(parsedata.totalResults);
        setloading(false);

        props.setProgress(100);
    }
 
    useEffect(() => {   
        document.title = `NewsCards - ${capitalizeFirstLetter(props.category)}`
        UpdateNews();
        // eslint-disable-next-line
    },[]);

    const fetchMoreData = async () => {
        setpage(page+1);
        const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page + 1}&pageSize=${props.pageSize}`;
        setloading(true);
        let data = await fetch(url);
        let parsedata = await data.json();
        setarticles(articles.concat(parsedata.articles));
        settotalResults(parsedata.totalResults);
        setloading(false);
    }

    return (
      <>
      <div className='dark'>
        <InfiniteScroll
          dataLength={articles.length}
          next={fetchMoreData}
          hasMore={articles.length !== totalResults}  //define for how long news to be shown
          loader={loading && <Spinner/>}>
        <div className='container'>
        <h2 className='text-center text-white' >NewsCards - Top {capitalizeFirstLetter(props.category)} Headlines</h2>
        {loading && <Spinner/>}
            <div className='row my-3'>
                {articles.map((element)=>{
                    return <div className='col-md-4 ' key = {element.url}>
                    <NewsItem title = {element.title?element.title.slice(0,45):""} description = {element.description?element.description.slice(0,88):""} ImageUrl = {element.urlToImage} newsUrl = {element.url} author={element.author?element.author:"Unknown"} date = {element.publishedAt} source = {element.source.name}/>
                    </div>
                })}
            </div>
        </div>
        </InfiniteScroll>
        </div>
      </>
    )
  
}

News.defaultProps = {
    country: 'in',
    pagesize: 8,
    category: "general"
}

News.propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string

}


export default News
