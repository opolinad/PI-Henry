import React from "react";
import { useState } from "react";
import { addVideogame, getAllGenres } from "../../actions";
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from "react";


export default function Form() {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getAllGenres())
    }, []);
    const genresArr = useSelector((state) => state.genres);
    const [inputs, setInputs] = useState({
        name: "",
        released: "",
        rating: 0,
        genres: [],
        platforms: "",
        description: ""
    })
    const [err, setErr] = useState({});
    function onSubmit(e) {
        e.preventDefault();
        console.log(inputs);//Borrar
        console.log(validateInputs());//Borrar
        let errorsArr = validateInputs().arr;
        setInputs({ ...inputs, platforms: trimPlatforms(inputs.platforms) });
        if (!errorsArr.length) {
            dispatch(addVideogame(inputs));
            setInputs({
                name: "",
                released: "",
                rating: 0,
                genres: [],
                platforms: "",
                description: ""
            });
            for (const checkbox of document.getElementsByClassName("chkbox")) {
                checkbox.checked = false;
            }
        } else {
            alert(errorsArr);
        }
    }
    function onInputsChange(e) {
        setInputs({ ...inputs, [e.target.name]: e.target.value });
        validateInputs.errors && setErr(validateInputs().errors);

    }
    function onCheckboxChange(e) {
        (!inputs.platforms.includes(e.target.name) && e.target.checked) && setInputs({ ...inputs, platforms: trimPlatforms(inputs.platforms + " " + e.target.name) });
    }
    function onSelectChange(e) {
        let value = [...e.target.options].filter(o => o.selected).map(o => o.value);
        setInputs({ ...inputs, genres: value });
    }
    function validateInputs() {
        let errors = {};
        let arr = [];
        for (const input in inputs) {
            if (input === "rating") {
                if (inputs[input] > 5 || inputs[input] < 0) errors[input] = "El valor del rating tiene que ser mayor a 0.0 y menor a 5.0";
            } else if (input === "genres") {
                if (!inputs[input].length) errors[input] = "Debe seleccionar al menos un género";
            } else if (input === "platforms") {
                if (!inputs[input]) errors[input] = "Debe seleccionar al menos una plataforma";
            } else {
                if (!inputs[input]) errors[input] = `El campo ${input} no puede estar vacío`;
                if (input === "name" && !/^[A-Za-z0-9 ]+$/.test(inputs[input])) errors[input] = "El nombre no puede contener caracterres especiales";
            }
        }
        if (Object.keys(errors).length) {
            for (const error in errors) {
                arr.push(errors[error]);
                arr.push("\n");
            }
        }
        return { errors, arr }
    }
    return (<form onSubmit={onSubmit} autoComplete="off">
        <h1>Crear una entrada para un videojuego</h1>
        <label>Nombre:</label>
        <input type="text" name="name" value={inputs.name} onChange={onInputsChange} placeholder="Nombre del videojuego" autoComplete="off"/>
        <label>Fecha de lanzamiento:</label>
        <input type="date" name="released" value={inputs.released} onChange={onInputsChange} />
        <label>Rating:</label>
        <input type="number" name="rating" value={inputs.rating} onChange={onInputsChange} step={0.1} />
        <label>Géneros:</label>

        <select name="genres" value={inputs.genres} onChange={onSelectChange} multiple={true}>
            {genresArr.map((genre, index) => <option key={index} value={genre}>{genre}</option>)}
        </select>

        <label>Plataformas:</label>
        <label htmlFor="chkbox-pc">PC</label>
        <input type="checkbox" className="chkbox" name="PC" id="chkbox-pc" onChange={onCheckboxChange} />
        <label htmlFor="chkbox-mac">Macintosh</label>
        <input type="checkbox" className="chkbox" name="Mac" id="chkbox-mac" onChange={onCheckboxChange} />
        <label htmlFor="chkbox-linux">Linux</label>
        <input type="checkbox" className="chkbox" name="Linux" id="chkbox-linux" onChange={onCheckboxChange} />
        <label htmlFor="chkbox-ps">PlayStation</label>
        <input type="checkbox" className="chkbox" name="Playstation" id="chkbox-ps" onChange={onCheckboxChange} />
        <label htmlFor="chkbox-xbox">X-box</label>
        <input type="checkbox" className="chkbox" name="X-box" id="chkbox-xbox" onChange={onCheckboxChange} />
        <label htmlFor="chkbox-android">Android</label>
        <input type="checkbox" className="chkbox" name="Android" id="chkbox-android" onChange={onCheckboxChange} />
        <label htmlFor="chkbox-ios">iOs</label>
        <input type="checkbox" className="chkbox" name="iOs" id="chkbox-ios" onChange={onCheckboxChange} />
        <label htmlFor="chkbox-atari">Atari</label>
        <input type="checkbox" className="chkbox" name="Atari" id="chkbox-atari" onChange={onCheckboxChange} />
        <label htmlFor="chkbox-sega">Sega</label>
        <input type="checkbox" className="chkbox" name="Sega" id="chkbox-sega" onChange={onCheckboxChange} />
        <label>Descripción:</label>
        <textarea name="description" value={inputs.description} cols="50" rows="5" onChange={onInputsChange}></textarea>
        <button type="submit">Crear videojuego</button>
        <br />
        <br />
        {err.name && <span>{err.name}</span>}
        <br />
        <br />
        {err.rating && <span>{err.rating}</span>}
    </form>);
}
const trimPlatforms = (platforms) => {
    return platforms.split(" ").filter(platform => platform !== "").join(" ");
};