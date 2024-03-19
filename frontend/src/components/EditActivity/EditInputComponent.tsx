import {  InputStyled, TextAreaStyled} from '@/styles/RegisterActivity/StyledActivity';
import {ErrorStyled} from '../../styles/RegisterActivity/StyledActivity';
import {RegisterActivity } from '../../types/Activities';


type InputComponentProps = {
  editActivity: RegisterActivity;
    error?: boolean | any;
    setIsTitleFilled?: boolean | any;
    setIsDetailsFilled?: boolean | any;
    setTextError?: boolean | any;
    setEditActivity?: RegisterActivity | any;
}

const EditInputComponent: React.FC<InputComponentProps> = ({
  editActivity,
  error,
  setIsTitleFilled,
  setTextError,
  setIsDetailsFilled,
  setEditActivity,
}) => {
    //Function to handle the input change for title and details
    const handleOnInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const { name, value } = e.target;
      setEditActivity({ ...editActivity, [name]: value });
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
        placeholder={editActivity.title || 'Titel'}
        value={editActivity.title}
        onChange={handleOnInputChange}
      />
      <TextAreaStyled
        name='details'
        placeholder={editActivity.details || 'Beskrivning'}
        value={editActivity.details}
        onChange={handleOnInputChange}
        maxRows={3}
      />
      {error && <ErrorStyled>Beskrivning får inte vara längre än 3000</ErrorStyled>}
    </>
  );
};

export default EditInputComponent;
