import React, { useState, useEffect } from 'react';
import { ActivityType, RegisterActivity } from '@/types/Activities';
import axios from 'axios';
import dayjs from 'dayjs';
import { GlobalStyles, types } from '@kokitotsos/react-components';
import EditDateTimePickerComponent from './EditDateTimePickerComponent';
import EditInputComponent from './EditInputComponent';
import EditTypeComponent from './EditKitsConTypeComponent';
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
import { SelectChangeEvent } from '@mui/material';

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

  const [isStartFilled, setIsStartFilled] = useFormField(true);
  const [isEndFilled, setIsEndFilled] = useFormField(true);
  const [isTitleFilled, setIsTitleFilled] = useFormField(true);
  const [isDetailsFilled, setIsDetailsFilled] = useFormField(true);
  const [isPresenterFilled, setIsPresenterFilled] = useFormField(true);
  const [isExternalPresenterFilled, setIsExternalPresenterFilled] = useFormField(true);
  const [showPresenter, setShowPresenter] = useFormField(false);
  const [showLocation, setShowLocation] = useFormField(false);
  const [showExternalPresenter, setShowExternalPresenter] = useFormField(false);

  const isAllFieldsFilled = useAllFieldsFilled(
    isStartFilled,
    isEndFilled,
    isTitleFilled,
    isDetailsFilled,
    showLocation,
    showPresenter,
    isPresenterFilled,
    showExternalPresenter,
    isExternalPresenterFilled,
    editActivity,
  );
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

  function handleActivityInputChange(e: SelectChangeEvent<types.TimeslotType>) {
    const { name, value } = e.target;
    if (name === 'type' && value) {
      setEditActivity({ ...editActivity, type: value as types.TimeslotType });

      if (value === types.TimeslotType.Presentation) {
        setShowPresenter(true);
        setShowLocation(false);
        setShowExternalPresenter(false);
      } else if (
        value === types.TimeslotType.Airplane ||
        value === types.TimeslotType.Boat ||
        value === types.TimeslotType.Bus ||
        value === types.TimeslotType.CheckIn ||
        value === types.TimeslotType.Coffee ||
        value === types.TimeslotType.Drink ||
        value === types.TimeslotType.Food ||
        value === types.TimeslotType.Hotel ||
        value === types.TimeslotType.Running ||
        value === types.TimeslotType.Skiing ||
        value === types.TimeslotType.Train ||
        value === types.TimeslotType.Workshop ||
        value === types.TimeslotType.Location
      ) {
        setShowPresenter(false);
        setShowExternalPresenter(false);
        setShowLocation(true);
      } else if (value === types.TimeslotType.ExternalPresentation) {
        setShowPresenter(false);
        setShowExternalPresenter(true);
        setShowLocation(false);
      }
    }
  }

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
  
        // Set showPresenter, showExternalPresenter, and showLocation based on fetchedActivity.type
        if (fetchedActivity.type === types.TimeslotType.Presentation) {
          setShowPresenter(true);
          setShowLocation(false);
          setShowExternalPresenter(false);
        } else if (
          fetchedActivity.type === types.TimeslotType.Airplane ||
          fetchedActivity.type === types.TimeslotType.Boat ||
          fetchedActivity.type === types.TimeslotType.Bus ||
          fetchedActivity.type === types.TimeslotType.CheckIn ||
          fetchedActivity.type === types.TimeslotType.Coffee ||
          fetchedActivity.type === types.TimeslotType.Drink ||
          fetchedActivity.type === types.TimeslotType.Food ||
          fetchedActivity.type === types.TimeslotType.Hotel ||
          fetchedActivity.type === types.TimeslotType.Running ||
          fetchedActivity.type === types.TimeslotType.Skiing ||
          fetchedActivity.type === types.TimeslotType.Train ||
          fetchedActivity.type === types.TimeslotType.Workshop ||
          fetchedActivity.type === types.TimeslotType.Location
        ) {
          setShowPresenter(false);
          setShowExternalPresenter(false);
          setShowLocation(true);
        } else if (fetchedActivity.type === types.TimeslotType.ExternalPresentation) {
          setShowPresenter(false);
          setShowExternalPresenter(true);
          setShowLocation(false);
        }
      } catch (error) {
        console.error('Error fetching activity:', error);
      }
    };
    fetchActivity();
  }, [openEditModal]);

  // Function to submit the form
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      await axios.put(`${backendIP}/api/activity/update`, editActivity);

      setOpenEditModal(false);
      // temporary solution to refresh the page after updating an activity
      window.location.reload();
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
              handleActivityInputChange={handleActivityInputChange}
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
            {showLocation && editActivity.location.coordinates !== '' && (
              <EditLocationComponent
                setEditActivity={setEditActivity}
                editActivity={editActivity}
                StoredCoords={activityProp?.location?.coordinates}
              />
            )}

            {showPresenter && (
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
            )}
            {showExternalPresenter && (
              <EditExternalPresenterComponent
                externalPresenter={externalPresenter}
                handleExternalPresenterChange={handleExternalPresenterChange}
                editActivity={editActivity}
                setEditActivity={setEditActivity}
                setIsExternalPresenterFilled={setIsExternalPresenterFilled}
                addExternalPresenter={addExternalPresenter}
                setExternalPresenter={setExternalPresenter}
              />
            )}
            <StyledLine1 />
            <BoxWrapper1>
              <SaveButton type='submit' id='spara-button' disabled={!isAllFieldsFilled}>
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
