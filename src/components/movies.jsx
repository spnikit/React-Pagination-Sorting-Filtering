import React, { Component } from "react";

import * as MoviesAPI from "../services/fakeMovieService";
import { getGenres } from "../services/fakeGenreService";
import Pagination from "./common/pagination";
import ListGroup from "./common/listGroup";
import MoviesTable from "./moviesTable";
import { paginate } from "../utils/paginator";
import _ from "lodash";

class Movies extends Component {
  state = {
    movies: [],
    genres: [],
    pageSize: 4,
    currentPage: 1,
    selectedGenre: null,
    sortColumn: { path: "title", order: "asc" }
  };

  componentDidMount() {
    const genres = [{ _id: "", name: "All Genres" }, ...getGenres()];

    this.setState({
      movies: MoviesAPI.getMovies(),
      genres,
      selectedGenre: genres[0]
    });
  }

  renderContent = () => {
    const {
      selectedGenre,
      movies,
      currentPage,
      pageSize,
      sortColumn
    } = this.state;

    if (movies.length === 0) {
      return <h1>There are no movies in the Database</h1>;
    }

    // filtering movies
    const filteredMovies =
      selectedGenre && selectedGenre._id
        ? movies.filter(movie => movie.genre._id === selectedGenre._id)
        : movies;

    const sortedMovies = _.orderBy(
      filteredMovies,
      [sortColumn.path],
      [sortColumn.order]
    );

    const moviesPaginated = paginate(sortedMovies, currentPage, pageSize);

    return (
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
          <MoviesTable
            movies={moviesPaginated}
            onLike={this.handleLike}
            onDelete={this.handleDelete}
            onSort={this.handleSort}
            sortColumn={sortColumn}
          />
          <Pagination
            onPageChange={this.handlePageChange}
            itemsCount={filteredMovies.length}
            pageSize={this.state.pageSize}
            currentPage={this.state.currentPage}
          />
        </div>
      </div>
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

  handleSort = sortColumn => {
    this.setState({ sortColumn });
  };

  render() {
    return <React.Fragment>{this.renderContent()}</React.Fragment>;
  }
}

export default Movies;
