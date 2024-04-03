import { useState, useEffect } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import axios from 'axios';
import { GlobalStyles } from '@kokitotsos/react-components';
import {
  TitleStyled,
  StyledDiv,
  InputStyled,
  TextAreaStyled,
  SubmitButton,
} from '@/styles/RegisterActivity/StyledActivity';

interface Props {
  userId: string;
  activityId: number;
  rating: number;
  comment: string;
}

const PostReviewComponent: React.FC<Props> = (): React.ReactNode => {
  const [reviews, setReviews] = useState([]);
  const backendIP = import.meta.env.VITE_API_URL;

  const postReview = async (data: Props) => {
    try {
      // Fetch reviews from API
      const response = await axios.post(`${backendIP}/api/review/create`);
      console.log(response);
      alert('Thanks for your feedback');
    } catch (error) {
      console.error(error);
    }
  };

  const reviewForm = () => {
    const {
      register,
      handleSubmit,
      formState: { errors },
    } = useForm<Props>({
      defaultValues: {
        userId: '',
        activityId: 1,
        rating: 2,
        comment: '',
      },
      mode: 'onChange',
    });

    const onSubmit: SubmitHandler<Props> = (data) => {
      postReview(data);
    };

    return (
      <>
        <form onSubmit={handleSubmit(onSubmit)}>
          <TitleStyled>Review</TitleStyled>
          <StyledDiv>
            <InputStyled
              type='text'
              placeholder='User ID'
              {...register('userId', { required: true })}
            />
            {errors.userId && <span>This field is required</span>}
          </StyledDiv>
          <StyledDiv>
            <InputStyled
              type='number'
              placeholder='Activity ID'
              {...register('activityId', { required: true })}
            />
            {errors.activityId && <span>This field is required</span>}
          </StyledDiv>
          <StyledDiv>
            <InputStyled
              type='number'
              placeholder='Rating'
              {...register('rating', { required: true })}
            />
            {errors.rating && <span>This field is required</span>}
          </StyledDiv>
          <StyledDiv>
            <TextAreaStyled placeholder='Comment' {...register('comment', { required: true })} />
            {errors.comment && <span>This field is required</span>}
          </StyledDiv>
          <SubmitButton type='submit'>Submit</SubmitButton>
        </form>
      </>
    );
  };

  return reviewForm();
};

export default PostReviewComponent;
