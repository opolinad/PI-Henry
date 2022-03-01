import React from "react";
import { Link } from "react-router-dom";
import { configure, shallow, mount } from "enzyme";
import Adapter from "@wojtekmaj/enzyme-adapter-react-17";
import { Provider } from "react-redux";
import { store } from "../../store/index"
import NavBar from "./NavBar";
import { BrowserRouter, Route, Routes } from "react-router-dom";

configure({ adapter: new Adapter() });

describe("<NavBar />", () => {
    let wrapper;
    beforeEach(() => {
        wrapper = mount(<Provider store={store}>
            <BrowserRouter>
                <NavBar />
            </BrowserRouter>
        </Provider>);
    });

    it("Deberia renderizar Dos <Link />", () => {
        expect(wrapper.find("Link")).toHaveLength(2);
    });
    it('El primer Link debe tener el texto "Inicio" y cambiar la ruta hacia "/home".', () => {
      //el orden donde declaran los Links es importante
      expect(wrapper.find(Link).at(0).prop("to")).toEqual("/home");
      // Tiene que ser literal! ojo con los espacios.
      expect(wrapper.find(Link).at(0).text()).toEqual("Inicio");
    });
    it('El segundo Link debe tener el texto "Add Todo" y cambiar la ruta hacia "/add"', () => {
      expect(wrapper.find(Link).at(1).prop("to")).toEqual("/create");
      // Tiene que ser literal! ojo con los espacios.
      expect(wrapper.find(Link).at(1).text()).toEqual("Añadir videojuego");
    });
});
