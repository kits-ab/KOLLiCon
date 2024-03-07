import { useState } from 'react';
import { useProfilePictureExists } from '@/utils/Helpers/RegisterActivity/CheckProfilePicture';
import { useProfilePictureUrl } from '@/utils/Helpers/RegisterActivity/GetProfilePicture';
import { useFetchFiles } from '@/utils/Hooks/RegisterActivity/useFetchFiles';

export const usePresenter = () => {
  const [presenter, setPresenter] = useState({
    name: '',
    avatarSrc: '',
  });
  const [error, setError] = useState('');
  const [suggestions, setSuggestions] = useState([]);

  const getProfilePictureUrl = useProfilePictureUrl();
  const profilePictureExists = useProfilePictureExists();
  const { EmployeesFiles } = useFetchFiles();

  //Function to handle the presenter change
  const handlePresenterChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setError('');
    setPresenter({ ...presenter, [name]: value, avatarSrc: getProfilePictureUrl(value) });
    if (value) {
      const filteredTitles = EmployeesFiles.filter((file: { title: string }) =>
        file.title.toLowerCase().startsWith(value.toLowerCase()),
      );
      // Update suggestions state with filtered titles
      setSuggestions(filteredTitles);
    } else {
      // Clear suggestions if the input is empty
      setSuggestions([]);
    }
  };

  //Function to handle the suggestion click
  const handleSuggestionClick = (selectedTitle: string) => {
    // Update the presenter name with the selected title
    setPresenter({
      ...presenter,
      name: selectedTitle,
      avatarSrc: getProfilePictureUrl(selectedTitle),
    });
    // Clear suggestions
    setSuggestions([]);
  };

  // Check if the profile picture exists before adding the presenter
  const addPresenter = async () => {
    const profilePictureUrl = getProfilePictureUrl(presenter.name);
    const pictureExists = await profilePictureExists(profilePictureUrl);

    // Check if the title exists in the files state
    const titleExists = EmployeesFiles.some(
      (file: { title: string }) => file.title.toLowerCase() === presenter.name.toLowerCase(),
    );

    if (!pictureExists || !titleExists) {
      // Handle case where title doesn't exist in files state or profile picture doesn't exist
      setError(`"${presenter.name}" not found`);
      return;
    }

    // Add presenter to the activity state
    const newPresenter = {
      ...presenter,
    };

    return newPresenter;
  };

  return {
    presenter,
    error,
    suggestions,
    handlePresenterChange,
    handleSuggestionClick,
    addPresenter,
    setPresenter,
  };
};

//create a hook to handle the external presenter
export const useExternalPresenter = () => {
  const [ExtraPresenterError, setError] = useState('');
  const [externalPresenter, setExternalPresenter] = useState({
    name: '',
    avatarSrc: '',
  });

  //Function to handle the external presenter change
  const handleExternalPresenterChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;
    setExternalPresenter({ ...externalPresenter, [name]: value });
    setError('');
  };

  //Add external presenter
  const addExternalPresenter = () => {
    if (!externalPresenter.name.trim()) {
      setError('Fyll i presentatör');
      return null;
    }
    const newExternalPresenter = {
      ...externalPresenter,
    };

    return newExternalPresenter;
  };

  return {
    externalPresenter,
    ExtraPresenterError,
    handleExternalPresenterChange,
    addExternalPresenter,
    setExternalPresenter,
  };
};
