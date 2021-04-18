import http from "./httpService";

export function getJewels() {
  return http.get("http://localhost:3000/api/jewels/").then((res) => {
    return res.data;
  });
}

export function getJewel(id) {
  return http
    .put(`http://localhost:3000/api/jewels/jewel`, { id: id })
    .then((res) => {
      return res.data;
    });
}

export function getStones() {
  return http.get("http://localhost:3000/api/stones/").then((res) => {
    return res.data;
  });
}

export function getMetals() {
  return http.get("http://localhost:3000/api/metals/").then((res) => {
    return res.data;
  });
}

export function getPieces() {
  return http.get("http://localhost:3000/api/pieces/").then((res) => {
    return res.data;
  });
}

export function getTypes() {
  return http.get("http://localhost:3000/api/types/").then((res) => {
    return res.data;
  });
}

export function getUserJewels(userId) {
  return http.post("http://localhost:3000/api/users/jewels", { userId });
}

export function postJewels(newJewel, userToken) {
  console.log("received", newJewel);
  return http
    .post("http://localhost:3000/api/jewels/add", newJewel, {
      headers: {
        "x-auth-token": userToken,
        action: "/multiple-upload",
        enctype: "multipart/form-data",
        "Content-type": "application/json",
      },
    })
    .then((res) => {
      return res.data;
    });
}

export function deleteJewel(jewelId, userToken) {
  console.log(jewelId, userToken, "jewelId nd Usertoken");
  return http
    .delete(`http://localhost:3000/api/jewels/delete/${jewelId}`, {
      headers: {
        "x-auth-token": userToken,
      },
    })
    .then((res) => {
      return res.data;
    });
}

export function registerUser(user) {
  return http.post("http://localhost:3000/api/users/", user).then((res) => {
    return res;
  });
}

export function login(email, password) {
  return http.post("http://localhost:3000/api/auth/", { email, password });
}
