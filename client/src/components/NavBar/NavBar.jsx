import { Link } from "react-router-dom";
export default function NavBar (){
    return(
        <div>
            <img src="" alt="icon" />
            <ul>
                <li><Link to="/home">Inicio</Link></li>
                <li><Link to="/create">Añadir videojuego</Link></li>
            </ul>
            <input type="text" placeholder="Nombre del videojuego..."/>
            <button>Buscar</button>
        </div>
    );
}