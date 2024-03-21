import React from 'react';
import axios from 'axios';

const backendUrl = import.meta.env.VITE_API_URL;

export const useDeleteActivity = () => {
  const [pickedActivities, setPickedActivities] = React.useState<number[]>([]);
  const [resetButtonColor, setResetButtonColor] = React.useState(false);
  const [changeColorWhenPicked, setChangeColorWhenPicked] = React.useState(false);

  const handlePickedActivity = (value: any) => {
    const isAlreadyPicked = pickedActivities.includes(value);

    if (isAlreadyPicked) {
      setPickedActivities((prevPickedActivities) =>
        prevPickedActivities.filter((activity) => activity !== value),
      );
    } else {
      setPickedActivities((prevPickedActivities) => [...prevPickedActivities, value]);
    }
  };

  const handleChangeChildState = () => {
    setResetButtonColor((prevState) => !prevState);
  };

  const triggerDeleteOfActivity = async () => {
    console.log(pickedActivities, 'pickedActivities');
    if (pickedActivities.length === 0) {
      return;
    } else {
      for (let i = 0; i < pickedActivities.length; i++) {
        console.log('did we run?');
        await axios.delete(`${backendUrl}/api/activity/delete/${pickedActivities[i]}`);
      }
    }
  };

  const addActivityToDeleteQue = (value: any) => {
    console.log('Adding activity to delete queue:', value);
    setPickedActivities((prevPickedActivities) => [...prevPickedActivities, value.id]);
    //setPickedActivities([value]);
    console.log(pickedActivities);

    // setChangeColorWhenPicked((prevState) => !prevState);
  };

  return {
    pickedActivities,
    resetButtonColor,
    changeColorWhenPicked,
    handlePickedActivity,
    handleChangeChildState,
    triggerDeleteOfActivity,
    addActivityToDeleteQue,
  };
};
