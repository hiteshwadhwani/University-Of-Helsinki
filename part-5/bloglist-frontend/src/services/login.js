import axios from 'axios'
const baseUrl = '/api/login'

const login =  async (loginObj) => {
    const request = await axios.post(baseUrl , loginObj);
    return request.data;
}

export default {login}