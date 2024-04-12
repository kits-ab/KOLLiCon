import { useState, useEffect } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import axios from 'axios';
import { ErrorStyled, TextAreaStyled } from '@/styles/RegisterActivity/StyledActivity';
import { StyledRating, StyledSubmitButton, SuccessMessage } from '@/styles/Review/StyledReview';

interface Props {
  userId: string;
  activity: {};
  open: boolean;
}

interface FormData {
  userId: string;
  activity: {};
  rate: number;
  review: string;
}

const PostReviewComponent: React.FC<Props> = (props): React.ReactNode => {
  const [rateValue, setRateValue] = useState<number | null>(null);
  const [buttonDisabled, setButtonDisabled] = useState<boolean>(true);
  const [successSubmit, setSuccessSubmit] = useState<boolean>(false);
  const backendIP = import.meta.env.VITE_API_URL;

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    reset,
  } = useForm<FormData>({
    mode: 'onChange',
  });

  const review = watch('review', '');

  // Function to clear success message after 10 seconds
  const clearSuccessMessage = () => {
    setTimeout(() => {
      setSuccessSubmit(false);
    }, 5000);
  };

  const postReview = async (data: FormData) => {
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
      clearSuccessMessage();
    } catch (error) {
      console.error(error);
      alert('Något gick fel, försök igen');
    }
  };

  const onSubmit: SubmitHandler<FormData> = (data) => {
    data.rate = rateValue || 0;
    data.userId = props.userId;
    data.activity = { id: props.activity };
    data.review = review;
    postReview(data);
  };

  useEffect(() => {
    if (rateValue === null || review === '') {
      setButtonDisabled(true);
    } else {
      setButtonDisabled(false);
    }
  }, [rateValue, review]);

  // Reset form when the modal is closed
  useEffect(() => {
    if (!props.open) {
      setRateValue(null);
      reset({ review: '' });
    }
  }, [props.open]);

  return (
    <>
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
          {...register('review', { required: true, maxLength: 500 })}
        />
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <StyledSubmitButton disabled={buttonDisabled} type='submit'>
            Skicka
          </StyledSubmitButton>
          {successSubmit && <SuccessMessage>Tack för din feedback</SuccessMessage>}
          {errors.review?.type === 'maxLength' && (
            <ErrorStyled>Får inte vara längre än 500 tecken</ErrorStyled>
          )}
          {errors.review?.type === 'required' && (
            <ErrorStyled>Fältet får inte vara tomt</ErrorStyled>
          )}
        </div>
      </form>
    </>
  );
};

export default PostReviewComponent;
