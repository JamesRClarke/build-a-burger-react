import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://burger-builder-react-a9dcd.firebaseio.com/'
})

export default instance;
