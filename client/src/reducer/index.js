import { bindActionCreators } from "redux";
import {GET_ALL,GET_BY_GENRE, GET_BY_CONDITION, GET_DETAIL, GET_BY_NAME, GET_ALL_GENRES, ADD_VIDEOGAME, ORDER, RESULTS_PAGE} from "../actions";

const initialState = {
    videogames:[],
    videogamesFilter:[],
    genres:[],
    gameDetail:{},
}

function reducer (state=initialState, action){
    let data;
    switch (action.type) {
        case GET_ALL:
            return {...state, videogames:action.payload, videogamesFilter:action.payload};
        case GET_BY_GENRE:
            data=action.payload?state.videogames.filter(game=>game.genres.includes(action.payload)):state.videogames;
            return {...state, videogamesFilter:data};
        case GET_BY_CONDITION:
            data=action.payload==="created"?
            state.videogames.filter(game=>game.created):
            state.videogames.filter(game=>!game.created);
            console.log(data);
            return {...state, videogamesFilter:data};
        case GET_DETAIL:
            return {...state, gameDetail:action.payload};
        case GET_BY_NAME:
            return {...state, videogames:action.payload};
        case GET_ALL_GENRES:
            return {...state, genres:action.payload};
        case ADD_VIDEOGAME:
            return {...state, videogames:action.payload};
        case ORDER:
            state.videogamesFilter=[...state.videogames];
            switch (action.payload) {
                case "a-z":
                    state.videogamesFilter.sort((a,b)=>{
                        let nameA=a.name.toUpperCase();
                        let nameB=b.name.toUpperCase();
                        if (nameA < nameB) {
                            return -1;
                            }
                            if (nameA > nameB) {
                            return 1;
                            }
                            return 0;
                    })
                    break;
                case "z-a":
                    state.videogamesFilter.sort((a,b)=>{
                        let nameA=a.name.toUpperCase();
                        let nameB=b.name.toUpperCase();
                        if (nameA > nameB) {
                            return -1;
                            }
                            if (nameA < nameB) {
                            return 1;
                            }
                            return 0;
                    })
                    break;
                case "rating-asc":
                    state.videogamesFilter.sort((a,b)=>a.rating-b.rating)
                    break;
                case "rating-des":
                    state.videogamesFilter.sort((a,b)=>b.rating-a.rating)
                    break;
            }
            return {...state, videogamesFilter:state.videogamesFilter};
        default:
            return state;
    }
}
export default reducer;