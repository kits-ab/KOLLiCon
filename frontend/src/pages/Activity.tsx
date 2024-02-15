import { useState, useEffect } from 'react';
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
  externalPresenter: types.Person[];
  location: { title: string; coordinates: string };
  title: string;
  details: string;
  start: string;
  end: string;
};

function Activity({ onClose }: any) {
  const navigate = useNavigate();
  const [files, setFiles] = useState([]);
  const [suggestions, setSuggestions] = useState([]);
  const [showPresenter, setShowPresenter] = useState<boolean>(false);
  const [showExternalPresenter, setShowExternalPresenter] = useState<boolean>(false);
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
  //Function to close the modal
  const handleCancelButtonClick = () => {
    onClose();
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
    if (value) {
      const filteredTitles = files.filter((file: { title: string }) =>
        file.title.toLowerCase().startsWith(value.toLowerCase()),
      );
      // Update suggestions state with filtered titles
      setSuggestions(filteredTitles);
      setPresenter({ ...presenter, [name]: value, avatarSrc: getProfilePictureUrl(value) });
    } else {
      // Clear suggestions if the input is empty
      setSuggestions([]);
    }
  };

  //Function to handle the external presenter change
  const handleExternalPresenterChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;
    setExternalPresenter({ ...externalPresenter, [name]: value });
  };

  const handleSuggestionClick = (selectedTitle: string) => {
    console.log('this is selected title',typeof(selectedTitle));
    // Update the presenter name with the selected title
    setPresenter({ ...presenter, name: selectedTitle, avatarSrc: getProfilePictureUrl(selectedTitle) });
    // Clear suggestions
    setSuggestions([]);
  };

  const addPresenter = async () => {
    // Check if the profile picture exists before adding the presenter
    const profilePictureUrl = getProfilePictureUrl(presenter.name);
    const pictureExists = await profilePictureExists(profilePictureUrl);

    if (!pictureExists) {
      // Handle case where profile picture doesn't exist
      console.log(`Profile picture for ${presenter.name} does not exist or is not accessible.`);
      // You can display an error message or take appropriate action
      return;
    }

    // Add presenter to the activity state
    setActivity({
      ...activity,
      presenter: [...activity.presenter, presenter],
    });
    setPresenter({
      name: '',
      avatarSrc: '',
    });
  };
//Add external presenter
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
//Checks if the profile picture exists in the response
  async function profilePictureExists(url: string) {
    try {
      const response = await fetch(url, { method: 'HEAD' });
      if (response.ok) {
        // Check if the Content-Type header indicates an image
        const contentType = response.headers.get('Content-Type');
        if (contentType && contentType.startsWith('image')) {
          return true;
        }
      }
      return false;
    } catch (error) {
      console.error('Error checking profile picture existence:', error);
      return false;
    }
  }
//Function to get the employees's profile picture via url
  function getProfilePictureUrl(name: string) {
    console.log(name)
    return `https://raw.githubusercontent.com/kits-ab/kits/master/static/assets/medarbetare_${replaceSpecialCharacters(name)}-avatar.jpg`;
  }
  function replaceSpecialCharacters(url: string) {
    let normalized = url.normalize('NFD');
    let withoutDiacritics = normalized.replace(/[\u0300-\u036f]/g, '');
    return withoutDiacritics.replace(/[\s-]/g, '').toLowerCase();
  }

  //Function to get all employees's title
  useEffect(() => {
    const fetchFiles = async () => {
      try {
        const response = await axios.get(
          `https://api.github.com/repos/kits-ab/kits/contents/content/medarbetare`,
        );
        if (response.status === 200) {
          const filesData = response.data
            .filter((item: { type: string }) => item.type === 'file')
            .map(async (item: { download_url: string }) => {
              const mdContentResponse = await axios.get(item.download_url);
              const mdContent = mdContentResponse.data;
              const titleMatch = mdContent.match(/^title: (.*)$/m);
              const title = titleMatch ? titleMatch[1] : 'Untitled';
              return { title };
            });

          Promise.all(filesData).then((fileTitles) => {
            setFiles(fileTitles);
            console.log(fileTitles);
          });
        } else {
          console.error('Error fetching files:', response.statusText);
        }
      } catch (error) {
        console.error('Error fetching files:', error.message);
      }
    };

    fetchFiles();
  }, []);

  return (
    <>
      <div style={{ width: '100%', height: '100%' }}>
        <img src='' alt='' />
        <GlobalStyles />
        <EventsWrapper style={{ paddingBottom: '10%' }}>
          <Timeslot
            endTime={new Date()}
            heading='Registrera Activitiet'
            startTime={new Date()}
            type={types.TimeslotType.Presentation}
          >
            <form onSubmit={handleSubmit}>
              <StyledDiv>
                <PStyled style={{ color: '#D4D4D4' }}>Activitiet info</PStyled>
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
                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'space-around',
                    position: 'relative',
                  }}
                >
                  <label htmlFor=''>sluttid</label>
                  <label htmlFor=''>starttid</label>
                </div>
                <div
                  style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-around' }}
                >
                  <StyledInput
                    style={{ width: '40%', marginRight: '-1%', height: '30px' }}
                    type='datetime-local'
                    name='start'
                    placeholder='Starttid'
                    value={activity.start}
                    onChange={handleActivityInputChange}
                  />

                  <StyledInput
                    style={{ width: '40%', height: '30px', fontSize: '' }}
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

                    {/* Display suggestions */}
                    {suggestions.length > 0 && (
                      <div style={{display:'flex', justifyContent:'start', textAlign:'start'}}>
                        <li style={{ marginLeft:'6%', width:'88%', listStyle:'none'}}>
                          {suggestions.map((item: { title: string }, index) => (
                            <li style={{ color: '#cccccc', backgroundColor:'#424241', border:'1px solid gray', borderRadius:'5px', margin:'4px'}} key={index} onClick={() => handleSuggestionClick(item.title)}>
                              {item.title}
                            </li>
                          ))}
                        </li>
                      </div>
                    )}

                    <StyledButton type='button' onClick={addPresenter}>
                      Lägg till
                    </StyledButton>
                    <StyledLine />
                    </StyledDiv>
                    )}
                    {showExternalPresenter && (
                    <StyledDiv>
                    <PStyled style={{ color: '#D4D4D4' }}>Externa</PStyled>
                    <StyledInput
                      type='text'
                      name='name'
                      placeholder='Presentatör'
                      value={externalPresenter.name}
                      onChange={handleExternalPresenterChange}
                    />
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
                    onClick={handleCancelButtonClick}
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
