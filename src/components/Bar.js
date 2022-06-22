import React, { useState, useEffect } from "react";
import "./bar.css"
import Logo from './assets/film_reel.png'
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";


function Bar() {
  const [search, setSearch] = useState('');
  const [response, setResponse] = useState([])
  const [long, setLong] = useState([])
  const navigate = useNavigate()

  let data = sessionStorage.getItem('session')
  if (data !== null) {
    data = JSON.parse(data)
  }

  const handleClick = async () => {
    await axios.post(`http://localhost:4000/search`, {
      search: search
    }).then(data => {
      if (data.data === "There is no review for this movie, be the first one to make it") {
        alert(data.data)
      } else {
        setResponse(data.data.info)
        setLong(data.data.pagesLength)
      }
    }
    );
  }

  const handleChange = e => {
    setSearch({ ...search, [e.target.name]: e.target.value })
  };

  useEffect(() => {
    if (response.length !== 0 && long.length !== 0) {
      navigate('/', {
        state: {
          information: response,
          long: long
        }
      })
    }
  }, [response, long]);

  return (
    <div className="page-bar">
      <header>
        <div className="principal">
          <Link className="icon" to="/"><img
            src={Logo}
            alt="filmview" />Filmview</Link>
          <div className="search-box">
            <input
              name="movies"
              type="text"
              className="search-bar"
              placeholder="Search the movie..."
              onChange={handleChange}
            />
            <a className="button-search-movie" onClick={handleClick}><img src={Logo} alt="search-movie" className="image-button-search-movie" /></a>
          </div>
          <div className="login">
            {data === null ?
              <div><Link to="/login">Log in</Link> /
                <Link to="/login"> Sign up</Link> </div> :
              <p className="username-bar">Hello <strong>{data.username}</strong>! <button className="button-log-out" onClick={() => {
                sessionStorage.clear()
                document.location.reload(true)
              }}>Log out</button></p>}
          </div>
        </div>
        <div className="bar">
          <div><p>Welcome to filmview!</p></div>
          <Link className="newReview" to="/review"><div className="link">Make a new review!</div></Link>
        </div>
      </header>
    </div>
  );
}

export default Bar;