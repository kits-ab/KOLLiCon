import {  InputStyled, TextAreaStyled} from '@/styles/RegisterActivity/StyledActivity';

type InputComponentProps = {
    activity: any;
    handleOnInputChange: any;
}

const InputComponent: React.FC<InputComponentProps> = ({
  activity,
  handleOnInputChange,
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
      />
    </>
  );
};

export default InputComponent;
