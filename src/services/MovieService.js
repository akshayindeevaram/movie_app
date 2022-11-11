const axios = require('axios').default;
// import axios from 'axios';
import LANGUAGES from '../constants/Languages';
import {
  TMDB_BASE_URL,
  TMDB_IMAGE_BASE_URL,
  TMDB_API_KEY,
  END_POINTS,
  YOUTUBE_BASE_URL
} from '../constants/Urls';

const TMDB_HTTP_REQUEST = axios.create({
  baseURL: TMDB_BASE_URL,
  params: {
    api_key: TMDB_API_KEY,
  },
});

// const TMDB_HTTP_REQUEST = axios({
//   url: TMDB_BASE_URL,
//   data: {
//     api_key: TMDB_API_KEY,
// }})
const getNowPlayingMovies = () =>
  TMDB_HTTP_REQUEST.get(END_POINTS.NOW_PLAYING_MOVIES);

const getUpcomingMovies = () =>
  TMDB_HTTP_REQUEST.get(END_POINTS.UPCOMING_MOVIES);

const getMovieById = (movieId, append_to_response="")  =>
  TMDB_HTTP_REQUEST.get(`${END_POINTS.MOVIE}/${movieId}`, append_to_response?{params:{append_to_response}}:null);

const getAllGenres = () => TMDB_HTTP_REQUEST.get(END_POINTS.GENRES);

const getPoster = path => `${TMDB_IMAGE_BASE_URL}/original${path}`;
const getVideo = (key) => `${YOUTUBE_BASE_URL}?v=${key}`;

const getLanguage = language_iso =>
  LANGUAGES.find(language => language.iso_639_1 === language_iso);

export {
  getNowPlayingMovies,
  getUpcomingMovies,
  getPoster,
  getLanguage,
  getAllGenres,
  getMovieById,
  getVideo
};
