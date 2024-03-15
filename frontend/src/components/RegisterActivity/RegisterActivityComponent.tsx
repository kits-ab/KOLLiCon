import { types, GlobalStyles } from '@kokitotsos/react-components';
import axios from 'axios';
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

const backendIP = import.meta.env.VITE_API_URL;

function Activity({ onClose }: any) {
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
                setActivity={setActivity}
                setIsEndFilled={setIsEndFilled}
                setIsStartFilled={setIsStartFilled}
              />
              <InputComponent
                activity={activity}
                error={textError}
                setIsDetailsFilled={setIsDetailsFilled}
                setIsTitleFilled={setIsTitleFilled}
                setActivity={setActivity}
                setTextError={setTextError}
              />

              {showPresenter && (
                <PresenterComponent
                  presenter={presenter}
                  suggestions={suggestions}
                  presenterError={presenterError}
                  handlePresenterChange={handlePresenterChange}
                  handleSuggestionClick={handleSuggestionClick}
                  activity={activity}
                  setActivity={setActivity}
                  setPresenter={setPresenter}
                  setIsPresenterFilled={setIsPresenterFilled}
                  addPresenter={addPresenter}
                />
              )}
              {showExternalPresenter && (
                <ExternalPresenterComponent
                  externalPresenter={externalPresenter}
                  handleExternalPresenterChange={handleExternalPresenterChange}
                  activity={activity}
                  setActivity={setActivity}
                  setIsExternalPresenterFilled={setIsExternalPresenterFilled}
                  addExternalPresenter={addExternalPresenter}
                  setExternalPresenter={setExternalPresenter}
                />
              )}
              {showLocation && (
                <LocationComponent
                  location={location}
                  handleLocationChange={handleLocationChange}
                  setLocation={setLocation}
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
