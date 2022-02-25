import React, { useState } from "react";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import "./Pages.css";

export default function Pages({ resultsPerPage, modifyActualPage,actualPage }) {
    const videogames = useSelector((state) => state.videogamesFilter);
    const numPages = Math.ceil( videogames.length/ resultsPerPage);
    let [renderPage, setRenderPage] = useState(2);
    let [refreshRender, setRefreshRender] = useState(false);
    useEffect(()=>{
        setRenderPage(2);
    },[videogames]);
    useEffect(()=>{
        setRefreshRender(false);
        renderActualPage();
    },[refreshRender,actualPage,videogames]);
    function onNumberClick(e) {
        modifyActualPage(e.target.value);
    }
    function onBeforeClick() {
        setRefreshRender(true);
        if ((renderPage - 1) % 3 === 0) {
            return setRenderPage(renderPage -= 2);
        }
        renderPage >= 5 && setRenderPage(renderPage -= 3);
    }
    function onAfterClick() {
        setRefreshRender(true);
        renderPage + 2 === numPages && setRenderPage(numPages);
        numPages - Number(renderPage) >= 3 && setRenderPage(renderPage += 3);
    }
    function renderActualPage() {
        if (numPages<=1) return;
        for (const page of document.getElementsByClassName("btn-pages")) {
            if(page?.value==actualPage){
                page.classList.add("btn-actual-page");
            }else{
                page.classList.remove("btn-actual-page");
            }
        }
    }
    if (numPages === 1 || numPages === 0) {
        document.getElementById("cards-container") && (document.getElementById("cards-container").style.height="71.5vh");
        return <div/>;
    }else{
        document.getElementById("cards-container") && (document.getElementById("cards-container").style.height="67vh");
    }
    return (<div id="pages-container">

        {renderPage > 2 && <button className="btn-nav" onClick={onBeforeClick}>&lt;</button>}

        {(renderPage + 1) % 3 === 0 && <button className="btn-pages" id={1} onClick={onNumberClick} value={renderPage - 1}>{renderPage - 1}</button>}

        <button className="btn-pages" id={2} onClick={onNumberClick} value={renderPage}>{renderPage}</button>

        {Number(renderPage) + 1 <= numPages && <button className="btn-pages" id={3} onClick={onNumberClick} value={Number(renderPage) + 1}>{Number(renderPage) + 1}</button>}

        {numPages >= renderPage + 2 && <button className="btn-nav" onClick={onAfterClick}>&gt;</button>}
    </div>);
    /*   let pages=[];
      for (let i = 1; i <= numPages; i++) {
          pages.push(i);
      }
      return pages.map((page, index)=><button key={index} onClick={onNumberClick} value={index+1}>{page}</button>) */
}