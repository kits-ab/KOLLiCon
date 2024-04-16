import { useEffect, useState } from 'react';
import axios from 'axios';
import { StyledRating } from '@/styles/Review/StyledReview';
import styled from '@emotion/styled';
import { useUser } from '@/utils/Authorization/Auth';

interface Review {
  id: number;
  userId: string;
  review: string;
  rate: number;
}

const GetReviewComponent = () => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const { email } = useUser();
  const backendIP = import.meta.env.VITE_API_URL;

  const fetchReviews = async () => {
    try {
      const response = await axios.get(`${backendIP}/api/review?presenterEmail=${email}`);
      setReviews(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchReviews();
  }, []);

  console.log('email: ', email);

  const ShowStyledRating = styled(StyledRating)`
    .MuiRating-icon {
      font-size: 20px;
    }
  `;

  return (
    <div>
      <h2>Recensioner</h2>
      {reviews.map((review) => (
        <div key={review.id}>
          <p>{review.review}</p>
          <ShowStyledRating value={review.rate} readOnly style={{ fontSize: '10px' }} />
        </div>
      ))}
    </div>
  );
};
export default GetReviewComponent;
