import React, { Component } from 'react';
import NewsItem from './NewsItem';

export default class News extends Component {
  constructor(props) {
    super(props);
    this.state = {
      articles: [],
      loading: true,
      page: 1,
      pageSize: 6,
      totalResults: 0,
    };
  }

  fetchNews = async (page) => {
    try {
      if (this.props.loadingBar) this.props.loadingBar.current.continuousStart();
      this.setState({ loading: true });

      // If searchQuery exists, use it; otherwise default API URL
      let url = this.props.searchQuery
        ? `https://newsapi.org/v2/everything?q=${encodeURIComponent(this.props.searchQuery)}&apiKey=f6943d3d905d48bdb7889b5680e52469&page=${page}&pageSize=${this.state.pageSize}`
        : `${this.props.apiUrl}&page=${page}&pageSize=${this.state.pageSize}`;

      let response = await fetch(url);
      let parsedData = await response.json();

      this.setState({
        articles: parsedData.articles,
        loading: false,
        totalResults: parsedData.totalResults,
        page: page,
      });

      if (this.props.loadingBar) this.props.loadingBar.current.complete();
    } catch (error) {
      console.error("Error fetching news:", error);
      this.setState({ loading: false });
      if (this.props.loadingBar) this.props.loadingBar.current.complete();
    }
  };

  componentDidMount() {
    this.fetchNews(this.state.page);
  }

  componentDidUpdate(prevProps) {
    // Refetch news if API URL or search query changes
    if (prevProps.apiUrl !== this.props.apiUrl || prevProps.searchQuery !== this.props.searchQuery) {
      this.fetchNews(1);
    }
  }

  handlePrevClick = () => {
    if (this.state.page > 1) this.fetchNews(this.state.page - 1);
  };

  handleNextClick = () => {
    const maxPage = Math.ceil(this.state.totalResults / this.state.pageSize);
    if (this.state.page < maxPage) this.fetchNews(this.state.page + 1);
    else alert("No more pages!");
  };

  render() {
    const { articles, loading, page, pageSize, totalResults } = this.state;
    const maxPage = Math.ceil(totalResults / pageSize);

    return (
      <div className="container my-4">
        <h1 className="mb-4">
          {this.props.searchQuery ? `Search results for "${this.props.searchQuery}"` : "The NewsHub - Top Headlines"}
        </h1>

        {loading && (
          <div className="text-center my-5">
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        )}

        <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
          {!loading && articles.length === 0 && <p className="text-center">No news articles found.</p>}

          {articles.map((element, index) => (
            <div className="col" key={index}>
              <NewsItem
                title={element.title}
                description={element.description}
                imageUrl={element.urlToImage}
                url={element.url}
              />
            </div>
          ))}
        </div>

        <div className="d-flex justify-content-between my-4">
          <button disabled={page <= 1} className="btn btn-dark" onClick={this.handlePrevClick}>&larr; Previous</button>
          <span className="align-self-center">Page {page} of {maxPage}</span>
          <button disabled={page >= maxPage} className="btn btn-dark" onClick={this.handleNextClick}>Next &rarr;</button>
        </div>
      </div>
    );
  }
}
