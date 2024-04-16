import { useFormField } from '@/utils/Hooks/RegisterActivity/useAllFieldsFilled';
import {types} from '@kokitotsos/react-components'
import { SelectChangeEvent } from '@mui/material/Select';

export const useActivityState = () => {
    const [isStartFilled, setIsStartFilled] = useFormField(true);
    const [isEndFilled, setIsEndFilled] = useFormField(true);
    const [isTitleFilled, setIsTitleFilled] = useFormField(true);
    const [isDetailsFilled, setIsDetailsFilled] = useFormField(true);
    const [isPresenterFilled, setIsPresenterFilled] = useFormField(true);
    const [isExternalPresenterFilled, setIsExternalPresenterFilled] = useFormField(true);
    const [showPresenter, setShowPresenter] = useFormField(false);
    const [showLocation, setShowLocation] = useFormField(false);
    const [showExternalPresenter, setShowExternalPresenter] = useFormField(false);
    const [openApproveModal, setOpenApproveModal] = useFormField(false);
  
    const isAllFieldsFilled = isStartFilled && isEndFilled && isTitleFilled && isPresenterFilled && isExternalPresenterFilled;
  
    return {
      isStartFilled,
      setIsStartFilled,
      isEndFilled,
      setIsEndFilled,
      isTitleFilled,
      setIsTitleFilled,
      isDetailsFilled,
      setIsDetailsFilled,
      isPresenterFilled,
      setIsPresenterFilled,
      isExternalPresenterFilled,
      setIsExternalPresenterFilled,
      showPresenter,
      setShowPresenter,
      showLocation,
      setShowLocation,
      showExternalPresenter,
      setShowExternalPresenter,
      openApproveModal,
      setOpenApproveModal,
      isAllFieldsFilled,
    };
  };
  
  export const handleActivityInputChange = (
    e: SelectChangeEvent<types.TimeslotType>,
    setEditActivity: Function,
    setShowPresenter: Function,
    setShowLocation: Function,
    setShowExternalPresenter: Function,
    editActivity: any
  ) => {
    const { name, value } = e.target;
    if (name === 'type' && value) {
      setEditActivity({ ...editActivity, type: value as types.TimeslotType });
  
      if (value === types.TimeslotType.Presentation) {
        setShowPresenter(true);
        setShowLocation(false);
        setShowExternalPresenter(false);
      } else if (
        value === types.TimeslotType.Airplane ||
        value === types.TimeslotType.Boat ||
        value === types.TimeslotType.Bus ||
        value === types.TimeslotType.CheckIn ||
        value === types.TimeslotType.Coffee ||
        value === types.TimeslotType.Drink ||
        value === types.TimeslotType.Food ||
        value === types.TimeslotType.Hotel ||
        value === types.TimeslotType.Running ||
        value === types.TimeslotType.Skiing ||
        value === types.TimeslotType.Train ||
        value === types.TimeslotType.Workshop ||
        value === types.TimeslotType.Location
      ) {
        setShowPresenter(false);
        setShowExternalPresenter(false);
        setShowLocation(true);
      } else if (value === types.TimeslotType.ExternalPresentation) {
        setShowPresenter(false);
        setShowExternalPresenter(true);
        setShowLocation(false);
      }
    }
  };