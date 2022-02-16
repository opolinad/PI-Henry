import {GET_ALL, GET_BY_GENRE, GET_BY_CONDITION, GET_DETAIL, GET_BY_NAME, ADD_VIDEOGAME} from "../actions";

const initialState = {
    videogames:[],
    genre:[]
}

function reducer (state=initialState, action){
    switch (action.type) {
        case GET_ALL:
            return {...state, videogames:action.payload}
        default:
            return state;
    }
}

export default reducer;