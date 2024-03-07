import React from 'react';
import { StyledDiv } from '@/styles/RegisterActivity/StyledActivity';
import { TitleStyled } from '@/styles/RegisterActivity/StyledActivity';
import { InputStyled } from '@/styles/RegisterActivity/StyledActivity';
import MapBox from '../MapBox/MapBox';

type LocationProps = {
    location: any;
    handleLocationChange: any;
    handleCoordinates: any;
    handleResetLocation: any;
    };

const LocationComponent: React.FC<LocationProps> = ({
  location,
  handleLocationChange,
  handleCoordinates,
  handleResetLocation,
}) => {
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
