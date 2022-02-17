import React, {useEffect, useState  } from "react";
import {Link} from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux'
import {getAllVideogames, getAllGenres} from "../../actions"
import Card from "../Card/Card";
import Filter from "../Filter/Filter";
import NavBar from "../NavBar/NavBar";

export default function Home(){
    const dispatch = useDispatch();
    const videogames=useSelector((state)=>state.videogamesFilter);
    const [gamesToShow, setGamesToShow]=useState(10);
    const [resultsPerPage, setResultsPerPage]=useState(15);
    useEffect(()=>{
        dispatch(getAllVideogames(gamesToShow));
        dispatch(getAllGenres());
    },[gamesToShow,resultsPerPage])
    function modifyGamesToShow (games){
        setGamesToShow(games);
    }
    function modifyResultsPerPage (results){
        setResultsPerPage(results);
    }
    return(
        <div>
            <NavBar/>
            <Filter modifyGamesToShow={modifyGamesToShow} modifyResultsPerPage={modifyResultsPerPage} gamesToShow={gamesToShow}/>
            <p>Acá se supone que van los videojuegos</p>
            {videogames.map((game, index)=><Card key={index} name={game.name} img={game.img} genres={game.genres} rating={game.rating}/>)}
        </div>
    );
}