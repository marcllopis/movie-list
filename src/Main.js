import React, { Component } from 'react';

import Movie from './Movie'


class Main extends Component {

  state = {
    movies: [],
    favorites: [],
    randomMovie: {},
    isLoading: true
  }

  componentDidMount() {
    fetch('https://raw.githubusercontent.com/wildcodeschoolparis/datas/master/movies.json')
      .then(res => res.json())
      .then(data => this.setState({
        movies: data.movies,
        isLoading: false
      }))
  }

  addToFavorites = event => {
    window.scrollTo(0, 0)

    let selectedMovie = this.state.movies[event.target.id]

    if (this.state.favorites.find(duplicate => duplicate === selectedMovie)) {
      alert('You have already added that movie!')
    } else {
      let myFavorites = [...this.state.favorites]
      myFavorites.push(selectedMovie)
      this.setState({
        favorites: myFavorites
      })
    }
  }

  removeFromFavorites = event => {
    let myFavorites = [...this.state.favorites]

    myFavorites.splice(event.target.id, 1)

    this.setState({
      favorites: myFavorites
    })
  }

  pickRandomMovie = () => {
    const randomIndex = Math.floor(Math.random() * this.state.favorites.length)
    const randomMovie = this.state.favorites[randomIndex]
    console.log(randomMovie)
    this.setState({
      randomMovie
    }, ()=> {
      this.props.history.push({
        pathname: '/random',
        state: {
          randomMovie:this.state.randomMovie
        }
      })
    })
  }


  render() {
    return (
      <div>
        {this.state.isLoading
          ? <h2>Loading all movies...</h2>
          :
          <div>
            {
              this.state.favorites.length > 0 &&
              <div>
                <h3>Your favorites</h3>
                <button onClick={this.pickRandomMovie}>Pick a random movie</button>
                {
                  this.state.favorites.map((movie, index) =>
                    <div key={index}>
                      <Movie
                        title={movie.title}
                        year={movie.year}
                        director={movie.director}
                        plot={movie.plot}
                        action={this.removeFromFavorites}
                        index={index}
                        remove
                      />
                    </div>)
                }
              </div>
            }
            <h1>List of movies</h1>
            {
              this.state.movies.map((movie, index) =>
                <div key={index}>
                  <Movie
                    title={movie.title}
                    year={movie.year}
                    director={movie.director}
                    plot={movie.plot}
                    action={this.addToFavorites}
                    index={index}
                    add
                  />
                </div>
              )
            }
          </div>
        }
      </div>
    );
  }
}

export default Main;
