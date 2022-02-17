import React, { useState } from "react";
export default function Pages({ gamesToShow, resultsPerPage, actualPage, modifyActualPage }) {
    const numPages = Math.ceil(gamesToShow / resultsPerPage);
    let [renderPage, setRenderPage] = useState(numPages>1?2:1);
    function onNumberClick(e) {
        alert(e.target.id)
        setRenderPage(e.target.value)
        modifyActualPage(e.target.value);
    }
    function onBeforeClick() {
        renderPage - 1 > 0 && setRenderPage(() => renderPage--);
    }
    function onAfterClick() {
        Number(renderPage) + 1 <= numPages && setRenderPage(() => renderPage++);
    }
    if(numPages===1){
        return <div/>;
    }// Hay un bug ya que toca presionar el botón dos veces
    return (<div>

        <button onClick={onBeforeClick}>a</button>

        {renderPage - 1 > 0 && <button id="1" onClick={onNumberClick} value={renderPage - 1}>{renderPage - 1}</button>}

        <button id="2" onClick={onNumberClick} value={renderPage}>{renderPage}</button>

        {Number(renderPage) + 1 <= numPages && <button id="3" onClick={onNumberClick} value={Number(renderPage) + 1}>{Number(renderPage) + 1}</button>}

        <button onClick={onAfterClick}>d</button>
    </div>);
  /*   let pages=[];
    for (let i = 1; i <= numPages; i++) {
        pages.push(i);
    }
    return pages.map((page, index)=><button key={index} onClick={onNumberClick} value={index+1}>{page}</button>) */
}