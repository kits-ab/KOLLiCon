import React, { useState, useEffect } from 'react';
import { StyledDiv } from '@/styles/RegisterActivity/StyledActivity';
import { TitleStyled } from '@/styles/RegisterActivity/StyledActivity';
import { InputStyled } from '@/styles/RegisterActivity/StyledActivity';
import { AddButton } from '@/styles/RegisterActivity/StyledActivity';
import { BoxWrapper } from '@/styles/RegisterActivity/StyledActivity';
import { PresenterBoxWrapper } from '@/styles/RegisterActivity/StyledActivity';
import { AddedPresenterList } from '@/styles/RegisterActivity/StyledActivity';
import { DeleteButton } from '@/styles/RegisterActivity/StyledActivity';

type ExtraPresenterProps = {
  externalPresenter: any;
  handleExternalPresenterChange: any;
  handleAddExternalPresenter: any;
  handleDeleteExternalPresenter: any;
  activity: any;
};

const ExternalPresenterComponent: React.FC<ExtraPresenterProps> = ({
  externalPresenter,
  handleExternalPresenterChange,
  handleAddExternalPresenter,
  handleDeleteExternalPresenter,
  activity,
}) => {
  const [inputValue, setInputValue] = useState('');
  const isInputEmpty = externalPresenter.name.trim() === '';

  useEffect(() => {
    // Disable the AddButton when the external presenter input is empty
    setInputValue(externalPresenter.name);
  }, [externalPresenter.name]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInputValue(value);
    handleExternalPresenterChange(e);
  };

  const handleAddButtonClick = () => {
    handleAddExternalPresenter();
    setInputValue('');
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
        {activity.externalPresenter
          .filter((externalPresenter: null) => externalPresenter !== null)
          .map(
            (
              externalPresenter: { name: React.ReactElement<string> | Iterable<React.ReactNode> },
              index: React.Key,
            ) => (
              <PresenterBoxWrapper key={index}>
                <AddedPresenterList>{externalPresenter.name}</AddedPresenterList>
                <DeleteButton onClick={() => handleDeleteExternalPresenter(index)}>
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
