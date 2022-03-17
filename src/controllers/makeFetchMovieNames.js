import { TMDB_API } from '../config/tmdb.js'
import axios from 'axios'

export default function makeFetchMovieNames() {
  return async function FetchMovieNames(req, res) {
    const { query } = req.params
    const movies = await axios.get(`
      https://api.themoviedb.org/3/search/multi?api_key=${TMDB_API}&language=hi-IN&page=1&include_adult=false&query=${query}`)
    const movieNames = movies.data.results
      .map((m) => ({
        photo: `https://image.tmdb.org/t/p/original/${m.poster_path}`,
        title: m.title || m.original_title,
      }))
      .filter((m) => m !== undefined)
    res.status(200).json({ movieNames })
  }
}
