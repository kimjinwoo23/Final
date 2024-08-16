import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import './MovieDetail.css'; // 스타일 파일이 있는 경우

function MovieDetail() {
  const { id } = useParams(); // URL 파라미터에서 영화 ID를 가져옵니다.
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // 영화 정보를 가져오는 함수
    const fetchMovie = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/movie/${id}`);
        setMovie(response.data);
      } catch (err) {
        setError('Failed to fetch movie details.');
      } finally {
        setLoading(false);
      }
    };

    fetchMovie();
  }, [id]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;
  if (!movie) return <p>Movie not found.</p>;

  return (
    <div className="infocontainer">
      <div className="title">
        <img src={movie.poster_path} alt={movie.title} />
        <label className="open">개봉 : {new Date(movie.release_date).toLocaleDateString()}</label>
        <label className="fact">영화 내용: {movie.overview}</label>
      </div>
    </div>
  );
}

export default MovieDetail;