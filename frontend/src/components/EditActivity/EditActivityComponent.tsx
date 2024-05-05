import React, { useState, useEffect } from 'react';
import { ActivityType, RegisterActivity } from '@/types/Activities';
import axios from 'axios';
import dayjs from 'dayjs';
import { GlobalStyles, Text, types } from '@kokitotsos/react-components';
import EditDateTimePickerComponent from './EditDateTimePickerComponent';
import EditInputComponent from './EditInputComponent';
import EditTypeComponent from './EditKitsConTypeComponent';
import { useExternalPresenter, usePresenter } from '@/utils/Hooks/RegisterActivity/usePresenter';
import EditLocationComponent from './EditLocationComponent';
import EditPresenterComponent from './EditPresenterComponent';
import { useFormField } from '@/utils/Hooks/RegisterActivity/useAllFieldsFilled';
import {
  DateTimePropsStyles,
  sxDateTimePickerStyles,
} from '@/styles/Common/DateTimePicker/StyledDateTimePicker';
import {
  BoxWrapper1,
  CancelButton,
  EventsWrapper,
  GlobalBox,
  SaveButton,
  StyledDiv,
  StyledLine,
  StyledLine1,
  TypeFormStyled,
  TypeSelectStyled,
} from '@/styles/RegisterActivity/StyledActivity';
import EditExternalPresenterComponent from './EditExtraPresenterComponent';
import { SelectChangeEvent } from '@mui/material';
import TerminateActivityDialog from './DeleteActivityDialog';
import { fetchActivityToSetType } from '../../utils/Hooks/EditActivity/fetchActivityToSetType';
import {
  useActivityState,
  handleActivityInputChange,
} from '@/utils/Hooks/EditActivity/useActivityState';
import { DeleteActivityBox } from './DeleteActivityBox';
import { getUserAccessToken } from '@/utils/Authorization/Auth';
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
  const [textError, setTextError] = useFormField(false);
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

  const {
    setIsStartFilled,
    setIsEndFilled,
    setIsTitleFilled,
    setIsDetailsFilled,
    setIsPresenterFilled,
    setIsExternalPresenterFilled,
    showPresenter,
    setShowPresenter,
    showLocation,
    setShowLocation,
    showExternalPresenter,
    setShowExternalPresenter,
    openApproveModal,
    setOpenApproveModal,
    isAllFieldsFilled,
  } = useActivityState();

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

  // Function to handle the change of the type of the activity
  function handleInputChange(e: SelectChangeEvent<types.TimeslotType>) {
    handleActivityInputChange(
      e,
      setEditActivity,
      setShowPresenter,
      setShowLocation,
      setShowExternalPresenter,
      editActivity,
    );
  }

  // Fetch the activity to set the type of the activity
  useEffect(() => {
    fetchActivityToSetType(
      activityProp as unknown as RegisterActivity,
      setEditActivity,
      setEndTime,
      setShowTimeDuration,
      setShowPresenter,
      setShowExternalPresenter,
      setShowLocation,
    );
  }, [openEditModal]);

  // Function to submit the form
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      await axios.put(`${backendIP}/api/activity/update`, editActivity, {
        headers: {
          Authorization: `Bearer ${await getUserAccessToken()}`,
        },
      });

      setOpenEditModal(false);
      // temporary solution to refresh the page after updating an activity
      window.location.reload();
    } catch (error) {
      console.error('Error updating activity:', error);
    }
  };
  //Function to close the modal
  const handleCloseModal = () => {
    resetActivity();
    setOpenEditModal(false);
  };

  function handleDeleteActivity(event: React.MouseEvent<HTMLDivElement, MouseEvent>): void {
    event.preventDefault();
    setOpenApproveModal(true);
  }

  const finalTermination = async () => {
    try {
      await axios.delete(`${backendIP}/api/activity/delete/${activityProp.id}`, {
        headers: {
          Authorization: `Bearer ${await getUserAccessToken()}`,
        },
      });
      window.location.reload();
    } catch (error) {
      console.error('Error terminating activity:', error);
    }
  };

  const resetActivity = () => {
    setEditActivity({
      type: editActivity.type,
      location: {
        title: editActivity.location.title,
        subtitle: editActivity.location.subtitle,
        coordinates: editActivity.location.coordinates,
      },
      presenter: editActivity.presenter,
      externalPresenter: editActivity.externalPresenter,
      title: editActivity.title,
      details: editActivity.details,
      start: dayjs(activityProp.start),
      end: dayjs(activityProp.end),
    } as unknown as RegisterActivity);
    setShowTimeDuration(0);
  };

  return (
    <GlobalBox>
      <GlobalStyles />
      <Text>
        <DeleteActivityBox handleDeleteActivity={handleDeleteActivity} />
        <StyledLine />
        <EventsWrapper>
          <form onSubmit={handleSubmit}>
            <StyledDiv>
              <EditTypeComponent
                TypeFormStyled={TypeFormStyled}
                TypeSelectStyled={TypeSelectStyled}
                type={editActivity.type as types.TimeslotType}
                handleActivityInputChange={handleInputChange}
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
                <CancelButton onClick={handleCloseModal}>Avbryt</CancelButton>
                <SaveButton type='submit' id='spara-button' disabled={!isAllFieldsFilled}>
                  Uppdatera
                </SaveButton>
              </BoxWrapper1>
            </StyledDiv>
          </form>
        </EventsWrapper>
        <TerminateActivityDialog
          open={openApproveModal}
          onClose={() => setOpenApproveModal(false)}
          onTerminate={finalTermination}
        />
      </Text>
    </GlobalBox>
  );
};

export default EditActivity;
