import React from "react";
import photo from "./assets/movie_photo.png"
import trash from "./assets/trash-close.png"


function Movies(props) {
  let data = sessionStorage.getItem('session')
  data = JSON.parse(data)
  const handleDelete = async (id) => {
    await fetch(`http://localhost:4000/${id}`, {
      method: 'delete'
    })
    document.location.reload(true)
  }

  return (
    <>{props.information.map(info => {
      return <div className="movies" key={info.id}>
        <div>
          <img
            src={photo}
            className="movies-image"
            alt="pirates of the caribean" />
          <div className="rate"><br /><p>{info.rate}/5</p></div>
        </div>
        <div className="title"><strong>{info.movie}</strong>
          {data !== null ?
            data.username === info.person ?
              <button type="button" className="delete" onClick={() => handleDelete(info.id)}>
                <img src={trash} className="trashcan" alt="trash" /></button>
              : null
            : null}
          <br /><br /><strong>Review</strong> from {info.person}
          <div className="information-movies">
            <p className="review">{info.review}</p>
          </div>
        </div>
      </div>
    })
    }</>
  )
};


export default Movies;