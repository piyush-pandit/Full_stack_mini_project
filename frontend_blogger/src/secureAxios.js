import axios from "axios";

const secureAxios = axios.create({
  baseURL: "http://127.0.0.1:8000"
});

secureAxios.interceptors.response.use(
  (response) => {
    console.log("This link is working successfully!");
    return response;
  },
  (error) => {
    console.log(error)
    console.log("an error has occurred !");
    return Promise.reject(console.error);
  }
);

export default secureAxios;