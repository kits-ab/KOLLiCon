import {  InputStyled, TextAreaStyled} from '@/styles/RegisterActivity/StyledActivity';
import {ErrorStyled} from '../../styles/RegisterActivity/StyledActivity';

type InputComponentProps = {
    activity: any;
    handleOnInputChange: any;
    error: any
}

const InputComponent: React.FC<InputComponentProps> = ({
  activity,
  handleOnInputChange,
  error
}) => {
  return (
    <>
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
        maxRows={3}
      />
      {error && <ErrorStyled>Beskrivning får inte vara längre än 3000</ErrorStyled>}
    </>
  );
};

export default InputComponent;
