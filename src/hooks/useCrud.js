import axios from "axios";
import { useState } from "react";
const urlBase = 'https://api.escuelajs.co/api/v1';

const useCrud = () => {
  const [apiData, setApiData] = useState();
  // leer
  const getApi = (path) => {
    const url = `${urlBase}${path}`;
    axios.get(url)
        .then(res => setApiData(res.data))
        .catch(err => console.log(err));
  }
  // crear
  const postApi = (path, data) => {
    const url = `${urlBase}${path}`;
    axios.post(url, data)
      .then(res => {
        // console.log(res.data);
        setApiData(res.data);
      })
      .catch(err => {
        // console.log(err.response.data);
        setApiData(err.response.data);
      });
  }
  return [apiData, getApi, postApi];
}

export default useCrud;