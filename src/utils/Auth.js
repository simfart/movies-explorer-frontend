import { BASE_URL } from "./constants";

function request(url, method, body, token) {
  const headers = {
    Accept: "application/json",
    "Content-Type": "application/json",
  };
  if (token) {
    console.log('token', token)
    headers["Authorization"] = `Bearer ${token}`;
    console.log('token', token)
  }
  const config = {
    method,
    credentials: 'include',
    headers,
  };

  if (body !== undefined) {
    config.body = JSON.stringify(body);
  }
  function getResponseData(res) {
    if (res.ok) {
      return res.json();
    }
    return res.json().then((err) => Promise.reject(err));;
  }

  return fetch(`${BASE_URL}${url}`, config).then(getResponseData);
}


// export const BASE_URL = "https://api.artmovies.nomoredomains.rocks" 

export const register = (data) => {
  return request("/signup", "POST", {
    name: data.name,
    email: data.email,
    password: data.password,
  });
};

export const authorize = (email, password) => {
  return request("/signin", "POST", { email, password });
};

export const checkToken = () => {
  return request("/users/me", "GET");
};

export const logout = () => {
  return request("/signout", "GET");
};
