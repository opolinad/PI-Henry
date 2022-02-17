export default function Card(props){
    return(
        <div>
            <img src={props.img} alt="videogame image" style={{maxWidth:"300px"}}/>
            <p>{props.name}</p>
            <p>{props.genres}</p>
            <p>{props.rating}</p>
        </div>
    );
}
