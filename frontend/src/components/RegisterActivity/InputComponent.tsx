import {  InputStyled, TextAreaStyled} from '@/styles/RegisterActivity/StyledActivity';
import {ErrorStyled} from '../../styles/RegisterActivity/StyledActivity';

type InputComponentProps = {
    activity: any;
    error: any;
    setIsTitleFilled: any;
    setIsDetailsFilled: any;
    setTextError: any;
    setActivity: any;
}

const InputComponent: React.FC<InputComponentProps> = ({
  activity,
  error,
  setIsTitleFilled,
  setTextError,
  setIsDetailsFilled,
  setActivity,
}) => {
    //Function to handle the input change for title and details
    const handleOnInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const { name, value } = e.target;
      setActivity({ ...activity, [name]: value });
      if (name === 'details' && value.length > 2999) {
        setTextError(true);
        setIsDetailsFilled(!value);
      } else if (name === 'details' && value.length <= 2999) {
        setTextError(false);
        setIsDetailsFilled(!!value);
      }
      if (name === 'title') {
        setIsTitleFilled(!!value);
      }
    };
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
