class MainApi {
  constructor(options) {
    this._baseUrl = options.baseUrl;
    this._headers = options.headers;
  }

  _getResponseData(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  }

  _request(url, options) {
    return fetch(url, options).then(this._getResponseData);
  }

  getInitialUserMovies() {
    return this._request(`${this._baseUrl}/movies/`, {
      credentials: "include",
      headers: this._headers,
    });
  }

  saveMovie(data) {
     return this._request(`${this._baseUrl}/movies/`, {
      method: "POST",
      credentials: "include",
      headers: this._headers,
      body: JSON.stringify({
        country: data.country,
        director: data.director,
        duration: data.duration,
        year: data.year,
        description: data.description,
        image: `https://api.nomoreparties.co${data.image.url}`,
        trailer: data.trailerLink,
        nameRU: data.nameRU,
        nameEN: data.nameEN,
        thumbnail: `https://api.nomoreparties.co${data.image.formats.thumbnail.url}`,
        movieId: data.id,        
      }),
    });
  }

  setLikes(idCard, isLiked) {
    return this._request(`${this._baseUrl}/cards/${idCard}/likes/`, {
      method: isLiked ? "PUT" : "DELETE",
      headers: this._headers,
      credentials: "include",
    });
  }

  deleteMovie(_id) {
    return this._request(`${this._baseUrl}/movies/${_id}/`, {
      method: "DELETE",
      headers: this._headers,
      credentials: "include",
    });
  }

  getInitialUserInfo() {
    return this._request(`${this._baseUrl}/users/me/`, {
      headers: this._headers,
      credentials: "include",
    });
  }

  editlUserInfo(data) {
    return this._request(`${this._baseUrl}/users/me/`, {
      method: "PATCH",
      headers: this._headers,
      credentials: "include",
      body: JSON.stringify({
        name: data.name,
        about: data.about,
      }),
    });
  }

  editAvatar(data) {
    return this._request(`${this._baseUrl}/users/me/avatar/`, {
      method: "PATCH",
      headers: this._headers,
      credentials: "include",
      body: JSON.stringify({
        avatar: data.avatar,
      }),
    });
  }
}
const token = localStorage.getItem("jwt");
const mainApi = new MainApi({
  baseUrl: "http://localhost:3000",
  credentials: "include",
  mode: 'no-cors',
  headers: {
    authorization: `Bearer ${token}`,
    "Content-Type": "application/json",
  },
});

export default mainApi;
