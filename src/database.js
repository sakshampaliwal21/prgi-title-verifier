const titles=require('../data/titles.json');

function getTitles(){
return titles;
}

function searchTitles(query){
return titles.filter(title=>title.toLowerCase().includes(query.toLowerCase()));
}

module.exports={getTitles,searchTitles};
