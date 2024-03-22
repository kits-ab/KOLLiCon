import React, { useState, useEffect } from 'react';
import { StyledDiv } from '@/styles/RegisterActivity/StyledActivity';
import { TitleStyled } from '@/styles/RegisterActivity/StyledActivity';
import { InputStyled } from '@/styles/RegisterActivity/StyledActivity';
import { SuggestionBoxWrapper } from '@/styles/RegisterActivity/StyledActivity';
import { SuggestionBoxStyled } from '@/styles/RegisterActivity/StyledActivity';
import { ListStyled } from '@/styles/RegisterActivity/StyledActivity';
import { AddButton } from '@/styles/RegisterActivity/StyledActivity';
import { ErrorStyled } from '@/styles/RegisterActivity/StyledActivity';
import { BoxWrapper } from '@/styles/RegisterActivity/StyledActivity';
import { PresenterBoxWrapper } from '@/styles/RegisterActivity/StyledActivity';
import { AddedPresenterList } from '@/styles/RegisterActivity/StyledActivity';
import { DeleteButton } from '@/styles/RegisterActivity/StyledActivity';
import axios from 'axios';
import { RegisterActivity } from '@/types/Activities';

const backendIP = import.meta.env.VITE_API_URL;

type PresenterProps = {
  presenter: { name: string; avatarSrc: string };
  suggestions:  { title: string }[];
  presenterError: string;
  handlePresenterChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSuggestionClick: (title: string) => void;
  editActivity: RegisterActivity;
  setEditActivity: React.Dispatch<React.SetStateAction<RegisterActivity>>;
  addPresenter: () => Promise<RegisterActivity['presenter'][number] | undefined>;
  setIsPresenterFilled: React.Dispatch<React.SetStateAction<boolean>>;
  setPresenter: React.Dispatch<React.SetStateAction<{ name: string; avatarSrc: string }>>;
};

const EditPresenterComponent: React.FC<PresenterProps> = ({
  presenter,
  suggestions,
  presenterError,
  handlePresenterChange,
  handleSuggestionClick,
  editActivity,
  setEditActivity,
  addPresenter,
  setIsPresenterFilled,
  setPresenter,
}) => {
  const [inputValue, setInputValue] = useState('');
  const isInputEmpty = presenter.name.trim() === '';
  const [error, setError] = useState('');

  // Function to clear error after 10 seconds
  const clearError = () => {
    setTimeout(() => {
      setError('');
    }, 5000);
  };

  useEffect(() => {
    // Disable the AddButton when the presenter input is empty
    setInputValue(presenter.name);
  }, [presenter.name]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInputValue(value);
    handlePresenterChange(e);
    setError('');
  };

  const handleAddPresenter = async () => {
    // Add presenter to the activity state
    const newPresenter = await addPresenter();
    if (newPresenter) {
      setEditActivity({
        ...editActivity,
        presenter: [...editActivity.presenter, newPresenter],
      });
      // Check if the presenter is filled
      setIsPresenterFilled(newPresenter.name !== '');
      setPresenter({
        name: '',
        avatarSrc: '',
      });
    }
  };

  // Function to delete a presenter from the activity state and from database if presenter has id.
  const handleDeletePresenter = async (index: number) => {
    const updatedPresenters = [...editActivity.presenter];
    const deletedPresenter = updatedPresenters[index];

    // Check if there's only one presenter left, if so, show error and return
    if (updatedPresenters.length === 1) {
      setError('Du kan inte ta bort den sista presentatören.');
      clearError();
      return;
    } else if (updatedPresenters.length > 1 && deletedPresenter.id) {
      // Trigger endpoint to delete presenter from the database using Axios
      try {
        await axios.delete(`${backendIP}/api/presenter/delete/${deletedPresenter.id}`);
      } catch (error) {
        console.error('Error deleting presenter:', error);
      }
    }
    // Remove presenter from the activity state
    updatedPresenters.splice(index, 1);
    setEditActivity({ ...editActivity, presenter: updatedPresenters });
    setIsPresenterFilled(updatedPresenters.length > 0);
  };

  return (
    <>
      <StyledDiv>
        <TitleStyled>Interna</TitleStyled>
        <InputStyled
          type='text'
          name='name'
          placeholder='Presentatör'
          value={inputValue}
          onChange={handleInputChange}
        />

        {/* Display suggestions */}
        {suggestions.length > 0 && (
          <SuggestionBoxWrapper>
            <SuggestionBoxStyled>
              {suggestions.map((item: { title: string }, index: React.Key | null | undefined) => (
                <ListStyled key={index} onClick={() => handleSuggestionClick(item.title)}>
                  {item.title}
                </ListStyled>
              ))}
            </SuggestionBoxStyled>
          </SuggestionBoxWrapper>
        )}

        <AddButton type='button' onClick={handleAddPresenter} disabled={isInputEmpty}>
          Lägg till
        </AddButton>
        {presenterError && <ErrorStyled>{presenterError}</ErrorStyled>}

        {/* List added presenters */}
        <BoxWrapper>
          {editActivity?.presenter?.map(
            (
              presenter: { name: React.ReactElement<string> | Iterable<React.ReactNode> },
              index: React.Key,
            ) => (
              <PresenterBoxWrapper key={index}>
                <AddedPresenterList>{presenter?.name}</AddedPresenterList>
                <DeleteButton onClick={() => handleDeletePresenter(index as number)}>
                  Ta bort
                </DeleteButton>
              </PresenterBoxWrapper>
            ),
          )}
        </BoxWrapper>
        {error && <ErrorStyled style={{ marginBottom: '-5px' }}>{error}</ErrorStyled>}
      </StyledDiv>
    </>
  );
};

export default EditPresenterComponent;
