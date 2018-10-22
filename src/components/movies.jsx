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
    currentPage: 1,
    selectedGenre: null
  };

  componentDidMount() {
    const genres = [{ name: "All Genres" }, ...getGenres()];

    this.setState({
      movies: MoviesAPI.getMovies(),
      genres
    });
  }

  renderMovies = movies => {
    const { currentPage, pageSize } = this.state;

    // paginate movies
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
    const { selectedGenre, movies } = this.state;

    // filtering movies
    const filteredMovies =
      selectedGenre && selectedGenre._id
        ? movies.filter(movie => movie.genre._id === selectedGenre._id)
        : movies;

    return this.state.movies.length ? (
      <div className="row">
        <div className="col-3">
          <ListGroup
            items={this.state.genres}
            onItemSelect={this.handleGenreSelect}
            selectedItem={this.state.selectedGenre}
          />
        </div>
        <div className="col">
          <h1 className="mg-3">
            Showing {filteredMovies.length} movies in the Database
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
            <tbody>{this.renderMovies(filteredMovies)}</tbody>
          </table>
          <Pagination
            onPageChange={this.handlePageChange}
            itemsCount={filteredMovies.length}
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

  handleGenreSelect = genre => {
    this.setState({
      selectedGenre: genre,
      currentPage: 1
    });
  };

  render() {
    return <React.Fragment>{this.renderContent()}</React.Fragment>;
  }
}

export default Movies;
