import React, { useState } from "react";
import { useEffect } from "react";
import { useSelector } from "react-redux";
export default function Pages({ resultsPerPage, modifyActualPage }) {
    const videogames = useSelector((state) => state.videogamesFilter);
    const numPages = Math.ceil( videogames.length/ resultsPerPage);
    let [renderPage, setRenderPage] = useState(2);
    useEffect(()=>{
        setRenderPage(2);
    },[videogames])
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
    if (numPages === 1 || numPages === 0) {
        return <div />;
    }
    return (<div>

        {renderPage > 2 && <button onClick={onBeforeClick}>a</button>}

        {(renderPage + 1) % 3 === 0 && <button id="1" onClick={onNumberClick} value={renderPage - 1}>{renderPage - 1}</button>}

        <button id="2" onClick={onNumberClick} value={renderPage}>{renderPage}</button>

        {Number(renderPage) + 1 <= numPages && <button id="3" onClick={onNumberClick} value={Number(renderPage) + 1}>{Number(renderPage) + 1}</button>}

        {numPages >= renderPage + 2 && <button onClick={onAfterClick}>d</button>}
    </div>);
    /*   let pages=[];
      for (let i = 1; i <= numPages; i++) {
          pages.push(i);
      }
      return pages.map((page, index)=><button key={index} onClick={onNumberClick} value={index+1}>{page}</button>) */
}