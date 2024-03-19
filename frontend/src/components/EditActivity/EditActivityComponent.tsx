import React, { useState, useEffect } from 'react';
import { ActivityType, RegisterActivity } from '@/types/Activities';
import axios from 'axios';
import dayjs from 'dayjs';
import { GlobalStyles, types } from '@kokitotsos/react-components';
import EditDateTimePickerComponent from './EditDateTimePickerComponent';
import EditInputComponent from './EditInputComponent';
import EditTypeComponent from './EditKitsConTypeComponent';
import { useActivityInput } from '@/utils/Hooks/RegisterActivity/useActivityInput';
import {
  useAllFieldsFilled,
  useFormField,
} from '@/utils/Hooks/RegisterActivity/useAllFieldsFilled';
import {
  DateTimePropsStyles,
  sxDateTimePickerStyles,
} from '@/styles/Common/DateTimePicker/StyledDateTimePicker';
import {
  BoxWrapper1,
  CancelButton,
  EventsWrapper,
  GlobalBox,
  HeaderStyled,
  SaveButton,
  StyledDiv,
  StyledLine,
  StyledLine1,
  TypeFormStyled,
  TypeSelectStyled,
} from '@/styles/RegisterActivity/StyledActivity';

const backendIP = import.meta.env.VITE_API_URL;

interface EditActivityProps {
  activityProp: ActivityType;
  setOpenEditModal: React.Dispatch<React.SetStateAction<boolean>>;
  openEditModal: boolean;
}

const EditActivity: React.FC<EditActivityProps> = ({
  activityProp,
  setOpenEditModal,
  openEditModal,
}) => {
  const [endTime, setEndTime] = useState<RegisterActivity | null>(null);
  const [showTimeDuration, setShowTimeDuration] = useState<number>(0);

  const [activity, setActivity] = useState({
    id: activityProp.id,
    schedule: 1,
    userId: '',
    winner: false,
    type: '',
    presenter: [],
    externalPresenter: [],
    location: { title: '', subtitle: '', coordinates: '' },
    title: '',
    details: '',
    start: dayjs(activityProp.start),
    end: dayjs(activityProp.end),
  } as unknown as RegisterActivity);
  // const [showPresenter, setShowPresenter] = useState(false);
  // const [showExternalPresenter, setShowExternalPresenter] = useState(false);
  // const [showLocation, setShowLocation] = useState(false);
  // const [location, setLocation] = useState({ title: '', subtitle: '', coordinates: '' });

  const [isStartFilled, setIsStartFilled] = useFormField(false);
  const [isEndFilled, setIsEndFilled] = useFormField(false);
  const [isTitleFilled, setIsTitleFilled] = useFormField(false);
  const [isDetailsFilled, setIsDetailsFilled] = useFormField(false);
  // const [isPresenterFilled, setIsPresenterFilled] = useFormField(false);
  // const [isExternalPresenterFilled, setIsExternalPresenterFilled] = useFormField(false);
  const [textError, setTextError] = useFormField(false);

  // const {
  //   showPresenter,
  //   showLocation,
  //   showExternalPresenter,
  //   handleActivityInputChange,
  //   setActivity,
  //   resetActivity,
  //   handleLocationChange,
  //   setLocation,
  //   location,
  // } = useActivityInput(types.TimeslotType.Airplane);

  // const { handleActivityInputChange, resetActivity, handleLocationChange } = useActivityInput(
  //   types.TimeslotType.Airplane,
  // );

  // const isAllFieldsFilled = useAllFieldsFilled(
  //   isStartFilled,
  //   isEndFilled,
  //   isTitleFilled,
  //   isDetailsFilled,
  //   showLocation,
  //   showPresenter,
  //   isPresenterFilled,
  //   showExternalPresenter,
  //   isExternalPresenterFilled,
  //   activity,
  // );

  // Fetch activity data, set it to the state, and calculate the duration
  useEffect(() => {
    const fetchActivity = async () => {
      try {
        const response = await axios.get(`${backendIP}/api/activity/${activityProp.id}`);
        const fetchedActivity = response.data;
        const durationInMinutes = dayjs(fetchedActivity.end).diff(
          dayjs(fetchedActivity.start),
          'minutes',
        );
        setActivity(response.data);
        setEndTime(response.data);
        setShowTimeDuration(durationInMinutes);
      } catch (error) {
        console.error('Error fetching activity:', error);
      }
    };
    fetchActivity();
    return () => {
      setActivity({} as RegisterActivity);
    };
  }, [openEditModal]);

  // Function to submit the form
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      await axios.put(`${backendIP}/api/activity/update`, activity);

      setOpenEditModal(false);
    } catch (error) {
      console.error('Error updating activity:', error);
    }
  };
  //Function to close the modal
  const handleCloseModal = () => {
    setOpenEditModal(false);
  };

  return (
    <GlobalBox>
      <GlobalStyles />
      <HeaderStyled style={{ marginTop: '27px' }}>Uppdatera aktivitiet</HeaderStyled>
      <StyledLine />
      <EventsWrapper>
        <form onSubmit={handleSubmit}>
          <StyledDiv>
            <EditTypeComponent
              TypeFormStyled={TypeFormStyled}
              TypeSelectStyled={TypeSelectStyled}
              type={activity.type as types.TimeslotType}
              setActivity={setActivity}
              activity={activity}
            />

            <EditDateTimePickerComponent
              sxDateTimePickerStyles={sxDateTimePickerStyles}
              DateTimePropsStyles={DateTimePropsStyles}
              activity={activity}
              setActivity={setActivity}
              setIsEndFilled={setIsEndFilled}
              setIsStartFilled={setIsStartFilled}
              endTime={endTime?.end}
              showTimeDuration={showTimeDuration}
            />

            <EditInputComponent
              activity={activity}
              setActivity={setActivity}
              setIsTitleFilled={setIsTitleFilled}
              setIsDetailsFilled={setIsDetailsFilled}
              setTextError={setTextError}
              error={textError}
            />

            <StyledLine1 />
            <BoxWrapper1>
              <SaveButton type='submit' id='spara-button'>
                Uppdatera
              </SaveButton>
              <CancelButton onClick={handleCloseModal}>Avbryt</CancelButton>
            </BoxWrapper1>
          </StyledDiv>
        </form>
      </EventsWrapper>
    </GlobalBox>
  );
};

export default EditActivity;
