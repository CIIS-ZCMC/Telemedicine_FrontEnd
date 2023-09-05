import axios from "axios";

let baseURL = "http://localhost:8000/api/";
// let baseURL = "https://zcmc-development.online/api/";
// let baseURL = "/api/";

const api = new axios.create({
  baseURL: baseURL,
  withCredentials: true,
  crossDomain: true,
  headers: {
    Accept: "application/json",
    "content-type": "application/json",
  },
});

//Reusable Get Module
export const GetRequest = async ({ url }, token) => {
  return await api.get(url, { cancelToken: token });
};

//Reusable Post Module
export const PostRequest = async ({ url }, data) => {
  return await api.post(url, data);
};

//Reusable Put Module
export const PutRequest = async ({ url }, data) => {
  return await api.put(url, data);
};

//Reusable Delete Module
export const DeleteRequest = async ({ url }, data) => {
  return await api.delete(url, data);
};

export default api;
