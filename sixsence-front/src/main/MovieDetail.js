import React, { useState, useEffect,useContext } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { FaRegStar, FaStar } from "react-icons/fa";
import "./css/MovieDetail.css";
import LoginContext from '../login/LoginContext';

const MovieDetail = () => {
    const { movieNo } = useParams();
    const [moviedata, setMovieData] = useState(null);
    const [soname, setSoname] = useState("");
    const [review, setReview] = useState("");  // 관람평 내용 상태 관리
    const [reviews, setReviews] = useState([]);  // 관람평 목록 상태 관리
    const [rating, setRating] = useState(0);  // 별점 상태 관리
    const { loginMember } = useContext(LoginContext);
    const navigate = useNavigate();
    useEffect(() => {
        axios.get(`http://localhost:666/api/movie/selectMovie?movieNo=${movieNo}`)
            .then(response => {
                setMovieData(response.data[0]);
            })
            .catch(e => alert("불러오기 실패"));
    }, [movieNo]);

    useEffect(() => {
        axios.get(`http://localhost:666/api/comment/movie/${movieNo}`)
            .then(response => {
                console.log(response);
                setReviews(response.data); // 서버에서 받은 데이터로 상태 업데이트
            })
            .catch(e => alert("코멘트 불러오기 실패"));
    }, [movieNo]);

    
    const handleReviewSubmit = () => {
        if (!loginMember) { // 로그인 했을 때
            const shouldNavigate = window.confirm("로그인이 필요합니다. 로그인 페이지로 이동하시겠습니까?");
            if (shouldNavigate) { // 확인 버튼
                navigate('/memberLogin');
                return;
            } else { // 취소 버튼
                return;
            }
        }
        const newReview = { soname: soname, text: review, rating: rating };
    
        axios.post(`http://localhost:666/api/comment/insert`, { 
            movieNo: movieNo, 
            text: newReview.text, 
            score: newReview.rating,
            soname: newReview.soname // 이 부분 추가
        })
        .then(response => {
            setReviews([...reviews, newReview]);
            setReview("");  
            setRating(0);
            setSoname(""); // 폼 초기화
            console.log("점수 : ",rating);
        })
        .catch(e => alert("관람평 제출 실패"));
    };

    const handleDeleteReview = (coid) => {
        axios.delete(`http://localhost:666/api/comment/delete`, {
            params: { coid: coid }
        })
        .then(response => {
            setReviews(reviews.filter(review => review.coid !== coid));
        })
        .catch(error => {
            console.error("Error deleting review:", error);
        });
    };

    const handleRatingClick = (value) => {
        setRating(value);
    };

    if (!moviedata) {
        return <div>Loading...</div>;
    }

    return (
        <div className='detail-container'>
    <div className="movie-header">
        <img className='image' src={`.${moviedata.movieImage}`} alt={moviedata.movieTitle} />
        <div className="movie-info">
            <h1 className='title'>{moviedata.movieTitle}</h1>
            <div className='grade'>관람 등급: {moviedata.movieGrade}</div>
            <div className='showtime'>상영 시간: {moviedata.movieShowtime}</div>
            <div className='story'>스토리: {moviedata.movieStory}</div>
            <button className="booking-button">예매하기</button>
        </div>
    </div>

            
            <div className='review-section'>
                <div className='star-rating'>
                    {[1, 2, 3, 4, 5].map(value => (
                        value <= rating ? 
                        <FaStar
                            key={value}
                            size={30}
                            className="star selected"
                            onClick={() => handleRatingClick(value)}
                        /> : 
                        <FaRegStar
                            key={value}
                            size={30}
                            className="star"
                            onClick={() => handleRatingClick(value)}
                        />
                    ))}
                </div>
              
    <div className='review-form'>
        <input
            type="text"
            value={soname}
            onChange={(e) => setSoname(e.target.value)}
            placeholder="이름을 입력하세요"
            className="soname-input"
        />
        <textarea
            value={review}
            onChange={(e) => setReview(e.target.value)}
            placeholder="관람평을 입력하세요"
            className="review-textarea"
        />
        <button className="review-submit-button" onClick={handleReviewSubmit}>등록하기</button>
    </div>


                   
                </div>
                <div className='reviews-list'>
                    <h2>관람평</h2>
                    {reviews.length === 0 ? (
                        <p>아직 작성된 관람평이 없습니다.</p>
                    ) : (
                        <ul>
                            {reviews.map((rev, index) => (
                                <li key={index} className="review-item">
                                    <strong>{rev.soname}:</strong> {rev.text} ({rev.score}점)
                                   
                                    <button 
                                    
                                        className="delete-button" 
                                        onClick={() => handleDeleteReview(rev.coid)}
                                    >
                                        삭제
                                    </button>
                                </li>
                            ))}
                           
                        </ul>
                    )}
                </div>
                
            </div>
       
    );
    
}

export default MovieDetail;