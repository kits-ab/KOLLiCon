import React from 'react';
import axios from 'axios';

const backendUrl = import.meta.env.VITE_API_URL;

export const useDeleteActivity = () => {
  const [pickedActivities, setPickedActivities] = React.useState<number[]>([]);
  const [changeColorWhenPicked, setChangeColorWhenPicked] = React.useState<Record<number, boolean>>(
    {},
  );

  const addActivityToDeleteQue = (value: any) => {
    const isAlreadyPicked = pickedActivities.includes(value.id);

    if (isAlreadyPicked) {
      setPickedActivities((prevPickedActivities) =>
        prevPickedActivities.filter((activity) => activity !== value.id),
      );
    } else {
      setPickedActivities((prevPickedActivities) => [...prevPickedActivities, value.id]);
    }

    setChangeColorWhenPicked((prevColors) => ({
      ...prevColors,
      [value.id]: !prevColors[value.id],
    }));
  };

  const handleChangeChildState = () => {
    setChangeColorWhenPicked({});
  };

  const triggerDeleteOfActivity = async (setShowButtonsProp: any) => {
    if (pickedActivities.length === 0) {
      setShowButtonsProp(false);
      return;
    } else {
      for (let i = 0; i < pickedActivities.length; i++) {
        await axios.delete(`${backendUrl}/api/activity/delete/${pickedActivities[i]}`);
      }
      setShowButtonsProp(false);
      window.location.reload();
    }
  };

  return {
    pickedActivities,
    changeColorWhenPicked,
    addActivityToDeleteQue,
    handleChangeChildState,
    triggerDeleteOfActivity,
    setPickedActivities,
  };
};
