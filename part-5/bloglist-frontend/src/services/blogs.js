import axios from 'axios'
const baseUrl = '/api/blogs'

let token;
const setToken = (newToken) => {
  token = `bearer ${newToken}`;
} 

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}
const create = async (newObj) => {
  const config = {
    headers: {authorization: token}
  }
  const response = await axios.post(baseUrl , newObj , config);
  return response.data;
}
const update = async (newObj) => {
  const response = await axios.put(`${baseUrl}/${newObj.id}` , newObj)
  return response.data;
}
const deleteBlog = async (id) => {
  const config = {
    headers: {authorization: token}
  }
    axios.delete(`${baseUrl}/${id}` , config);
}


export default { getAll , create , setToken , update , deleteBlog}