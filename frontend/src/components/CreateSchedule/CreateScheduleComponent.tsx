import { useForm, SubmitHandler } from 'react-hook-form';
import axios from 'axios';
import { GlobalStyles } from '@kokitotsos/react-components';
import {
  EventsWrapper,
  SubmitButton,
  InputStyled,
  TitleStyled,
  StyledDiv,
  TextAreaStyled,
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
            <TitleStyled style={{marginTop: '10%'}}>Schedule Info</TitleStyled>
            <InputStyled
              placeholder='Title'
              {...register('title', { required: 'Title is required' })}
            />
            {errors.title && <p>{errors.title.message}</p>}
            <InputStyled
              placeholder='Start date'
              type='date'
              {...register('start', { required: 'Start date is required' })}
            />
            {errors.start && <p>{errors.start.message}</p>}
            <InputStyled
              type='date'
              placeholder='End date'
              {...register('end', { required: 'End date is required' })}
            />
            {errors.end && <p>{errors.end.message}</p>}
            <InputStyled placeholder='Type' {...register('type')} />
            <InputStyled placeholder='Tag Line' {...register('tagLine')} />
            <TextAreaStyled
              style={{ height: '100px' }}
              placeholder='Description'
              {...register('description')}
            />
            <InputStyled placeholder='Image' {...register('imageURL')} />
            <InputStyled placeholder='Location' {...register('location')} />
            <SubmitButton onClick={handleSubmit(onSubmit)}>Submit</SubmitButton>
          </StyledDiv>
        </form>
      </EventsWrapper>
    </>
  );
};

export default ScheduleForm;
