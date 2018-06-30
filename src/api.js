import axios from 'axios';

export default axios.create({
  baseURL: `https://project-clique.herokuapp.com/index.php/api/`
});
