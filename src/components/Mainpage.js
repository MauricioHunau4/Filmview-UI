import axios from "axios";
import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import "./mainpage.css"
import Movies from "./Movies"


function Mainpage() {
  const [info, setInfo] = useState([]);

  const { state } = useLocation();

  const [approval, setApproval] = useState(Number)
  const [currentPage, setCurrentPage] = useState(1);
  const [pages, setPages] = useState([]);
  const [maxPagination, setMaxPagination] = useState(5)
  const minPagintation = 1

  const loadPerPage = async (page) => {
    await axios.post('http://localhost:4000', {
      data: {
        number: page
      }
    }).then(data => (
      setInfo(data.data.reviews),
      setPages(data.data.pagesLength))
    )
  };

  const nextButton = () => {
    if (currentPage !== pages[pages.length - 1])
      setCurrentPage(currentPage + 1)
  }

  const prevButton = () => {
    if (currentPage !== pages[0])
      setCurrentPage(currentPage - 1)

  }

  let dotsPrev = null
  let dotsNext = null

  const pagination = () => {
    for (let i = 1; i <= 5; i++) {
      if (pages.length > maxPagination && currentPage !== pages[pages.length - i]) {
        dotsNext = <li>...</li>
      }
      if (currentPage !== pages[i]) {
        dotsPrev = null
      } else
        dotsPrev = <li>...</li>
    }
  }
  const first = async () => {
    await axios.get('http://localhost:4000')
      .then(data => setApproval(data.data))
  }

  useEffect(() => {
    first()
    if (approval !== 0) {
      loadPerPage(currentPage)
      pagination()
    } 
  }, [currentPage, approval]);

  return (
    <div>
      <div className="page">
        <div className="flex-page1">
          {approval === 0 || approval === undefined ? null :
            <ul className="pageNumbers">
              <button className="button-pagination" onClick={prevButton}>&lt;</button>
              {dotsPrev}
              {state !== null ?
                state.long.map(state => {
                  if (state < maxPagination && state >= minPagintation) {
                    return <li
                      key={state}
                      className={currentPage === state ? "active" : null}
                      onClick={() => {
                        setCurrentPage(state)
                        loadPerPage(state)
                      }}
                    >{state}</li>
                  }
                }) : pages.map(page => {
                  if (page < maxPagination && page >= minPagintation) {
                    return <li
                      key={page}
                      className={currentPage === page ? "active" : null}
                      onClick={() => {
                        setCurrentPage(page)
                        loadPerPage(page)
                      }}
                    >{page}</li>
                  } else
                    return null;
                })}
              {dotsNext}
              <button className="button-pagination" onClick={nextButton}>&gt;</button>
            </ul>
          }
          <div className="place-movies">
            {approval === 0 ?
              <h1 className="no-reviews">There are no reviews, be the first one</h1> :
              state !== null ?
                <Movies information={state.information} />
                 :
                 <Movies information={info}/>
                 }
          </div>
          {approval === 0 || approval === undefined ? null :
            <ul className="pageNumbers">
              <button className="button-pagination" onClick={prevButton}>&lt;</button>
              {dotsPrev}
              {state !== null ?
                state.long.map(state => {
                  if (state < maxPagination && state >= minPagintation) {
                    return <li
                      key={state}
                      className={currentPage === state ? "active" : null}
                      onClick={() => {
                        setCurrentPage(state)
                        loadPerPage(state)
                      }}
                    >{state}</li>
                  }
                }) : pages.map(page => {
                  if (page < maxPagination && page >= minPagintation) {
                    return <li
                      key={page}
                      className={currentPage === page ? "active" : null}
                      onClick={() => {
                        setCurrentPage(page)
                        loadPerPage(page)
                      }}
                    >{page}</li>
                  } else
                    return null;
                })}
              {dotsNext}
              <button className="button-pagination" onClick={nextButton}>&gt;</button>
            </ul>
          }
        </div>
      </div>
    </div>
  );
};




export default Mainpage;
