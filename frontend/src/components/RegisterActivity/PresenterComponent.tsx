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

type PresenterProps = {
  presenter: any;
  suggestions: any;
  presenterError: any;
  handlePresenterChange: any;
  handleSuggestionClick: any;
  handleAddPresenter: any;
  handleDeletePresenter: any;
  activity: any;
};

const PresenterComponent: React.FC<PresenterProps> = ({
  presenter,
  suggestions,
  presenterError,
  handlePresenterChange,
  handleSuggestionClick,
  handleAddPresenter,
  handleDeletePresenter,
  activity,
}) => {

  const [inputValue, setInputValue] = useState('');
  const isInputEmpty = presenter.name.trim() === '';

  useEffect(() => {
    // Disable the AddButton when the presenter input is empty
    setInputValue(presenter.name);
  }, [presenter.name]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInputValue(value);
    handlePresenterChange(e);
  };

  const handleAddButtonClick = () => {
    handleAddPresenter();
    setInputValue('');
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

        <AddButton type='button' onClick={handleAddButtonClick} disabled={isInputEmpty}>
          Lägg till
        </AddButton>
        {presenterError && <ErrorStyled>{presenterError}</ErrorStyled>}

        {/* List added presenters */}
        <BoxWrapper>
          {activity.presenter.map((presenter: { name: React.ReactElement< string> | Iterable<React.ReactNode>; }, index: React.Key) => (
            <PresenterBoxWrapper key={index}>
              <AddedPresenterList>{presenter.name}</AddedPresenterList>
              <DeleteButton onClick={() => handleDeletePresenter(index)}>Ta bort</DeleteButton>
            </PresenterBoxWrapper>
          ))}
        </BoxWrapper>
      </StyledDiv>
    </>
  );
};

export default PresenterComponent;
