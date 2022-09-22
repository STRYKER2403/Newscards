import React, { Component } from 'react';
import NewsItem from './NewsItem';
import Spinner from './Spinner';
import PropTypes from 'prop-types';
import InfiniteScroll from "react-infinite-scroll-component";


export class News extends Component {
    
    static defaultProps = {
        country: 'in',
        pagesize: 8,
        category: "general"
    }

    static propTypes = {
        country: PropTypes.string,
        pageSize: PropTypes.number,
        category: PropTypes.string

    }
    
    capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    constructor(props){
        super(props);
        this.state = {
             articles: [],
             loading: false,
             page:1,
             totalResults :0
        }

        document.title = `NewsCards - ${this.capitalizeFirstLetter(this.props.category)}`
    }
    
    

    async UpdateNews(){
        this.props.setProgress(10);
        let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page}&pageSize=${this.props.pageSize}`;
        this.setState({loading:true});
        this.props.setProgress(30);
        let data = await fetch(url);
        let parsedata = await data.json();
        this.props.setProgress(70);
        // console.log(this.state.page);
       
        this.setState({
            articles : parsedata.articles,
            totalResults : parsedata.totalResults,
            loading:false
        });
        this.props.setProgress(100);
    }

    async componentDidMount(){
        this.UpdateNews();
    }

    fetchMoreData = async () => {
        this.setState({ page : this.state.page + 1 });
        // console.log(this.state.page);
        let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page + 1}&pageSize=${this.props.pageSize}`;
        this.setState({loading:true});
        let data = await fetch(url);
        let parsedata = await data.json();
        this.setState({
            articles : this.state.articles.concat(parsedata.articles),
            totalResults : parsedata.totalResults,
            loading:false
        });
        
    }

    

  render() {
    
    return (
      <>
        <h2 className='text-center my-3'>NewsCards - Top {this.capitalizeFirstLetter(this.props.category)} Headlines</h2>

        {this.state.loading && <Spinner/>}
        
        <InfiniteScroll
          dataLength={this.state.articles.length}
          next={this.fetchMoreData}
          hasMore={this.state.articles.length !== this.state.totalResults}  //define for how long news to be shown
          loader={this.state.loading && <Spinner/>}>
        <div className='container'>
        
            <div className='row my-3' >
                {this.state.articles.map((element)=>{
                    return <div className='col-md-4' key = {element.url}>
                    <NewsItem title = {element.title?element.title.slice(0,45):""} description = {element.description?element.description.slice(0,88):""} ImageUrl = {element.urlToImage} newsUrl = {element.url} author={element.author?element.author:"Unknown"} date = {element.publishedAt} source = {element.source.name}/>
                    </div>
                })}
            </div>
        </div>
        </InfiniteScroll>
      
      </>
    )
  }
}

export default News
