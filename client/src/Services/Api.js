import Config from '../Config/AppConfig';

export default {
  // Functions return fixtures
  search: (term='hello') => {
    console.log(term)
    return fetch(`${Config.API_BASE_URL}/search/${encodeURI(term)}`, {
      method: 'GET'
    })
    .then(res => {
      return res.json();
    })
    .then(res => {
      return res;
    });
  }
};