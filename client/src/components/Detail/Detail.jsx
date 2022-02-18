import React from "react";
import { useSelector } from "react-redux";
export default function Detail() {
    const detail=useSelector((state)=>state.gameDetail)
    return (<div>
        <img src={detail.img} alt="videogame image" />
        <h1>{detail.name}</h1>
        <p>Géneros</p>
        <p>{detail.genres}</p>
        <p>Plataformas</p>
        <p>{detail.platforms}</p>
        <p>Fecha de lanzamiento</p>
        <p>{detail.released}</p>
        <p>Rating</p>
        <p>{detail.rating}</p>
        <p><a href={`https://www.google.com/search?q=${detail.name}&tbm=shop`} target="_blank"> Dónde comprar</a></p>
        <p>Descripción</p>
        <p>{detail.description}</p>
    </div>);
}