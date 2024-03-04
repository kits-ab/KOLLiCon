import { useForm, SubmitHandler } from 'react-hook-form';
import axios from 'axios';
import { GlobalStyles } from '@kokitotsos/react-components';
import {
  EventsWrapper,
  StyledButton,
  StyledInput,
  PStyled,
  StyledDiv,
  StyledTextArea,
} from '../../styles/RegisterActivity/StyledActivity';

interface Props {
  userId: string;
  title: string;
  type: string;
  tagLine: string;
  description: string;
  imageURL: string;
  location: string;
  active: boolean;
  start: string;
  end: string;
}

const postSchedule = async (data: Props) => {
  try {
    const response = await axios.post('http://localhost:8080/api/schedule/post', data);
    console.log(response);
    alert('Schedule created');
  } catch (error) {
    console.error(error);
  }
};

const ScheduleForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Props>({
    defaultValues: {
      userId: '',
      title: '',
      type: '',
      tagLine: '',
      description: '',
      imageURL: '',
      location: '',
      active: true,
      start: '',
      end: '',
    },
    mode: 'onChange',
  });

  const onSubmit: SubmitHandler<Props> = (data) => {
    postSchedule(data);
  };

  return (
    <>
      <GlobalStyles />
      <EventsWrapper>
        <form style={{ display: 'flex', flexDirection: 'column' }}>
          <StyledDiv>
            <PStyled style={{ color: '#D4D4D4', marginTop: '10%' }}>Schedule Info</PStyled>
            <StyledInput
              placeholder='Title'
              {...register('title', { required: 'Title is required' })}
            />
            {errors.title && <p>{errors.title.message}</p>}
            <StyledInput
              placeholder='Start date'
              type='date'
              {...register('start', { required: 'Start date is required' })}
            />
            {errors.start && <p>{errors.start.message}</p>}
            <StyledInput
              type='date'
              placeholder='End date'
              {...register('end', { required: 'End date is required' })}
            />
            {errors.end && <p>{errors.end.message}</p>}
            <StyledInput placeholder='Type' {...register('type')} />
            <StyledInput placeholder='Tag Line' {...register('tagLine')} />
            <StyledTextArea
              style={{ height: '100px' }}
              placeholder='Description'
              {...register('description')}
            />
            <StyledInput placeholder='Image' {...register('imageURL')} />
            <StyledInput placeholder='Location' {...register('location')} />
            <StyledButton onClick={handleSubmit(onSubmit)}>Submit</StyledButton>
          </StyledDiv>
        </form>
      </EventsWrapper>
    </>
  );
};

export default ScheduleForm;
