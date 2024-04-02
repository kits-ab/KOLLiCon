import React, { useState, useEffect } from 'react';
import { StyledDiv } from '@/styles/RegisterActivity/StyledActivity';
import { TitleStyled } from '@/styles/RegisterActivity/StyledActivity';
import { InputStyled } from '@/styles/RegisterActivity/StyledActivity';
import { AddButton } from '@/styles/RegisterActivity/StyledActivity';
import { BoxWrapper } from '@/styles/RegisterActivity/StyledActivity';
import { PresenterBoxWrapper } from '@/styles/RegisterActivity/StyledActivity';
import { AddedPresenterList } from '@/styles/RegisterActivity/StyledActivity';
import { DeleteButton } from '@/styles/RegisterActivity/StyledActivity';
import { RegisterActivity, RegisterPerson } from '@/types/Activities';
import Box from '@mui/material/Box';

type ExtraPresenterProps = {
  externalPresenter: RegisterPerson;
  handleExternalPresenterChange:  (e: React.ChangeEvent<HTMLInputElement>) => void;
  activity: RegisterActivity;
  setActivity:  React.Dispatch<React.SetStateAction<RegisterActivity>>;
  setIsExternalPresenterFilled:   React.Dispatch<React.SetStateAction<boolean>>;
  addExternalPresenter:   () => void;
  setExternalPresenter: React.Dispatch<React.SetStateAction<RegisterPerson>>;
};

const ExternalPresenterComponent: React.FC<ExtraPresenterProps> = ({
  externalPresenter,
  handleExternalPresenterChange,
  setIsExternalPresenterFilled,
  setActivity,
  activity,
  addExternalPresenter,
  setExternalPresenter,
}) => {
  const [inputValue, setInputValue] = useState('');
  const isInputEmpty = externalPresenter.name.trim() === '';

  useEffect(() => {
    // Disable the AddButton when the external presenter input is empty
    setInputValue(externalPresenter.name);
  }, [externalPresenter.name]);
  //Function to handle the input change
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInputValue(value);
    handleExternalPresenterChange(e);
  };
  //Function to handle the add button click
  const handleAddButtonClick = () => {
    handleAddExternalPresenter();
    setInputValue('');
  };

  //Function to delete the external presenter
  const handleDeleteExternalPresenter = (index: number) => {
    const updatedExternalPresenters = [...activity.externalPresenter];
    updatedExternalPresenters.splice(index, 1);
    setActivity({ ...activity, externalPresenter: updatedExternalPresenters });
    setIsExternalPresenterFilled(updatedExternalPresenters.length > 0);
  };

  //Function to handle the external presenter change
  const handleAddExternalPresenter = () => {
    // Add external presenter to the activity state
    const newExternalPresenter = addExternalPresenter() as unknown as RegisterPerson;
    setActivity({
      ...activity,
      externalPresenter: [...activity.externalPresenter, newExternalPresenter],
    });
    // Check if the external presenter is filled
    setIsExternalPresenterFilled(
      externalPresenter.name !== '' || activity.externalPresenter.length > 0,
    );
    setExternalPresenter({
      name: '',
      avatarSrc: '',
    });
  };

  return (
    <StyledDiv>
      <TitleStyled>Externa</TitleStyled>
      <InputStyled
        type='text'
        name='name'
        placeholder='Presentatör'
        value={inputValue}
        onChange={handleInputChange}
      />
      <InputStyled type='file' id='file' />
      <Box sx={{display:'flex', justifyContent:'center'}}>
      <AddButton onClick={handleAddButtonClick} disabled={isInputEmpty}>
        Lägg till
      </AddButton>
      </Box>
      {/* List added presenters */}
      <BoxWrapper>
        {activity.externalPresenter
          .filter((externalPresenter: RegisterPerson| null) => externalPresenter !== null)
          .map(
            (
              externalPresenter: { name: React.ReactElement<string> | Iterable<React.ReactNode> },
              index: React.Key,
            ) => (
              <PresenterBoxWrapper key={index}>
                <AddedPresenterList>{externalPresenter.name}</AddedPresenterList>
                <DeleteButton onClick={() => handleDeleteExternalPresenter(Number(index))}>
                  Ta bort
                </DeleteButton>
              </PresenterBoxWrapper>
            ),
          )}
      </BoxWrapper>
    </StyledDiv>
  );
};

export default ExternalPresenterComponent;
