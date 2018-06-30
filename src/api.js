import axios from 'axios';

export default axios.create({
  baseURL: `http://project-clique.herokuapp.com/index.php/api/`
});
