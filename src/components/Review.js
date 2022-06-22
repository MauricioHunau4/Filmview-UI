import React, { useState, useEffect } from "react";
import "./review.css";
import photo from './assets/movie_photo.png'
import search from './assets/search.png'
import { useNavigate } from 'react-router-dom'
import axios from "axios";



function InfoMovie() {
    return (
        <div className="movie-information-box">
            <div>Release</div>
            <div>Actors</div>
            <div>Director</div>
            <div>Genre</div>
        </div>
    )
}

function ReviewMovie() {
    let data = sessionStorage.getItem('session')
    data = JSON.parse(data)
   
    const [movie, setMovie] = useState("")
    const [person, setPerson] = useState()
    const [rate, setRate] = useState("")
    const [rev, setReview] = useState("");

    const navigate = useNavigate();

    const handleSubmit = async(e) => {
        e.preventDefault()
        if (data !== null) {
            await axios.post('http://localhost:4000/review', {
                data: {
                    movie: movie,
                    person: person,
                    rate: rate,
                    review: rev
                }
            });
            navigate("/")
        }else{
            document.getElementsByClassName("warning")[0].style.display="block"
            
        }
    }

    useEffect(()=>{
        if(data !== null){
            setPerson(data.username)
        }
    },[])

    return (
        <div className="form">
            <fieldset>
                <form onSubmit={handleSubmit}>
                    <div className="form-search-movie">
                        <input
                            name="movie"
                            onChange={(e) => setMovie(e.target.value)}
                            type="text"
                            className="search-movie"
                            placeholder="Search the movie to review..." />
                        <button className="button-movie" type="submit" >
                            <img src={search}
                                alt="button search" />
                        </button>
                    </div>
                    <label>Rate (1 to 5):<br />
                        <input
                            name="rate"
                            type="number"
                            className="cuantity"
                            min={1}
                            max={5}
                            required
                            onChange={(e) => setRate(e.target.value)} /> /5
                    </label><br />
                    <label>Write your review:
                        <textarea
                            name="review"
                            onChange={(e) => setReview(e.target.value)}
                            type="text"
                            className="input-review"
                            placeholder="What do you think about this movie?"
                            required maxLength={300} />
                    </label>
                    <div className="inputsubmit">
                        <input
                            type="submit"
                            className="button-post"
                            value="Share"
                        />
                        <p className="warning">You must be log to do a review</p>
                    </div>
                </form>
            </fieldset>
        </div>
    )
}



function Review() {
    return (
        <div className="page-review">
            <div className="flex-review">
                <div>
                    <img src={photo}
                        alt="piratas"
                        className="image-review" />
                </div>
                <div className="grow">
                    <ReviewMovie />
                </div>
                <div className="movie-information-background">
                    <InfoMovie />
                </div>
            </div>
        </div>
    );
}


export default function ReviewPage() {
    return (
        <div>
            <Review />
            <div className="bar-final2"></div>
        </div>
    )
};

