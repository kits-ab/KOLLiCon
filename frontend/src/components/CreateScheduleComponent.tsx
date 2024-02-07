import { useForm, SubmitHandler } from 'react-hook-form';
import axios from 'axios';
import { Button, GlobalStyles, WrapperProps, colors } from '@kokitotsos/react-components';

import styled from '@emotion/styled';

interface Props {
  userId: string;
  title: string;
  type: string;
  tagLine: string;
  location: string;
  active: boolean;
  start: string;
  end: string;
}

const EventsWrapper = styled.div<WrapperProps>`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  padding: 20px;
  background-color: ${colors.background3};
  color: white;
`;

const StyledButton = styled.button`
  background-color: ${colors.primary};
  border-radius: 20px;
  color: black;
  padding: 10px;
  margin: 10px;
  border: solid 1px white;
  cursor: pointer;
`;

const StyledInput = styled.input`
  padding: 10px;
  margin: 10px;
`;

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
          <label>Title:</label>
          <StyledInput {...register('title', { required: 'Title is required' })} />
          {errors.title && <p>{errors.title.message}</p>}
          <label>Start:</label>
          <StyledInput type='date' {...register('start', { required: 'Start date is required' })} />
          {errors.start && <p>{errors.start.message}</p>}
          <label>End:</label>
          <StyledInput type='date' {...register('end', { required: 'End date is required' })} />
          {errors.end && <p>{errors.end.message}</p>}
          <label>Type:</label> <StyledInput {...register('type')} />
          <label>Tag Line:</label> <StyledInput {...register('tagLine')} />
          <label>Location:</label> <StyledInput {...register('location')} />
          <Button onClick={handleSubmit(onSubmit)}>Submit</Button>
        </form>
      </EventsWrapper>
    </>
  );
};

export default ScheduleForm;
