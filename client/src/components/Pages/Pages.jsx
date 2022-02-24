import React, { useState } from "react";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import "./Pages.css";

export default function Pages({ resultsPerPage, modifyActualPage,actualPage }) {
    const videogames = useSelector((state) => state.videogamesFilter);
    const numPages = Math.ceil( videogames.length/ resultsPerPage);
    let [renderPage, setRenderPage] = useState(2);
    useEffect(()=>{
        setRenderPage(2);
        renderActualPage();
    },[videogames, actualPage])
    function onNumberClick(e) {
        modifyActualPage(e.target.value);
    }
    function onBeforeClick() {
        if ((renderPage - 1) % 3 === 0) {
            return setRenderPage(renderPage -= 2);
        }
        renderPage >= 5 && setRenderPage(renderPage -= 3);
    }
    function onAfterClick() {
        renderPage + 2 === numPages && setRenderPage(numPages);
        numPages - Number(renderPage) >= 3 && setRenderPage(renderPage += 3);
    }
    function renderActualPage() {
        if (numPages<=1) return;
        for(let i=1; i<=3;i++){
            let page=document.getElementById(i);
            if(page.value==actualPage){
                page.classList.add("btn-actual-page");
            }else{
                page.classList.remove("btn-actual-page");
            }
        }
    }
    if (numPages === 1 || numPages === 0) {
        return <div/>;
    }
    return (<div id="pages-container">

        {renderPage > 2 && <button className="btn-pages" onClick={onBeforeClick}>&lt;</button>}

        {(renderPage + 1) % 3 === 0 && <button className="btn-pages" id={1} onClick={onNumberClick} value={renderPage - 1}>{renderPage - 1}</button>}

        <button className="btn-pages" id={2} onClick={onNumberClick} value={renderPage}>{renderPage}</button>

        {Number(renderPage) + 1 <= numPages && <button className="btn-pages" id={3} onClick={onNumberClick} value={Number(renderPage) + 1}>{Number(renderPage) + 1}</button>}

        {numPages >= renderPage + 2 && <button className="btn-pages" onClick={onAfterClick}>&gt;</button>}
    </div>);
    /*   let pages=[];
      for (let i = 1; i <= numPages; i++) {
          pages.push(i);
      }
      return pages.map((page, index)=><button key={index} onClick={onNumberClick} value={index+1}>{page}</button>) */
}