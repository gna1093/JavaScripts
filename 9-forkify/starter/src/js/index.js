import Search from './modules/Search';

/* Global stae of the app
search object
current obecr receipe
shopping list object
liked recipes
*/
const state = {}

const search = new Search('pizza');
console.log(search);
search.getResult()
