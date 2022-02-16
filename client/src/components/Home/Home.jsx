import React, {useEffect  } from "react";
import {Link} from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux'
import {getAllVideogames} from "../../actions"

export default function Home(){
    const dispatch = useDispatch();
    const videogames=useSelector((state)=>state.videogames);
    useEffect(()=>{
        dispatch(getAllVideogames());
    },[])
    return(
        <div>
            {videogames.map((game, index)=><p key={index}>{game.name}</p>)}
        </div>
    );
}