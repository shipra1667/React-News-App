import React, { Component } from 'react'
import NewsItem from './NewsItem'
// import Spinner from './Spinner';
import InfiniteScroll from "react-infinite-scroll-component";

export class NewsComponent extends Component {

  noMoreData;

  constructor(props){
    super(props);
    this.state = {
      articles : [],
      loading : false,
      page : 1,
      totalResults : 0
    }
  }

  capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  async updateNews(){
    this.props.progressState(10);
    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page}&pageSize=${this.props.pageSize}`
    this.setState({loading: true})
    let data = await fetch(url);
    this.props.progressState(40);
    let parsedData = await data.json();
    this.props.progressState(80);
    this.setState({articles : parsedData.articles, totalResults: parsedData.totalResults, loading: false});
    document.title = `${this.capitalizeFirstLetter(this.props.category)} - UTV9`
    this.props.progressState(100);
  }

  async componentDidMount(){
    this.updateNews();    
  }

  handlePrevClick = async () => {
    // console.log('Previous');
    // let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=08c77bb3789c43e2ad9f11fa5068fcb1&page=${this.state.page - 1}&pageSize=${this.props.pageSize}`
    // this.setState({loading: true})
    // let data = await fetch(url);
    // let parsedData = await data.json();
    this.setState({page: this.state.page - 1})
    this.updateNews()
  }

  handleNextClick = async () => {
    // console.log('Next')
    // let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=08c77bb3789c43e2ad9f11fa5068fcb1&page=${this.state.page + 1}&pageSize=${this.props.pageSize}`
    // this.setState({loading: true})
    // let data = await fetch(url);
    // let parsedData = await data.json();
    this.setState({page: this.state.page + 1})
    this.updateNews()
  }

  fetchMoreData = async() => {
    this.setState({page: this.state.page + 1})
    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page}&pageSize=${this.props.pageSize}`
    this.setState({loading: true})
    let data = await fetch(url);
    let parsedData = await data.json();
    this.noMoreData = parsedData.articles.length;
    this.setState({articles : this.state.articles.concat(parsedData.articles), totalResults: parsedData.totalResults, loading: false});
  }

  render() {
    return (
      <div className='container my-3'>
        <h2 className='text-center'> UTV9 - Top Headlines {this.capitalizeFirstLetter(this.props.category)}</h2>
        {/* {<Spinner/>} */}
            <InfiniteScroll
              dataLength={this.state.articles.length}
              next={this.fetchMoreData}
              hasMore={this.state.articles.length !== this.state.totalResults}
              loader={this.noMoreData === 0 ? '' : <h4>Loading...</h4>}>
              <div className='container'>
                <div className='row'>
                  {this.state.articles.map((element) => {
                    return <div className='col-md-4 my-3' key={element.url}>
                    <NewsItem title={element.title?element.title.slice(0, 45):''} description={element.description?element.description.slice(0, 88):''} 
                    imageUrl={element.urlToImage} newsUrl={element.url} author={element.author?element.author:'Unknown'} dateTime={new Date(element.publishedAt).toGMTString()}/>
                  </div>
                  })}
                </div>
              </div>
            </InfiniteScroll>
        {/* <div className='container d-flex justify-content-between'>
          <button disabled={this.state.page<=1} type='button' className='btn btn-dark' onClick={this.handlePrevClick}>&larr; Previous</button>
          <button disabled={this.state.page + 1 > Math.ceil(this.state.totalResults/this.props.pageSize)} className='btn btn-dark' type='button' onClick={this.handleNextClick}>Next &rarr;</button>
        </div> */}
      </div>
    )
  }
}

export default NewsComponent
