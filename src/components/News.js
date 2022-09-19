import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';
import PropTypes from 'prop-types'


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

    constructor(){
        super();
        console.log("hello constructor")
        this.state = {
             articles: [],
             loading: false,
             page:1
        }
    }

    async componentDidMount(){
        let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=8930c85f3d514c8e97f5680deeb003a9&page=1&pageSize=${this.props.pageSize}`;
        this.setState({loading:true});
        let data = await fetch(url);
        let parsedata = await data.json();
        // console.log(parsedata);
        this.setState({
            articles : parsedata.articles,
            totalResults : parsedata.totalResults,
            loading:false
        });
    }
    
    HandlePrev = async ()=>{
        console.log("Previous");
        let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category =${this.props.category}&apiKey=8930c85f3d514c8e97f5680deeb003a9&page=${this.state.page - 1}&pageSize=${this.props.pageSize}`
        this.setState({loading:true});
        let data = await fetch(url);
        let parsedata = await data.json();

        this.setState({
            articles : parsedata.articles,
            page : this.state.page - 1,
            loading:false
        });

    }

    HandleNext = async ()=>{
        if(!(this.state.page + 1 > Math.ceil(this.state.totalResults/this.props.pageSize)))
        {
            console.log("Next");
            let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category =${this.props.category}&apiKey=8930c85f3d514c8e97f5680deeb003a9&page=${this.state.page + 1}&pageSize=${this.props.pageSize}`
            this.setState({loading:true});
            let data = await fetch(url);
            let parsedata = await data.json();

            this.setState({
                articles : parsedata.articles,
                page : this.state.page + 1,
                loading:false
            });
        }
    }
    

  render() {
    
    return (

      <div className="container my-3">
        <h2 className='text-center'>NewsCards - Top Headlines</h2>

        {this.state.loading && <Spinner/>}
        
        <div className='row my-3' >
            {!this.state.loading && this.state.articles.map((element)=>{
                return <div className='col-md-4' key = {element.url}>
                <NewsItem title = {element.title?element.title.slice(0,45):""} description = {element.description?element.description.slice(0,88):""} ImageUrl = {element.urlToImage} newsUrl = {element.url}/>
                </div>
            })}
        </div>
        
        <div className='container d-flex justify-content-between'>
            <button disabled = {this.state.page<=1} type="button" className="btn btn-dark" onClick={this.HandlePrev}>&larr; Previous</button>
            <button disabled = {this.state.page + 1 > Math.ceil(this.state.totalResults/this.props.pageSize)} type="button" className="btn btn-dark" onClick={this.HandleNext}>Next &rarr;</button>
        </div>
      </div>
    )
  }
}

export default News
