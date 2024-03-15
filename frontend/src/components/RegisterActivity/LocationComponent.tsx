import React from 'react';
import { StyledDiv } from '@/styles/RegisterActivity/StyledActivity';
import { TitleStyled } from '@/styles/RegisterActivity/StyledActivity';
import { InputStyled } from '@/styles/RegisterActivity/StyledActivity';
import MapBox from '../MapBox/MapBox';

type LocationProps = {
    location: any;
    handleLocationChange: any;
    setLocation: any;
    };

const LocationComponent: React.FC<LocationProps> = ({
  location,
  handleLocationChange,
  setLocation
}) => {

  //Function to convert the array to string and add coordinates to the location
  const handleCoordinates = (coords: number[]) => {
    setLocation((prevLocation: any) => ({
      ...prevLocation,
      coordinates: coords.join(','),
    }));
  };

  //function to reset the location data
  const handleResetLocation = () => {
    setLocation({ ...location, coordinates: '' });
  };

  return (
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
  );
};

export default LocationComponent;
