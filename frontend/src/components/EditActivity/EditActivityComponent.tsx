import React, { useState, useEffect } from 'react';
import { ActivityType, RegisterActivity } from '@/types/Activities';
import axios from 'axios';
import dayjs from 'dayjs';
import { GlobalStyles, types } from '@kokitotsos/react-components';
import EditDateTimePickerComponent from './EditDateTimePickerComponent';
import EditInputComponent from './EditInputComponent';
import EditTypeComponent from './EditKitsConTypeComponent';
import { useActivityInput } from '@/utils/Hooks/RegisterActivity/useActivityInput';
import { useExternalPresenter, usePresenter } from '@/utils/Hooks/RegisterActivity/usePresenter';
import EditLocationComponent from './EditLocationComponent';
import EditPresenterComponent from './EditPresenterComponent';
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
import EditExternalPresenterComponent from './EditExtraPresenterComponent';

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

  const [editActivity, setEditActivity] = useState({
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
  const [isPresenterFilled, setIsPresenterFilled] = useFormField(false);
  const [isExternalPresenterFilled, setIsExternalPresenterFilled] = useFormField(false);
  const [textError, setTextError] = useFormField(false);

  const {
    presenter,
    presenterError,
    suggestions,
    handlePresenterChange,
    handleSuggestionClick,
    addPresenter,
    setPresenter,
  } = usePresenter();

  const {
    externalPresenter,
    handleExternalPresenterChange,
    addExternalPresenter,
    setExternalPresenter,
  } = useExternalPresenter();

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
        setEditActivity(response.data);
        setEndTime(response.data);
        setShowTimeDuration(durationInMinutes);
      } catch (error) {
        console.error('Error fetching activity:', error);
      }
    };
    fetchActivity();
    return () => {
      setEditActivity({} as RegisterActivity);
    };
  }, [openEditModal]);

  // Function to submit the form
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      await axios.put(`${backendIP}/api/activity/update`, editActivity);

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
              type={editActivity.type as types.TimeslotType}
              setEditActivity={setEditActivity}
              editActivity={editActivity}
            />

            <EditDateTimePickerComponent
              sxDateTimePickerStyles={sxDateTimePickerStyles}
              DateTimePropsStyles={DateTimePropsStyles}
              editActivity={editActivity}
              setEditActivity={setEditActivity}
              setIsEndFilled={setIsEndFilled}
              setIsStartFilled={setIsStartFilled}
              endTime={endTime?.end}
              showTimeDuration={showTimeDuration}
            />

            <EditInputComponent
              editActivity={editActivity}
              setEditActivity={setEditActivity}
              setIsTitleFilled={setIsTitleFilled}
              setIsDetailsFilled={setIsDetailsFilled}
              setTextError={setTextError}
              error={textError}
            />

            <EditLocationComponent
             setEditActivity={setEditActivity}
             editActivity={editActivity}
             StoredCoords={activityProp?.location?.coordinates}
            />

            <EditPresenterComponent
            presenter={presenter}
            suggestions={suggestions}
            presenterError={presenterError}
            handlePresenterChange={handlePresenterChange}
            handleSuggestionClick={handleSuggestionClick}
            editActivity={editActivity}
            setEditActivity={setEditActivity}
            setPresenter={setPresenter}
            setIsPresenterFilled={setIsPresenterFilled}
            addPresenter={addPresenter}
            />

            <EditExternalPresenterComponent
            externalPresenter={externalPresenter}
            handleExternalPresenterChange={handleExternalPresenterChange}
            editActivity={editActivity}
            setEditActivity={setEditActivity}
            setIsExternalPresenterFilled={setIsExternalPresenterFilled}
            addExternalPresenter={addExternalPresenter}
            setExternalPresenter={setExternalPresenter}
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
