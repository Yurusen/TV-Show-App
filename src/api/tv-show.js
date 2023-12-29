import axios from "axios";
import { BASE_URL, API_KEY, BACKDROP_BASE_URL } from "./config";

export class TVShowAPI {
  static async fetchPopulars() {
    const response = await axios.get(`${BASE_URL}movie/now_playing${API_KEY}`
    );
    return response.data.results;
  }

  static async fetchRecommendations(tvShowID) {
    const response = await axios.get(
      `${BASE_URL}movie/${tvShowID}/recommendations${API_KEY}`
    );
    return response.data.results;
  }

  static async fetchByTitle(title) {
    const response = await axios.get(
      `${BASE_URL}search/movie${API_KEY}&query=${title}`
    );
    return response.data.results;
  }
}
