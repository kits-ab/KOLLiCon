import { useState, useEffect } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import Rating from '@mui/material/Rating';
import axios from 'axios';
import { TextAreaStyled, SubmitButton } from '@/styles/RegisterActivity/StyledActivity';
import { da } from 'date-fns/locale';

interface Props {
  userId: string;
  activity: { id: number };
  rate?: number;
  review?: string;
}

const PostReviewComponent: React.FC<Props> = (props): React.ReactNode => {
  const [value, setValue] = useState<number | null>(3);
  const backendIP = import.meta.env.VITE_API_URL;

  const postReview = async (data: Props) => {
    try {
      const response = await axios.post(`${backendIP}/api/review/create`, data);
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
      mode: 'onChange',
    });

    const onSubmit: SubmitHandler<Props> = (data) => {
      data.rate = value || 2;
      data.userId = props.userId;
      data.activity = { id: props.activity };
      console.log('data: ', data);
      postReview(data);
    };

    return (
      <>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Rating
            name='simple-controlled'
            value={value}
            onChange={(event, newValue) => {
              setValue(newValue);
            }}
          />

          <TextAreaStyled placeholder='Ge feedbak' {...register('review', { required: true })} />
          {errors.review && <span>This field is required</span>}

          <SubmitButton type='submit'>Skicka</SubmitButton>
        </form>
      </>
    );
  };

  return reviewForm();
};

export default PostReviewComponent;
