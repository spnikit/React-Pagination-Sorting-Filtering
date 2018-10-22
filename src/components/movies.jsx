import React, { Component } from "react";

import * as MoviesAPI from "../services/fakeMovieService";
import { getGenres } from "../services/fakeGenreService";
import HeartIcon from "./heartIcon";
import Pagination from "./common/pagination";
import ListGroup from "./common/listGroup";

import { paginate } from "../utils/paginator";

class Movies extends Component {
  state = {
    movies: [],
    genres: [],
    pageSize: 4,
    currentPage: 1
  };

  componentDidMount() {
    this.setState({
      movies: MoviesAPI.getMovies(),
      genres: getGenres()
    });
  }

  renderMovies = page => {
    const { movies, currentPage, pageSize } = this.state;

    const moviesPaginated = paginate(movies, currentPage, pageSize);

    return moviesPaginated.map(movie => {
      const {
        _id,
        title,
        genre: { name },
        numberInStock,
        dailyRentalRate,
        liked
      } = movie;

      return (
        <tr key={_id}>
          <td>{title}</td>
          <td>{name}</td>
          <td>{numberInStock}</td>
          <td>{dailyRentalRate}</td>
          <td>
            <HeartIcon liked={liked} onLike={() => this.handleLike(movie)} />
          </td>
          <td>
            <button
              className="btn btn-danger"
              onClick={() => this.handleDelete(_id)}
            >
              Delete
            </button>
          </td>
        </tr>
      );
    });
  };

  renderContent = () => {
    return this.state.movies.length ? (
      <div className="row">
        <div className="col-2">
          <ListGroup
            items={this.state.genres}
            onItemSelect={this.handleGenreSelect}
          />
        </div>
        <div className="col">
          <h1 className="mg-3">
            Showing {this.state.movies.length} movies in the Database
          </h1>
          <table className="table">
            <thead>
              <tr>
                <th scope="col">Title</th>
                <th scope="col">Genre</th>
                <th scope="col">Stock</th>
                <th scope="col">Rate</th>
                <th scope="col">#</th>
              </tr>
            </thead>
            <tbody>{this.renderMovies()}</tbody>
          </table>
          <Pagination
            onPageChange={this.handlePageChange}
            itemsCount={this.state.movies.length}
            pageSize={this.state.pageSize}
            currentPage={this.state.currentPage}
          />
        </div>
      </div>
    ) : (
      <h1>There are no movies in the Database</h1>
    );
  };

  handleDelete = id => {
    MoviesAPI.deleteMovie(id);
    this.setState({
      movies: MoviesAPI.getMovies() || []
    });
  };

  handleLike = movie => {
    const movies = this.state.movies.map(m => {
      if (movie._id === m._id) {
        m.liked = !m.liked;
        return m;
      }
      return m;
    });

    this.setState({ movies });
  };

  handlePageChange = page => {
    this.setState({ currentPage: page });
  };

  render() {
    return <React.Fragment>{this.renderContent()}</React.Fragment>;
  }
}

export default Movies;
