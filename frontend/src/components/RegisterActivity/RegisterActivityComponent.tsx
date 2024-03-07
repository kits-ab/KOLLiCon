import { types, GlobalStyles } from '@kokitotsos/react-components';
import axios from 'axios';
import dayjs from 'dayjs';
import LocationComponent from './LocationComponent';
import PresenterComponent from './PresenterComponent';
import ExternalPresenterComponent from './ExtraPresenterComponent';
import TypeComponent from './KitsConTypeComponent';
import DateTimePickerComponent from './DatetimePickerComponent';
import InputComponent from './InputComponent';
import { useActivityInput } from '../../utils/Hooks/RegisterActivity/useActivityInput';
import {
  sxDateTimePickerStyles,
  DateTimePropsStyles,
} from '@/styles/Common/DateTimePicker/StyledDateTimePicker';
import {
  useFormField,
  useAllFieldsFilled,
} from '../../utils/Hooks/RegisterActivity/useAllFieldsFilled';
import {
  usePresenter,
  useExternalPresenter,
} from '../../utils/Hooks/RegisterActivity/usePresenter';
import {
  EventsWrapper,
  StyledDiv,
  StyledLine,
  StyledLine1,
  TypeFormStyled,
  TypeSelectStyled,
  CancelButton,
  SaveButton,
  GlobalBox,
  BoxWrapper1,
  HeaderStyled,
} from '../../styles/RegisterActivity/StyledActivity';
import { RegisterPerson } from '@/types/Activities';

const backendIP = import.meta.env.VITE_API_URL;

function Activity({ onClose }: any) {
  const [isStartFilled, setIsStartFilled] = useFormField(false);
  const [isEndFilled, setIsEndFilled] = useFormField(false);
  const [isTitleFilled, setIsTitleFilled] = useFormField(false);
  const [isDetailsFilled, setIsDetailsFilled] = useFormField(false);
  const [isPresenterFilled, setIsPresenterFilled] = useFormField(false);
  const [isExternalPresenterFilled, setIsExternalPresenterFilled] = useFormField(false);

  const {
    presenter,
    error,
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
    ExtraPresenterError,
  } = useExternalPresenter();

  const {
    type,
    activity,
    showPresenter,
    showLocation,
    showExternalPresenter,
    handleActivityInputChange,
    setActivity,
    resetActivity,
    handleLocationChange,
    setLocation,
    location,
  } = useActivityInput(types.TimeslotType.Airplane);

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
    activity,
  );

  //Function to handle the submit of the form
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    console.log('yoo');
    e.preventDefault();
    try {
      const activityData = { ...activity, location: location };

      await axios.post(`${backendIP}/api/activity`, activityData);
      window.location.reload();
    } catch (error) {
      console.error('Error submitting activity:', error);
    }
  };

  //Function to close the modal
  const handleCancelButtonClick = () => {
    onClose();
    resetActivity();
  };

  //Function to handle the input change for title and details
  const handleOnInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setActivity({ ...activity, [name]: value });

    if (name === 'title') {
      setIsTitleFilled(!!value);
    } else if (name === 'details') {
      setIsDetailsFilled(!!value);
    }
  };

  //Function to convert the array to string and add coordinates to the location
  const handleCoordinates = (coords: number[]) => {
    setLocation((prevLocation) => ({
      ...prevLocation,
      coordinates: coords.join(','),
    }));
  };

  //function to reset the location data
  const handleResetLocation = () => {
    setLocation({ ...location, coordinates: '' });
  };

  //Function to handle the date change
  const handleDateChange = (name: string, date: Date) => {
    setActivity({ ...activity, [name]: dayjs(date).format('YYYY-MM-DDTHH:mm') });

    if (name === 'start') {
      setIsStartFilled(!!date);
    } else if (name === 'end') {
      setIsEndFilled(!!date);
    }
  };

  //Function to delete the presenter
  const handleDeletePresenter = (index: number) => {
    const updatedPresenters = [...activity.presenter];
    updatedPresenters.splice(index, 1);
    setActivity({ ...activity, presenter: updatedPresenters });
    setIsPresenterFilled(updatedPresenters.length > 0);
  };

  //Function to delete the external presenter
  const handleDeleteExternalPresenter = (index: number) => {
    const updatedExternalPresenters = [...activity.externalPresenter];
    updatedExternalPresenters.splice(index, 1);
    setActivity({ ...activity, externalPresenter: updatedExternalPresenters });
    setIsExternalPresenterFilled(updatedExternalPresenters.length > 0);
  };

  //Function to handle the presenter change
  const handleAddPresenter = async () => {
    // Add presenter to the activity state
    const newPresenter = await addPresenter();
    if (newPresenter) {
      setActivity({
        ...activity,
        presenter: [...activity.presenter, newPresenter],
      });
      // Check if the presenter is filled
      setIsPresenterFilled(newPresenter.name !== '');
      setPresenter({
        name: '',
        avatarSrc: '',
      });
    }
  };

  //Function to handle the external presenter change
  const handleAddExternalPresenter = () => {
    // Add external presenter to the activity state
    const newExternalPresenter = addExternalPresenter() as RegisterPerson;
    setActivity({
      ...activity,
      externalPresenter: [...activity.externalPresenter, newExternalPresenter],
    });
    // Check if the external presenter is filled
    setIsExternalPresenterFilled(externalPresenter.name !== '');
    setExternalPresenter({
      name: '',
      avatarSrc: '',
    });
  };

  return (
    <>
      <GlobalBox>
        <img src='' alt='' />
        <GlobalStyles />
        <HeaderStyled>Ny aktivitiet</HeaderStyled>
        <StyledLine />
        <EventsWrapper>
          <form onSubmit={handleSubmit}>
            <StyledDiv>
              <TypeComponent
                TypeFormStyled={TypeFormStyled}
                TypeSelectStyled={TypeSelectStyled}
                type={type as types.TimeslotType}
                handleActivityInputChange={handleActivityInputChange}
              />
              <DateTimePickerComponent
                sxDateTimePickerStyles={sxDateTimePickerStyles}
                DateTimePropsStyles={DateTimePropsStyles}
                activity={activity}
                handleDateChange={handleDateChange}
              />
              <InputComponent activity={activity} handleOnInputChange={handleOnInputChange} />

              {showPresenter && (
                <PresenterComponent
                  presenter={presenter}
                  suggestions={suggestions}
                  error={error}
                  handlePresenterChange={handlePresenterChange}
                  handleSuggestionClick={handleSuggestionClick}
                  handleAddPresenter={handleAddPresenter}
                  handleDeletePresenter={handleDeletePresenter}
                  activity={activity}
                />
              )}
              {showExternalPresenter && (
                <ExternalPresenterComponent
                  externalPresenter={externalPresenter}
                  handleExternalPresenterChange={handleExternalPresenterChange}
                  handleAddExternalPresenter={handleAddExternalPresenter}
                  handleDeleteExternalPresenter={handleDeleteExternalPresenter}
                  activity={activity}
                  error={ExtraPresenterError}
                />
              )}
              {showLocation && (
                <LocationComponent
                  location={location}
                  handleLocationChange={handleLocationChange}
                  handleCoordinates={handleCoordinates}
                  handleResetLocation={handleResetLocation}
                />
              )}

              <StyledLine1 />
              <BoxWrapper1>
                <SaveButton type='submit' id='spara-button' disabled={!isAllFieldsFilled}>
                  Spara
                </SaveButton>
                <CancelButton onClick={handleCancelButtonClick}>Avbryt</CancelButton>
              </BoxWrapper1>
            </StyledDiv>
          </form>
        </EventsWrapper>
      </GlobalBox>
    </>
  );
}
export default Activity;
