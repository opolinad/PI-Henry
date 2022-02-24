import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { getByName } from "../../actions";
import "./NavBar.css";
import icon from "../../Images/icono.png";
export default function NavBar() {
    const [inp, setInput] = useState("");
    const dispatch = useDispatch();
    function onSearchClick() {
        dispatch(getByName(inp));
    }
    return (
        <div id="navbar-container">
            <img id="img-icon" src={icon} alt="icon" />
            <div id="links-container">
                <Link to="/home"><span>Inicio</span></Link>
                <Link to="/create"><span>Añadir videojuego</span></Link>
            </div>
            <div id="searchbar">
                <input type="text" placeholder="Nombre del videojuego..." value={inp} onChange={({ target: { value } }) => setInput(value)} />
                <span onClick={onSearchClick}>Buscar</span>
            </div>
        </div>
    );
}