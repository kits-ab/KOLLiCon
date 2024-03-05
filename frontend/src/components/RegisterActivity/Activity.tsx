import { useState, useEffect } from 'react';
import { types, GlobalStyles, Timeslot } from '@kokitotsos/react-components';
import axios from 'axios';
import {
  EventsWrapper,
  StyledDiv,
  StyledLine,
  StyledLine1,
  TypeFormStyled,
  TypeSelectStyled,
  InputStyled,
  TextAreaStyled,
  DateTimePickerWrapper,
  SuggestionBoxWrapper,
  SuggestionBoxStyled,
  ListStyled,
  ErrorStyled,
  PresenterBoxWrapper,
  AddedPresenterList,
  DeleteButton,
  AddButton,
  CancelButton,
  SaveButton,
  TitleStyled,
  GlobalBox,
  BoxWrapper,
  BoxWrapper1,
  HeaderStyled,
} from '../../styles/RegisterActivity/StyledActivity';
import {
  sxDateTimePickerStyles,
  DateTimePropsStyles,
} from '@/styles/Common/DateTimePicker/StyledDateTimePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import dayjs from 'dayjs';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { SelectChangeEvent } from '@mui/material/Select';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MapBox from '../MapBox/MapBox';

type Activity = {
  schedule: number;
  userId: string;
  winner: boolean;
  type: types.TimeslotType;
  presenter: types.Person[];
  externalPresenter: types.Person[];
  location: { title: string; coordinates: string; subtitle: string };
  title: string;
  details: string;
  start: string;
  end: string;
};

const backendIP = import.meta.env.VITE_API_URL;

function Activity({ onClose }: any) {
  const [files, setFiles] = useState([]);
  const [suggestions, setSuggestions] = useState([]);
  const [showPresenter, setShowPresenter] = useState<boolean>(false);
  const [showExternalPresenter, setShowExternalPresenter] = useState<boolean>(false);
  const [showLocation, setShowLocation] = useState<boolean>(false);
  const [type, setType] = useState<types.TimeslotType | ''>('');
  const [location, setLocation] = useState({
    title: '',
    subtitle: '',
    coordinates: '',
  });

  const [error, setError] = useState('');

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
    location: { title: '', subtitle: '', coordinates: '' },
    title: '',
    details: '',
    start: '',
    end: '',
  } as unknown as Activity);

  const [isFieldsFilled, setIsFieldsFilled] = useState(false);

  useEffect(() => {
    checkFieldsFilled();
  }, [activity.details, activity.title]);

  // Function to check if all required fields are filled
  const checkFieldsFilled = () => {
    const requiredFieldsFilled =
      activity.title && activity.details && activity.start && activity.end;
    const presenterFilled = showPresenter ? presenter.name.trim() !== '' : true;
    const externalPresenterFilled = showExternalPresenter
      ? externalPresenter.name.trim() !== ''
      : true;
    const locationFilled =
      showLocation ||
      (location.title.trim() === '' && location.subtitle.trim() === '' ? true : true);

    setIsFieldsFilled(
      Boolean(requiredFieldsFilled && presenterFilled && externalPresenterFilled && locationFilled),
    );
  };

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
  //function to reset the activity state
  const resetActivity = () => {
    setActivity({
      presenter: [],
      externalPresenter: [],
      title: '',
      details: '',
      start: '',
      end: '',
    } as unknown as Activity);
    setLocation({ title: '', subtitle: '', coordinates: '' });
    setType('');
    setShowExternalPresenter(false);
    setShowPresenter(false);
    setShowLocation(false);
  };

  //Function to handle the input change for title and details
  const handleOnInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setActivity({ ...activity, [name]: value });
    checkFieldsFilled();
  };

  //Function to handle the activity input change
  const handleActivityInputChange = (e: SelectChangeEvent<types.TimeslotType>) => {
    const { name, value } = e.target;
    if (name === 'type') {
      setType(value as types.TimeslotType);
      setActivity({ ...activity, type: value as types.TimeslotType });

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
    checkFieldsFilled();
  };

  // Function to handle the location change
  const handleLocationChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    checkFieldsFilled();
    setLocation({ ...location, [name]: value });
  };

  //Function to convert the array to string and add coordinates to the location
  const handleCoordinates = (coords: number[]) => {
    setLocation((prevLocation) => ({
      ...prevLocation,
      coordinates: coords.join(','),
    }));
  };

  const handleResetLocation = () => {
    setLocation({ ...location, coordinates: '' });
  };

  const handleDateChange = (name: string, date: Date) => {
    setActivity({ ...activity, [name]: dayjs(date).format('YYYY-MM-DDTHH:mm') });
    checkFieldsFilled();
  };

  //Function to handle the presenter change
  const handlePresenterChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setError('');
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

  const handleDeletePresenter = (index: number) => {
    const updatedPresenters = [...activity.presenter];
    updatedPresenters.splice(index, 1);
    setActivity({ ...activity, presenter: updatedPresenters });
    checkFieldsFilled();
  };
  const handleDeleteExternalPresenter = (index: number) => {
    const updatedExternalPresenters = [...activity.externalPresenter];
    updatedExternalPresenters.splice(index, 1);
    setActivity({ ...activity, externalPresenter: updatedExternalPresenters });
    checkFieldsFilled();
  };

  //Function to handle the external presenter change
  const handleExternalPresenterChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;
    setExternalPresenter({ ...externalPresenter, [name]: value });
  };

  const handleSuggestionClick = (selectedTitle: string) => {
    // Update the presenter name with the selected title
    setPresenter({
      ...presenter,
      name: selectedTitle,
      avatarSrc: getProfilePictureUrl(selectedTitle),
    });
    // Clear suggestions
    setSuggestions([]);
  };

  const addPresenter = async () => {
    // Check if the profile picture exists before adding the presenter
    const profilePictureUrl = getProfilePictureUrl(presenter.name);
    const pictureExists = await profilePictureExists(profilePictureUrl);

    // Check if the title exists in the files state
    const titleExists = files.some(
      (file: { title: string }) => file.title.toLowerCase() === presenter.name.toLowerCase(),
    );

    if (!pictureExists || !titleExists) {
      // Handle case where title doesn't exist in files state or profile picture doesn't exist
      setError(`"${presenter.name}" not found`);
      return;
    }
    // Add presenter to the activity state
    const newPresenter = {
      ...presenter,
      id: '',
    };

    setActivity({
      ...activity,
      presenter: [...activity.presenter, newPresenter],
    });
    setPresenter({
      name: '',
      avatarSrc: '',
    });
    // setIsFieldsFilled(true);
    checkFieldsFilled();
  };

  //Add external presenter
  const addExternalPresenter = () => {
    const newExternalPresenter = {
      ...externalPresenter,
      id: '',
    };

    setActivity({
      ...activity,
      externalPresenter: [...activity.externalPresenter, newExternalPresenter],
    });
    setExternalPresenter({
      name: '',
      avatarSrc: '',
    });
    // setIsFieldsFilled(true);
    checkFieldsFilled();
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
        // Fetch the list of files in the medarbetare directory
        const response = await axios.get(
          `https://api.github.com/repos/kits-ab/kits/contents/content/medarbetare`,
        );
        if (response.status === 200) {
          const filesData = response.data
            .filter((item: { type: string }) => item.type === 'file')
            // Fetch the content of each file
            .map(async (item: { download_url: string }) => {
              const mdContentResponse = await axios.get(item.download_url);
              const mdContent = mdContentResponse.data;
              // Extract title and alumni attributes from the markdown content
              const titleMatch = mdContent.match(/^title: (.*)$/m);
              const alumniMatch = mdContent.match(/^alumni: (.*)$/m);
              // map the extracted values to an object
              const title = titleMatch ? titleMatch[1] : 'Untitled';
              // set alumni to false if it doesn't exist otherwhise keep the value
              const alumni = alumniMatch ? alumniMatch[1] : false;
              // return the object
              return { title, alumni };
            });

          Promise.all(filesData).then((fileTitles) => {
            // Include files where alumni is false or where the alumni attribute doesn't exist
            const filteredFiles: any = fileTitles.filter(
              (file) => !file.alumni || file.alumni === 'false',
            );
            setFiles(filteredFiles);
          });
        } else {
          console.error('Error fetching files:', response.statusText);
        }
      } catch (error: any) {
        console.error('Error fetching files:', error.message);
      }
    };

    fetchFiles();
  }, []);
  

  return (
    <>
      <GlobalBox >
        <img src='' alt='' />
        <GlobalStyles />
        <HeaderStyled>Ny aktivitiet</HeaderStyled>
        <StyledLine />
        <EventsWrapper>
            <form onSubmit={handleSubmit}>
              <StyledDiv>
                
                
                <FormControl sx={{ ...TypeFormStyled }}>
                  <InputLabel id='type-label'>Type</InputLabel>
                  <Select
                    MenuProps={{
                      PaperProps: {
                        sx: { ...TypeSelectStyled },
                      },
                    }}
                    labelId='type-label'
                    id='activity-type'
                    name='type'
                    value={type} // Use the state variable
                    onChange={handleActivityInputChange}
                    input={<OutlinedInput label='Type' />}
                  >
                    {Object.keys(types.TimeslotType).map((key) => (
                      <MenuItem
                        key={key}
                        value={types.TimeslotType[key as keyof typeof types.TimeslotType]}
                      >
                        {key}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>

                <DateTimePickerWrapper>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DateTimePicker
                      ampm={false}
                      sx={{ ...sxDateTimePickerStyles }}
                      slotProps={DateTimePropsStyles}
                      label='Starttid'
                      name='start'
                      value={activity.start || null}
                      onChange={(date: any) => handleDateChange('start', date)}
                    />

                    <DateTimePicker
                      ampm={false}
                      sx={{ ...sxDateTimePickerStyles }}
                      slotProps={DateTimePropsStyles}
                      label='Sluttid'
                      name='end'
                      value={activity.end || null}
                      onChange={(date: any) => handleDateChange('end', date)}
                    />
                  </LocalizationProvider>
                </DateTimePickerWrapper>
                <InputStyled
                  type='text'
                  name='title'
                  placeholder='Titel'
                  value={activity.title}
                  onChange={handleOnInputChange}
                />
                <TextAreaStyled
                  name='details'
                  placeholder='Beskrivning'
                  value={activity.details}
                  onChange={handleOnInputChange}
                />
                {/* <StyledLine /> */}
                {showPresenter && (
                  <StyledDiv>
                    <TitleStyled>Interna</TitleStyled>
                    <InputStyled
                      type='text'
                      name='name'
                      placeholder='Presentatör'
                      value={presenter.name}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                        handlePresenterChange(e)
                      }
                    />

                    {/* Display suggestions */}
                    {suggestions.length > 0 && (
                      <SuggestionBoxWrapper>
                        <SuggestionBoxStyled>
                          {suggestions.map((item: { title: string }, index) => (
                            <ListStyled
                              key={index}
                              onClick={() => handleSuggestionClick(item.title)}
                            >
                              {item.title}
                            </ListStyled>
                          ))}
                        </SuggestionBoxStyled>
                      </SuggestionBoxWrapper>
                    )}

                    <AddButton type='button' onClick={addPresenter}>
                      Lägg till
                    </AddButton>
                    {error && <ErrorStyled>{error}</ErrorStyled>}

                    {/* List added presenters */}
                    <BoxWrapper>
                      {activity.presenter.map((presenter, index) => (
                        <PresenterBoxWrapper key={index}>
                          <AddedPresenterList>{presenter.name}</AddedPresenterList>
                          <DeleteButton onClick={() => handleDeletePresenter(index)}>
                            Ta bort
                          </DeleteButton>
                        </PresenterBoxWrapper>
                      ))}
                    </BoxWrapper>
                    {/* <StyledLine /> */}
                  </StyledDiv>
                )}
                {showExternalPresenter && (
                  <StyledDiv>
                    <TitleStyled>Externa</TitleStyled>
                    <InputStyled
                      type='text'
                      name='name'
                      placeholder='Presentatör'
                      value={externalPresenter.name}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                        handleExternalPresenterChange(e)
                      }
                    />
                    <InputStyled type='file' id='file' />

                    <AddButton type='button' onClick={addExternalPresenter}>
                      Lägg till
                    </AddButton>

                    {/* List added presenters */}
                    <BoxWrapper>
                      {activity.externalPresenter.map((externalPresenter, index) => (
                        <PresenterBoxWrapper key={index}>
                          <AddedPresenterList>{externalPresenter.name}</AddedPresenterList>
                          <DeleteButton onClick={() => handleDeleteExternalPresenter(index)}>
                            Ta bort
                          </DeleteButton>
                        </PresenterBoxWrapper>
                      ))}
                    </BoxWrapper>

                    {/* <StyledLine /> */}
                  </StyledDiv>
                )}
                {showLocation && (
                  <StyledDiv>
                    <TitleStyled>Plats</TitleStyled>
                    <InputStyled
                      type='text'
                      name='title'
                      placeholder='Titel'
                      value={location.title}
                      onChange={handleLocationChange}
                    />
                    <InputStyled
                      type='text'
                      name='subtitle'
                      placeholder='Subtitle'
                      value={location.subtitle}
                      onChange={handleLocationChange}
                    />
                    <MapBox
                      onCoordinatesChange={handleCoordinates}
                      resetLocation={handleResetLocation}
                    />
                  </StyledDiv>
                )}
                <StyledLine1/>
                <BoxWrapper1>
                  <SaveButton type='submit' disabled={!isFieldsFilled}>
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
