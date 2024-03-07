import React from 'react';
import { StyledDiv } from '@/styles/RegisterActivity/StyledActivity';
import { TitleStyled } from '@/styles/RegisterActivity/StyledActivity';
import { InputStyled } from '@/styles/RegisterActivity/StyledActivity';
import { AddButton } from '@/styles/RegisterActivity/StyledActivity';
import { BoxWrapper } from '@/styles/RegisterActivity/StyledActivity';
import { PresenterBoxWrapper } from '@/styles/RegisterActivity/StyledActivity';
import { AddedPresenterList } from '@/styles/RegisterActivity/StyledActivity';
import { DeleteButton } from '@/styles/RegisterActivity/StyledActivity';
import { ErrorStyled } from '@/styles/RegisterActivity/StyledActivity';

type ExtraPresenterProps = {
  externalPresenter: any;
  handleExternalPresenterChange: any;
  handleAddExternalPresenter: any;
  handleDeleteExternalPresenter: any;
  error: any;
  activity: any;
};

const ExternalPresenterComponent: React.FC<ExtraPresenterProps> = ({
  externalPresenter,
  handleExternalPresenterChange,
  handleAddExternalPresenter,
  handleDeleteExternalPresenter,
  error,
  activity,
}) => {
  return (
    <StyledDiv>
      <TitleStyled>Externa</TitleStyled>
      <InputStyled
        type='text'
        name='name'
        placeholder='Presentatör'
        value={externalPresenter.name}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleExternalPresenterChange(e)}
      />
      <InputStyled type='file' id='file' />

      <AddButton type='button' onClick={handleAddExternalPresenter}>
        Lägg till
      </AddButton>
      {error && <ErrorStyled>{error}</ErrorStyled>}

      {/* List added presenters */}
      <BoxWrapper>
        {activity.externalPresenter
          .filter((externalPresenter: null) => externalPresenter !== null)
          .map((externalPresenter: { name: React.ReactElement< string> | Iterable<React.ReactNode>; }, index: React.Key) => (
            <PresenterBoxWrapper key={index}>
              <AddedPresenterList>{externalPresenter.name}</AddedPresenterList>
              <DeleteButton onClick={() => handleDeleteExternalPresenter(index)}>
                Ta bort
              </DeleteButton>
            </PresenterBoxWrapper>
          ))}
      </BoxWrapper>
    </StyledDiv>
  );
};

export default ExternalPresenterComponent;
