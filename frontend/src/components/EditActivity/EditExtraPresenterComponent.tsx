import React, { useState, useEffect } from 'react';
import { ErrorStyled, StyledDiv } from '@/styles/RegisterActivity/StyledActivity';
import { TitleStyled } from '@/styles/RegisterActivity/StyledActivity';
import { InputStyled } from '@/styles/RegisterActivity/StyledActivity';
import { AddButton } from '@/styles/RegisterActivity/StyledActivity';
import { BoxWrapper } from '@/styles/RegisterActivity/StyledActivity';
import { PresenterBoxWrapper } from '@/styles/RegisterActivity/StyledActivity';
import { AddedPresenterList } from '@/styles/RegisterActivity/StyledActivity';
import { DeleteButton } from '@/styles/RegisterActivity/StyledActivity';
import { RegisterActivity, RegisterPerson} from '@/types/Activities';
import axios from 'axios';

type ExtraPresenterProps = {
  externalPresenter: { name: string; avatarSrc: string };
  handleExternalPresenterChange:  (e: React.ChangeEvent<HTMLInputElement>) => void;
  editActivity:   RegisterActivity;
  setEditActivity:  React.Dispatch<React.SetStateAction<RegisterActivity>>;
  setIsExternalPresenterFilled:   React.Dispatch<React.SetStateAction<boolean>>;
  addExternalPresenter:  () => void;
  setExternalPresenter:   React.Dispatch<React.SetStateAction<{name: string; avatarSrc:string}>>;
};

const backendIP = import.meta.env.VITE_API_URL;

const EditExternalPresenterComponent: React.FC<ExtraPresenterProps> = ({
  externalPresenter,
  handleExternalPresenterChange,
  setIsExternalPresenterFilled,
  setEditActivity,
  editActivity,
  addExternalPresenter,
  setExternalPresenter,
}) => {
  const [inputValue, setInputValue] = useState('');
  const isInputEmpty = externalPresenter.name.trim() === '';
  const [error, setError] = useState('');

  // Function to clear error after 10 seconds
  const clearError = () => {
    setTimeout(() => {
      setError('');
    }, 5000);
  };

  useEffect(() => {
    // Disable the AddButton when the external presenter input is empty
    setInputValue(externalPresenter.name);
  }, [externalPresenter.name]);
  //Function to handle the input change
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInputValue(value);
    handleExternalPresenterChange(e);
    setError('');
  };
  //Function to handle the add button click
  const handleAddButtonClick = () => {
    handleAddExternalPresenter();
    setInputValue('');
  };

  //Function to handle the external presenter change
  const handleAddExternalPresenter = () => {
    // Add external presenter to the activity state
    const newExternalPresenter = addExternalPresenter() as unknown as RegisterPerson;
    setEditActivity({
      ...editActivity,
      externalPresenter: [...editActivity.externalPresenter, newExternalPresenter],
    });
    // Check if the external presenter is filled
    setIsExternalPresenterFilled(
      externalPresenter.name !== '' || editActivity.externalPresenter.length > 0,
    );
    setExternalPresenter({
      name: '',
      avatarSrc: '',
    });
  };

  //Function to delete the external presenter
  const handleDeleteExternalPresenter = async (index: number) => {
    const updatedExternalPresenters = [...editActivity.externalPresenter];
    const deletedExtraPresenter = updatedExternalPresenters[index];

    // Check if there's only one presenter left, if so, show error and return
    if (updatedExternalPresenters.length === 1) {
      setError('Du kan inte ta bort den sista externa presentatören.');
      clearError();
      return;
    } else if (deletedExtraPresenter.id && updatedExternalPresenters.length > 1) {
      // Trigger endpoint to delete presenter from the database using Axios
      try {
        await axios.delete(
          `${backendIP}/api/external-presenter/delete/${deletedExtraPresenter.id}`,
        );
      } catch (error) {
        console.error('Error deleting external presenter:', error);
      }
    }

    updatedExternalPresenters.splice(index, 1);
    setEditActivity({ ...editActivity, externalPresenter: updatedExternalPresenters });
    setIsExternalPresenterFilled(updatedExternalPresenters.length > 0);
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

      <AddButton onClick={handleAddButtonClick} disabled={isInputEmpty}>
        Lägg till
      </AddButton>

      {/* List added presenters */}
      <BoxWrapper>
        {editActivity.externalPresenter &&
          editActivity.externalPresenter
            .filter((externalPresenter: RegisterPerson| null) => externalPresenter !== null)
            .map(
              (
                externalPresenter: { name: React.ReactElement<string> | Iterable<React.ReactNode> },
                index: React.Key,
              ) => (
                <PresenterBoxWrapper key={index}>
                  <AddedPresenterList>{externalPresenter?.name}</AddedPresenterList>
                  <DeleteButton onClick={() => handleDeleteExternalPresenter(Number(index))}>
                    Ta bort
                  </DeleteButton>
                </PresenterBoxWrapper>
              ),
            )}
      </BoxWrapper>
      {error && <ErrorStyled style={{ marginBottom: '-5px' }}>{error}</ErrorStyled>}
    </StyledDiv>
  );
};

export default EditExternalPresenterComponent;
