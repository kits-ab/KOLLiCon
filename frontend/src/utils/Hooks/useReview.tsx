import { useState, useEffect } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import Rating from '@mui/material/Rating';
import axios from 'axios';
import {
  TextAreaStyled,
  SubmitButton,
  ErrorStyled,
} from '@/styles/RegisterActivity/StyledActivity';
import styled from '@emotion/styled';
import { Colors } from '@/styles/Common/colors';

interface Props {
  userId: string;
  activity: { id: number };
  rate?: number;
  review?: string;
}

const PostReviewComponent: React.FC<Props> = (props): React.ReactNode => {
  const [rateValue, setRateValue] = useState<number | null>(null);
  const [buttonDisabled, setButtonDisabled] = useState<boolean>(true);
  const [successSubmit, setSuccessSubmit] = useState<boolean>(false);
  const backendIP = import.meta.env.VITE_API_URL;

  const reviewForm = () => {
    const {
      register,
      handleSubmit,
      formState: { errors },
      watch,
      reset,
    } = useForm<Props>({
      mode: 'onChange',
    });

    // Function to clear error after 10 seconds
    const clearError = () => {
      setTimeout(() => {
        setSuccessSubmit(false);
      }, 5000);
    };

    const review = watch('review');

    const postReview = async (data: Props) => {
      try {
        const response = await axios.post(`${backendIP}/api/review/create`, data);
        console.log(response);

        reset({
          userId: '',
          activity: { id: 0 },
          rate: 0,
          review: '',
        });
        setRateValue(null);
        setSuccessSubmit(true);
        clearError();
      } catch (error) {
        console.error(error);
      }
    };

    const onSubmit: SubmitHandler<Props> = (data) => {
      data.rate = rateValue || 0;
      data.userId = props.userId;
      data.activity = { id: props.activity };
      postReview(data);
    };

    useEffect(() => {
      if (rateValue === null || review === '') {
        setButtonDisabled(true);
      } else {
        setButtonDisabled(false);
      }

      // handleButton();
    }, [rateValue, review]);

    const StyledRating = styled(Rating)`
      width: 60%;
      max-width: 200px;
      margin-bottom: 15px;
      justify-content: space-between;
      .MuiRating-iconEmpty {
        color: gray;
      }
      .MuiRating-icon {
        font-size: 30px;
    `;

    const SuccessMessage = styled(ErrorStyled)`
      color: ${Colors.primaryAddButton};
      display: flex;
      justify-content: center;
    `;

    return (
      <>
        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <StyledRating
              name='simple-controlled'
              value={rateValue}
              onChange={(event, newValue) => {
                setRateValue(newValue);
              }}
            />

            <TextAreaStyled
              maxRows={3}
              style={{ margin: '0px', width: '100%', height: '150px' }}
              placeholder='Ge feedback'
              {...register('review', { required: true })}
            />

            <SubmitButton
              disabled={buttonDisabled}
              sx={{ width: '150px', height: '30px' }}
              type='submit'
            >
              Skicka
            </SubmitButton>
            {successSubmit && <SuccessMessage>Tack för din feedback</SuccessMessage>}
          </form>
        </div>
      </>
    );
  };

  return reviewForm();
};

export default PostReviewComponent;
