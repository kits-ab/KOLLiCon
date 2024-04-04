import React, { useState, useEffect } from 'react';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import OutlinedInput from '@mui/material/OutlinedInput';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import { TypeFormStyled, TypeSelectStyled } from '@/styles/RegisterActivity/StyledActivity';
import { CreateSchedule } from '@/types/Schedule';

type ImageSelectProps = {
    schedule: CreateSchedule;
    setSchedule: React.Dispatch<React.SetStateAction<CreateSchedule>> | any;
};

const ImageSelect: React.FC<ImageSelectProps> = (
  {
    schedule,
    setSchedule,
  },
) => {
  const [selectedName, setSelectedName] = useState<string>('');
  const [names, setNames] = useState<string[]>([]);
  const [imageList, setImageList] = useState<any[]>([]);

  useEffect(() => {
    // Fetch images from the kits repository
    fetch('https://api.github.com/repos/kits-ab/kits/contents/static/assets')
      .then((response) => response.json())
      .then((data) => {
        // Filter images that start with 'kitscon_'
        const filteredImages = data.filter((item: any) => {
          return (
            /^(kitscon_\d{2}-\d{1})\.(png|jpe?g|svg)$/i.test(item.name) ||
            /^(kitscon_\d{2}_\d{1})\.(png|jpe?g|svg)$/i.test(item.name) ||
            /^(kitscon_\d{2}.\d{1})\.(png|jpe?g|svg)$/i.test(item.name)
          );
        });
        setImageList(filteredImages);
        setNames(filteredImages.map((item: any) => item.name));
      })
      .catch((error) => console.error('Error fetching images:', error));
  }, []);

  // Function to handle the change of the image name
  const handleNameChange = (event: SelectChangeEvent<string>) => {
    const name = event.target.value as string;
    setSelectedName(name);
    const selectedImage = imageList.find((image) => image.name === name);
    if (selectedImage) {
      // Update schedule state with imageURL
      setSchedule({ ...schedule, imageURL: selectedImage.download_url });
    } else {
      // Reset imageURL in schedule state if no image is selected
      setSchedule({ ...schedule, imageURL: '' });
    }
  };

  return (
    <FormControl sx={{ ...TypeFormStyled }}>
      <InputLabel id='type-label'>KitsCon Image</InputLabel>
      <Select
        MenuProps={{
          PaperProps: {
            sx: { ...TypeSelectStyled },
          },
        }}
        labelId='logo-label'
        id='schedule-logo'
        name='imageURL'
        value={selectedName}
        onChange={handleNameChange}
        input={<OutlinedInput label='KitsCon Logo' />}
      >
        {names.map((name, index) => (
          <MenuItem key={index} value={name}>
            {name}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default ImageSelect;
