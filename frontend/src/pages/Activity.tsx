import { useState,  } from 'react';
import { useNavigate } from 'react-router-dom';
import { types, GlobalStyles, Timeslot } from '@kokitotsos/react-components';
import axios from 'axios';
import StyledCheckbox from '../components/CheckBox';
import { StyledCheckboxWrapper } from '../components/CheckBox';
import {
  EventsWrapper,
  PStyled,
  StyledButton,
  StyledDiv,
  StyledInput,
  StyledSelect,
  StyledLine,
  StyledTextArea
} from '../styles/StyledActivity';

type Activity = {
  schedule: number;
  userId: string;
  winner: boolean;
  type: types.TimeslotType;
  presenter: types.Person[];
  location: { title: string; coordinates: string };
  title: string;
  details: string;
  start: string;
  end: string;
};

function Activity() {
  const navigate = useNavigate();
  const [showPresenter, setShowPresenter] = useState(false);
  const [showLocation, setShowLocation] = useState(false);

  const [location, setLocation] = useState({
    title: '',
    coordinates: '',
  });

  const [presenter, setPresenter] = useState({
    name: '',
    imageSrc: '',
  });

  const [activity, setActivity] = useState<Activity>({
    schedule:1,
    userId: '',
    winner: false,
    type: undefined,
    presenter: [],
    location: { title: '', coordinates: '' },
    title: '',
    details: '',
    start: '',
    end: '',
  } as unknown as Activity);

  // Function to handle presenter checkbox change
  const handlePresenterCheckboxChange = () => {
    setShowPresenter(!showPresenter);
  };

  // Function to handle location checkbox change
  const handleLocationCheckboxChange = () => {
    setShowLocation(!showLocation);
  };

  //Function to handle the submit of the form
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const activityData = { ...activity, location: location };

      const response = await axios.post('http://localhost:8080/api/activity', activityData);
      console.log(response.data);
      
      navigate('/activities');
    } catch (error) {
      console.error('Error submitting activity:', error);
    }
  };

  //Function to handle the activity input change
  const handleActivityInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;
    setActivity({ ...activity, [name]: value });
  };

  //Function to handle the location change
  const handleLocationChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setLocation({ ...location, [name]: value });
  };

  //Function to handle the presenter change
  const handlePresenterChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setPresenter({ ...presenter, [name]: value });
  };

  const addPresenter = () => {
    setActivity({
      ...activity,
      presenter: [...activity.presenter, presenter],
    });
    setPresenter({
      name: '',
      imageSrc: '',
    });
  };

  return (
    <>
    <img src="" alt="" />
      <GlobalStyles />
      <EventsWrapper>
        <Timeslot
          endTime={new Date()}
          heading='Register Activity'
          startTime={new Date()}
          type={types.TimeslotType.ExternalPresentation}
        >
          <form onSubmit={handleSubmit}>
            <StyledDiv>
              <PStyled style={{color:"#D4D4D4"}}>Activity info</PStyled>
              <StyledSelect name='type' value={activity.type} onChange={handleActivityInputChange}>

              {/* Add options for the select Schema */}
                <option> Schema</option>
                <option> Säkerhet konfrens</option>
                
              </StyledSelect>
              <StyledSelect name='type' value={activity.type} onChange={handleActivityInputChange}>
                <option> Typ</option>
                {Object.keys(types.TimeslotType).map((key) => (
                  <option
                    key={key}
                    value={types.TimeslotType[key as keyof typeof types.TimeslotType]}
                  >
                    {key}
                  </option>
                ))}
              </StyledSelect>
              <StyledInput
                type='text'
                name='title'
                placeholder='Titel'
                value={activity.title}
                onChange={handleActivityInputChange}
              />
              <StyledTextArea
              style={{height: "140px"}}
                type='text'
                name='details'
                placeholder='Beskrivning'
                value={activity.details}
                onChange={handleActivityInputChange}
              />
              <StyledInput
                type='datetime-local'
                name='start'
                placeholder='Starttid'
                value={activity.start}
                onChange={handleActivityInputChange}
              />
              <StyledInput
                type='datetime-local'
                name='end'
                placeholder='Sluttid'
                value={activity.end}
                onChange={handleActivityInputChange}
              />
              <StyledLine />
              <StyledCheckboxWrapper>
              <StyledCheckbox checked={showPresenter} onChange={handlePresenterCheckboxChange}>
                Presenter
              </StyledCheckbox>
              <StyledCheckbox checked={showLocation} onChange={handleLocationCheckboxChange}>
                Location
              </StyledCheckbox>
              </StyledCheckboxWrapper>
              {showPresenter && (
                <StyledDiv>
                  <PStyled style={{ marginTop: '3%', color:"#D4D4D4" }}>Presenters</PStyled>
                  <StyledInput
                    type='text'
                    name='name'
                    placeholder='Presentatör'
                    value={presenter.name}
                    onChange={handlePresenterChange}
                  />
                  <StyledInput
                    type='text'
                    name='imageSrc'
                    placeholder='Bild'
                    value={presenter.imageSrc}
                    onChange={handlePresenterChange}
                  />
                  <StyledInput type='file' id='file' />
                  <StyledButton type='button' onClick={addPresenter}>
                    Lägg till
                  </StyledButton>
                  <StyledLine />
                </StyledDiv>
              )}
              {showLocation && (
                <StyledDiv>
                  <PStyled style={{color:"#D4D4D4"}}>Location</PStyled>
                  <StyledInput
                    type='text'
                    name='title'
                    placeholder='Titel'
                    value={location.title}
                    onChange={handleLocationChange}
                  />
                  <StyledInput
                    type='text'
                    name='coordinates'
                    placeholder='Coordinates'
                    value={location.coordinates}
                    onChange={handleLocationChange}
                  />
                </StyledDiv>
              )}
              <StyledButton type='submit'>Spara</StyledButton>
            </StyledDiv>
          </form>
        </Timeslot>
      </EventsWrapper>
    </>
  );
}
export default Activity;
