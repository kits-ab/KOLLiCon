import React from 'react';
import { StyledDiv } from '@/styles/RegisterActivity/StyledActivity';
import { TitleStyled } from '@/styles/RegisterActivity/StyledActivity';
import { InputStyled } from '@/styles/RegisterActivity/StyledActivity';
import MapBox from '../MapBox/MapBox';
import { RegisterActivity } from '@/types/Activities';

type LocationProps = {
  StoredCoords: number[];
  setEditActivity: any;
  editActivity: RegisterActivity;
};

const EditLocationComponent: React.FC<LocationProps> = ({
  StoredCoords,
  setEditActivity,
  editActivity,
}) => {
  //Function to convert the array to string and add coordinates to the location
  const handleCoordinates = (coords: number[]) => {
    // Update only the coordinates property of the location object
    setEditActivity((prevActivity: { location: any; }) => ({
      ...prevActivity,
      location: {
        ...prevActivity.location,
        coordinates: coords.join(','), // Convert coordinates array to string
      }
    }));
  };

    const handleLocationChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        // Update the activity object with the new title or subtitle
        setEditActivity({ ...editActivity, location: { ...editActivity.location, [name]: value } });
      };

  //function to reset the location data
    const handleResetLocation = () => {
      setEditActivity({ ...editActivity, location: { ...editActivity.location, coordinates: StoredCoords } });
    };

  return (
    <StyledDiv>
      <TitleStyled>Plats</TitleStyled>
      <InputStyled
        type='text'
        name='title'
        placeholder='Title'
        value={editActivity?.location?.title}
        onChange={handleLocationChange}
      />
      <InputStyled
        type='text'
        name='subtitle'
        placeholder='Subtitle'
        value={editActivity?.location?.subtitle}
        onChange={handleLocationChange}
      />
      <MapBox
        onCoordinatesChange={handleCoordinates}
        resetLocation={handleResetLocation}
        storedCoords={StoredCoords}
      />
    </StyledDiv>
  );
};

export default EditLocationComponent;
