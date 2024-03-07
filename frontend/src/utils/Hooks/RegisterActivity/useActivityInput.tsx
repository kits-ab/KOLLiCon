import { useState } from 'react';
import { SelectChangeEvent } from '@mui/material/Select';
import {types} from '@kokitotsos/react-components';
import { RegisterActivity} from '@/types/Activities';

export const useActivityInput = (initialActivity: types.TimeslotType) => {
    const [type, setType] = useState<types.TimeslotType| ''>('');

  const [activity, setActivity] = useState({ schedule: 1,
    userId: '',
    winner: false,
    type: initialActivity,
    presenter: [],
    externalPresenter: [],
    location: { title: '', subtitle: '', coordinates: '' },
    title: '',
    details: '',
    start: '',
    end: '',} as unknown as RegisterActivity);
  const [showPresenter, setShowPresenter] = useState(false);
  const [showLocation, setShowLocation] = useState(false);
  const [showExternalPresenter, setShowExternalPresenter] = useState(false);
  const [location, setLocation] = useState({ title: '', subtitle: '', coordinates: '' });

  const handleActivityInputChange = (e: SelectChangeEvent<types.TimeslotType>) => {
    const { name, value } = e.target;
    if (name === 'type' && value) {
      setType(value as types.TimeslotType);
      setActivity({ ...activity, type: value as types.TimeslotType });

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

  const resetActivity = () => {
    setActivity({
      presenter: [],
      externalPresenter: [],
      title: '',
      details: '',
      start: '',
      end: '',
    } as unknown as RegisterActivity);
    setLocation({ title: '', subtitle: '', coordinates: '' });
    setType('');
    setShowExternalPresenter(false);
    setShowPresenter(false);
    setShowLocation(false);
  };

  const handleLocationChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setLocation({ ...location, [name]: value });
  };

  return {
    type,
    activity,
    showPresenter,
    showLocation,
    showExternalPresenter,
    handleActivityInputChange,
    setActivity,
    resetActivity,
    setLocation,
    handleLocationChange,
    location
  };
};