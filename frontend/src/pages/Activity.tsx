import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { types, GlobalStyles, Timeslot } from '@kokitotsos/react-components';
import axios from 'axios';
import {
  EventsWrapper,
  PStyled,
  StyledButton,
  StyledDiv,
  StyledInput,
  StyledSelect,
  StyledLine,
  StyledTextArea,
} from '../styles/StyledActivity';
import Button from '@/components/Button';

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
  const [showPresenter, setShowPresenter] = useState<boolean>(false);
  const [showLocation, setShowLocation] = useState<boolean>(false);
  const [location, setLocation] = useState({
    title: '',
    coordinates: '',
  });

  const [presenter, setPresenter] = useState({
    name: '',
    avatarSrc: '',
  });

  const [externalPresenter, setExternalPresenter] = useState({
    name: '',
    avatarSrc: '',
  });

  const [activity, setActivity] = useState<Activity>({
    schedule: 1,
    userId: '',
    winner: false,
    type: undefined,
    presenter: [],
    externalPresenter: [],
    location: { title: '', coordinates: '' },
    title: '',
    details: '',
    start: '',
    end: '',
  } as unknown as Activity);

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

    if (value === types.TimeslotType.Presentation) {
      setShowPresenter(true);
      setShowLocation(false);
    } else if (value === types.TimeslotType.ExternalPresentation) {
      setShowPresenter(true);
      setShowLocation(true);
    } else {
      setShowPresenter(false);
      setShowLocation(true);
    }
  };

  //Function to handle the location change
  const handleLocationChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setLocation({ ...location, [name]: value });
  };

  //Function to handle the presenter change
  const handlePresenterChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setPresenter({ ...presenter, [name]: value, avatarSrc: getProfilePictureUrl(value) });
  };

  //Function to handle the external presenter change
  const handleExternalPresenterChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;
    setExternalPresenter({ ...externalPresenter, [name]: value });
  };

  const addPresenter = () => {
    setActivity({
      ...activity,
      presenter: [...activity.presenter, presenter],
    });
    setPresenter({
      name: '',
      avatarSrc: '',
    });
  };

  const addExternalPresenter = () => {
    setActivity({
      ...activity,
      externalPresenter: [...activity.externalPresenter, externalPresenter],
    });
    setExternalPresenter({
      name: '',
      avatarSrc: '',
    });
  };

  function getProfilePictureUrl(name: string) {
    return `https://raw.githubusercontent.com/kits-ab/kits/master/static/assets/medarbetare_${replaceSpecialCharacters(name)}-avatar.jpg`;
  }
  function replaceSpecialCharacters(url: string) {
    let normalized = url.normalize('NFD');
    let withoutDiacritics = normalized.replace(/[\u0300-\u036f]/g, '');
    return withoutDiacritics.replace(/[\s-]/g, '').toLowerCase();
  }

  return (
    <>
      <div style={{ width: '100%', height: '100%' }}>
        <img src='' alt='' />
        <GlobalStyles />
        <EventsWrapper style={{paddingBottom:'10%'}}>
          <Timeslot
            endTime={new Date()}
            heading='Registrera Activitiet'
            startTime={new Date()}
            type={types.TimeslotType.ExternalPresentation}
          >
            <form onSubmit={handleSubmit}>
              <StyledDiv>
                <PStyled style={{ color: '#D4D4D4' }}>Activitiet info</PStyled>
                <StyledSelect
                  name='type'
                  value={activity.type}
                  onChange={handleActivityInputChange}
                >
                  {/* Add options for the select Schema */}
                  <option> Schema</option>
                  <option> Säkerhet konfrens</option>
                </StyledSelect>
                <StyledSelect
                  name='type'
                  value={activity.type}
                  onChange={handleActivityInputChange}
                >
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

                <div style={{display:'flex', flexDirection: 'row', justifyContent:'space-around'}}>
                <StyledInput style={{width:'40%', marginRight:'-1%'}}
                  type='datetime-local'
                  name='start'
                  placeholder='Starttid'
                  value={activity.start}
                  onChange={handleActivityInputChange}
                />
                <StyledInput style={{width:'40%'}}
                  type='datetime-local'
                  name='end'
                  placeholder='Sluttid'
                  value={activity.end}
                  onChange={handleActivityInputChange}
                />

                </div>
                <StyledInput
                  type='text'
                  name='title'
                  placeholder='Titel'
                  value={activity.title}
                  onChange={handleActivityInputChange}
                />
                <StyledTextArea
                  style={{ height: '140px' }}
                  type='text'
                  name='details'
                  placeholder='Beskrivning'
                  value={activity.details}
                  onChange={handleActivityInputChange}
                />

                <StyledLine />
                {showPresenter && (
                  <StyledDiv>
                    <PStyled style={{ color: '#D4D4D4' }}>Interna</PStyled>
                    <StyledInput
                      type='text'
                      name='name'
                      placeholder='Presentatör'
                      value={presenter.name}
                      onChange={handlePresenterChange}
                    />

                    <StyledButton type='button' onClick={addPresenter}>
                      Lägg till
                    </StyledButton>
                    <StyledLine />
                    <PStyled style={{ color: '#D4D4D4' }}>Externa</PStyled>
                    <StyledInput
                      type='text'
                      name='name'
                      placeholder='Presentatör'
                      value={externalPresenter.name}
                      onChange={handleExternalPresenterChange}
                    />
                    {/* <StyledInput
                      type='text'
                      name='avatarSrc'
                      placeholder='Bild'
                      value={externalPresenter.avatarSrc}
                      onChange={handleExternalPresenterChange}
                    /> */}
                    <StyledInput type='file' id='file' />

                    <StyledButton type='button' onClick={addExternalPresenter}>
                      Lägg till
                    </StyledButton>
                    <StyledLine />
                  </StyledDiv>
                )}
                {showLocation && (
                  <StyledDiv>
                    <PStyled style={{ color: '#D4D4D4' }}>Location</PStyled>
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

                <div style={{ display: 'flex', flexDirection: 'row', marginTop: '10%' }}>
                  <Button
                    style={{
                      width: '20%',
                      position: 'relative',
                      left: '80%',
                      marginRight: '-15px',
                      height: '30px',
                    }}
                    type='submit'
                  >
                    Spara
                  </Button>
                  <Button
                    style={{
                      width: '20%',
                      position: 'relative',
                      left: '40%',
                      height: '30px',
                      border: '1px solid gray',
                      backgroundColor: 'transparent',
                    }}
                    type='submit'
                  >
                    Avbryt
                  </Button>
                </div>
              </StyledDiv>
            </form>
          </Timeslot>
        </EventsWrapper>
      </div>
    </>
  );
}
export default Activity;
