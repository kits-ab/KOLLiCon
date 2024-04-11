// TitleInput.tsx
import React from 'react';
import { InputStyled, TextAreaStyled } from '@/styles/RegisterActivity/StyledActivity';
import { CreateSchedule } from '@/types/Schedule';

type InputProps = {
    schedule: CreateSchedule;
    setSchedule: React.Dispatch<React.SetStateAction<CreateSchedule>> | any;
};

const InputComponent: React.FC<InputProps> = ({ schedule, setSchedule }) => {
    const handleOnInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setSchedule({ ...schedule, [name]: value });
      };
  return (
    <>
        <InputStyled
          type='text'
          name='type'
          placeholder='Type'
          value={schedule.type}
          onChange={handleOnInputChange}
        />
      <InputStyled
        type='text'
        name='title'
        placeholder='Titel'
        value={schedule.title}
        onChange={handleOnInputChange}
      />
        <TextAreaStyled
          name='description'
          placeholder='Beskrivning'
          value={schedule.description}
          onChange={handleOnInputChange}
        />
      <InputStyled
        type='text'
        name='tagLine'
        placeholder='Tag Line'
        value={schedule.tagLine}
        onChange={handleOnInputChange}
      />
      <InputStyled
        type='text'
        name='location'
        placeholder='Location'
        value={schedule.location}
        onChange={handleOnInputChange}
      />
    </>
  );
};

export default InputComponent;
