require('dotenv').config();
const {API_KEY} = process.env;
const axios = require("axios");
const { Genre } = require("../db");

const getAllGenres=async()=>{
    try {
        let result=await axios.get(`https://api.rawg.io/api/genres?key=${API_KEY}`);
        let genres=result.data.results;
        genres.forEach(genre => {
            Genre.findOrCreate({
                where:{
                    id:genre.id,
                    name:genre.name
                }});
        });
    } catch (error) {
        console.error(error);
    }
}

module.exports={
    getAllGenres
}