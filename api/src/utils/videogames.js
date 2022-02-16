require('dotenv').config();
const {API_KEY} = process.env;
const axios = require("axios");
const { Videogame, Genre } = require('../db')

const getAllVideogames=async (numGames=100)=>{
    try {
        let result=await axios.get(`https://api.rawg.io/api/games?key=${API_KEY}`);
        let games=[];
        games=[...await Videogame.findAll({include:Genre}), ...result.data.results]
        for (let i = 0; i < Math.ceil(numGames/20)-1; i++) {
            result=await axios.get(result.data.next);
            games=[...games, ...result.data.results]
        }
        if(games.length!==numGames){
            games=games.slice(0,numGames)
        }
        return games.map(game=>({
            name:game.name,
            img:game.background_image,
            genres: game.genres.map(genre=>genre.id).join(" "),
            rating: game.rating
        }))
    } catch (error) {
        console.log(error);
    }
}
const getVideogamesByName = async (name)=>{
    try {
        let result=await axios.get(`https://api.rawg.io/api/games?search=${name}&key=${API_KEY}`);
        let games = result.data.results;
        if (games.length>15){
            games=games.slice(0,15);
        }else if (!games.length){
            return "No se ha encontrado ningún juego que coincida con los parámetros de búsqueda"
        }
        return games.map(game=>({
            name:game.name,
            img:game.background_image,
            genres: game.genres.map(genre=>genre.id).join(" "),
            rating: game.rating
        }));
    } catch (error) {
        console.log(error);
    }
}

module.exports={
    getAllVideogames,
    getVideogamesByName
}