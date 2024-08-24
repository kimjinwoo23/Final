import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { FaRegStar, FaStar } from "react-icons/fa"; // 아이콘 임포트
import "./css/MovieDetail.css";

// 익명 이름을 생성하는 함수
const generateRandomName = () => {
    const adjectives = ["익명", "미스터리", "조용한", "숨겨진", "보이지 않는"];
    const nouns = ["관찰자", "비평가", "팬", "관람객", "목격자"];
    const randomAdjective = adjectives[Math.floor(Math.random() * adjectives.length)];
    const randomNoun = nouns[Math.floor(Math.random() * nouns.length)];
    return `${randomAdjective} ${randomNoun}`;
};

const MovieDetail = () => {
    const { movieNo } = useParams();
    console.log(movieNo);

    const [moviedata, setMovieData] = useState(null);
    const [review, setReview] = useState("");  // 관람평 내용 상태 관리
    const [reviews, setReviews] = useState([]);  // 관람평 목록 상태 관리
    const [rating, setRating] = useState(0);  // 별점 상태 관리

    useEffect(() => {
        axios.get(`http://localhost:666/api/movie/selectMovie?movieNo=${movieNo}`)
            .then(response => {
                console.log(response);
                setMovieData(response.data[0]);
            })
            .catch(e => alert("불러오기 실패"));
    }, [movieNo]);
    useEffect(() => {
        axios.get(`http://localhost:666/api/comment/movie/${movieNo}`)
            .then(response => {
                console.log(response);
                setReviews(response.data); // 코멘트를 상태에 저장
            })
            .catch(e => alert("코멘트 불러오기 실패"));
    }, [movieNo]);
    

    const handleReviewSubmit = () => {
        const anonymousName = generateRandomName(); // 익명 이름 생성
        const newReview = { name: anonymousName, text: review, rating: rating };
    
        console.log("Sending data:", newReview); // 데이터 확인
        axios.post(`http://localhost:666/api/comment/insert`, { 
            movieNo: movieNo, 
            text: newReview.text, 
            score: newReview.rating  // 백엔드에서 매핑할 필드명 확인
        })
        .then(response => {
            console.log(response);
            setReviews([...reviews, newReview]);
            setReview("");  // 입력 필드 초기화
            setRating(0);   // 별점 초기화
        })
        .catch(e => alert("관람평 제출 실패"));
    };
    const handleDeleteReview = (index) => {
        const updatedReviews = reviews.filter((_, i) => i !== index);
        setReviews(updatedReviews);
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
            <div className='additional-info'>
                <div className='genre'>장르: {moviedata.movieGenre}</div>
                <div className='cast'>출연: {moviedata.movieCast}</div>
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
                    <textarea
                        value={review}
                        onChange={(e) => setReview(e.target.value)}
                        placeholder="관람평을 입력하세요"
                        className="review-textarea"
                    />
                    <button className="review-submit-button" onClick={handleReviewSubmit}>제출</button>
                </div>
                <div className='reviews-list'>
    <h2>관람평</h2>
    {reviews.length === 0 ? (
        <p>아직 작성된 관람평이 없습니다.</p>
    ) : (
        <ul>
            {reviews.map((rev, index) => (
                <li key={index} className="review-item">
                    <strong>{rev.name}:</strong> {rev.text} ({rev.rating}점)
                    <button 
                        className="delete-button" 
                        onClick={() => handleDeleteReview(index)}
                    >
                        삭제
                    </button>
                </li>
            ))}
        </ul>
    )}
</div>
            </div>
        </div>
    );
}

export default MovieDetail;