import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { MobileDatePicker } from '@mui/x-date-pickers/MobileDatePicker';
import dayjs from 'dayjs';
import {
  BoxWrapper1,
  CancelButton,
  EventsWrapper,
  GlobalBox,
  HeaderStyled,
  InputStyled,
  SaveButton,
  StyledDiv,
  StyledLine,
  StyledLine1,
  TextAreaStyled,
  TypeFormStyled,
  TypeSelectStyled,
} from '@/styles/RegisterActivity/StyledActivity';
import { GlobalStyles, Text } from '@kokitotsos/react-components';
import {
  DateTimePropsStyles,
  sxDateTimePickerStyles,
  DatePickerWrapper,
} from '@/styles/Common/DateTimePicker/StyledDateTimePicker';
import { Colors } from '@/styles/Common/colors';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import OutlinedInput from '@mui/material/OutlinedInput';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';

type scheduleType = {
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
};

const backendIP = import.meta.env.VITE_API_URL;

function ScheduleComponent({ onClose, onOpen, openScheduleModal }: any) {
  const [imageList, setImageList] = useState<any[]>([]);
  const [selectedName, setSelectedName] = useState<string>('');
  const [names, setNames] = useState<string[]>([]);
  const initialScheduleState: scheduleType = {
    userId: '',
    type: '',
    start: '',
    end: '',
    title: '',
    description: '',
    tagLine: '',
    imageURL: '',
    location: '',
    active: true,
  };

  const [schedule, setSchedule] = useState<scheduleType>(initialScheduleState);

  // Function to check if all fields except userId are filled
  const areAllFieldsFilled = () => {
    const { userId, ...otherFields } = schedule;
    return Object.values(otherFields).every((value) => value !== '');
  };

  const resetSchedule = () => {
    setSchedule(initialScheduleState);
  };

  const handleDateChange = (name: string, date: Date) => {
    setSchedule({ ...schedule, [name]: dayjs(date).format('YYYY-MM-DD') });
  };

  const handleOnInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setSchedule({ ...schedule, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await axios.post(`${backendIP}/api/schedule/post`, schedule);
      window.location.reload();
    } catch (error) {
      console.error('Error submitting schedule:', error);
    }
  };

  useEffect(() => {
    // Fetch images from the kits repository
    fetch('https://api.github.com/repos/kits-ab/kits/contents/static/assets')
      .then((response) => response.json())
      .then((data) => {
        console.log('Fetched data:', data);
        // Filter images that start with 'kitscon_'
        const filteredImages = data.filter((item: any) => {
          return /^kitscon_\d+([-_.]\d+|\d+_\d+)\.\w+$/.test(item.name);
        });
        setImageList(filteredImages);
        setNames(filteredImages.map((item: any) => item.name));
      })
      .catch((error) => console.error('Error fetching images:', error));
  }, []);
  // Function to handle the change of the image name
  const handleNameChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    const name = event.target.value as string;
    setSelectedName(name);
    const selectedImage = imageList.find((image) => image.name === name);
    if (selectedImage) {
      // Update schedule state with imageURL
      setSchedule({ ...schedule, imageURL: selectedImage.download_url });
    } else {
      // Reset imageURL in schedule state if no image is selected
      setSchedule({ ...schedule, imageURL: '' });
    }
  };

  return (
    <div>
      <SwipeableDrawer
        anchor='bottom'
        open={openScheduleModal}
        onClose={onClose}
        onOpen={onOpen}
        PaperProps={{
          style: {
            height: '100%',
            overflow: 'scroll',
            backgroundColor: `${Colors.primaryBackground}`,
            borderRadius: '0',
          },
        }}
      >
        <GlobalBox>
          <GlobalStyles />
          <Text>
            <HeaderStyled>
              <h3>Nytt Schema</h3>
            </HeaderStyled>
            <StyledLine />
            <EventsWrapper>
              <form onSubmit={handleSubmit}>
                <StyledDiv>
                  <InputStyled
                    type='text'
                    name='type'
                    placeholder='Type'
                    value={schedule.type}
                    onChange={handleOnInputChange}
                  />
                  <DatePickerWrapper>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <MobileDatePicker
                        label='Starttid'
                        format='YYYY-MM-DD'
                        sx={{ ...sxDateTimePickerStyles }}
                        slotProps={DateTimePropsStyles}
                        value={schedule.start || null}
                        onChange={(date: Date | any) => handleDateChange('start', date)}
                      />
                      <MobileDatePicker
                        label='Sluttid'
                        format='YYYY-MM-DD'
                        sx={{ ...sxDateTimePickerStyles }}
                        slotProps={DateTimePropsStyles}
                        value={schedule.end || null}
                        onChange={(date: Date | any) => handleDateChange('end', date)}
                      />
                    </LocalizationProvider>
                  </DatePickerWrapper>
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
                  {/* KitsCon Image Selection*/}
                  <FormControl sx={{ ...TypeFormStyled }}>
                    <InputLabel id='type-label'>KitsCon Image</InputLabel>
                    <Select
                      MenuProps={{
                        PaperProps: {
                          sx: { ...TypeSelectStyled },
                        },
                      }}
                      labelId='logo-label'
                      id='schedule-logo'
                      name='imageURL'
                      value={selectedName}
                      onChange={(e: SelectChangeEvent<string>) => handleNameChange(e)}
                      input={<OutlinedInput label='KitsCon Logo' />}
                    >
                      {names.map((name, index) => (
                        <MenuItem key={index} value={name}>
                          {name}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>

                  <InputStyled
                    type='text'
                    name='location'
                    placeholder='Location'
                    value={schedule.location}
                    onChange={handleOnInputChange}
                  />
                  <StyledLine1 />
                  <BoxWrapper1>
                    <CancelButton
                      onClick={() => {
                        onClose();
                        resetSchedule();
                      }}
                    >
                      Avbryt
                    </CancelButton>
                    <SaveButton type='submit' id='spara-button' disabled={!areAllFieldsFilled()}>
                      Spara
                    </SaveButton>
                  </BoxWrapper1>
                </StyledDiv>
              </form>
            </EventsWrapper>
          </Text>
        </GlobalBox>
      </SwipeableDrawer>
    </div>
  );
}

export default ScheduleComponent;
