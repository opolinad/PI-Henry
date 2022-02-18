import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux'
import { getAllVideogames, getAllGenres } from "../../actions"
import Card from "../Card/Card";
import Filter from "../Filter/Filter";
import NavBar from "../NavBar/NavBar";
import Pages from "../Pages/Pages";

export default function Home() {
    const dispatch = useDispatch();
    const videogames = useSelector((state) => state.videogamesFilter);
    const [gamesToShow, setGamesToShow] = useState(15);
    const [resultsPerPage, setResultsPerPage] = useState(15);
    const [actualPage, setActualPage] = useState(1);
    const [ordered, setOrdered] = useState(false);
    useEffect(() => {
        dispatch(getAllVideogames(gamesToShow));
        dispatch(getAllGenres());
        setOrdered(false);
    },[gamesToShow,resultsPerPage])
    function modifyGamesToShow(games) {
        setGamesToShow(games);
    }
    function modifyResultsPerPage(results) {
        setResultsPerPage(results);
    }
    function modifyActualPage(page) {
        setActualPage(page);
    }
    function onClickGameDetail(e) {
        console.log(e.target);
    }
    function modifyOrdered() {
        setOrdered(true);
    }
    return (
        <div>
            <NavBar />
            <Filter modifyGamesToShow={modifyGamesToShow} modifyResultsPerPage={modifyResultsPerPage} gamesToShow={gamesToShow} resultsPerPage={resultsPerPage} modifyActualPage={modifyActualPage} modifyOrdered={modifyOrdered}/>
            {videogames.slice((actualPage - 1) * resultsPerPage, (actualPage - 1) * resultsPerPage + resultsPerPage).map((game, index) => <Card key={index} num={index} id={game.id} name={game.name} img={game.img} genres={game.genres} rating={game.rating} />)}
            <Pages gamesToShow={gamesToShow} resultsPerPage={resultsPerPage} modifyActualPage={modifyActualPage} />
        </div>
    );
}