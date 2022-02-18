import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { getByName } from "../../actions";
export default function NavBar (){
    const [inp,setInput]=useState("");
    const dispatch=useDispatch();
    function onSearchClick() {
        dispatch(getByName(inp));
    }
    return(
        <div>
            <img src="" alt="icon" />
            <ul>
                <li><Link to="/home">Inicio</Link></li>
                <li><Link to="/create">Añadir videojuego</Link></li>
            </ul>
            <input type="text" placeholder="Nombre del videojuego..." value={inp} onChange={({target:{value}}) => setInput(value)}/>
            <button onClick={onSearchClick}>Buscar</button>
        </div>
    );
}