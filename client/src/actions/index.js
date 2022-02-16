import axios from "axios";
export const GET_ALL="GET_ALL";
export const GET_BY_GENRE="GET_BY_GENRE";
export const GET_BY_CONDITION="GET_DB";
export const GET_DETAIL="GET_DETAIL";
export const GET_BY_NAME="GET_BY_NAME";
export const ADD_VIDEOGAME="ADD_VIDEOGAME";

export  function getAllVideogames (){
    console.log("Entra0");
    return async (dispatch)=>{
        let games = await axios.get("http://localhost:3001/videogames",{});
        return dispatch({type:GET_ALL, payload:games.data})
    }
}
export function getByGenre (){

}
export function getByCondition (){

}
export function getDetail (){

}
export function getByName (){

}
export function addVideogame (){

}