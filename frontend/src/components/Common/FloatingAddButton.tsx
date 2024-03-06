import Box from '@mui/material/Box';
import { throttle } from 'lodash';
import AddIcon from '@mui/icons-material/Add';
import { useState, useEffect } from 'react';
import { Colors } from '../../styles/Common/colors';

const FloatingButton = ({ activateDrawer }: { activateDrawer: () => void }) => {
  const [showAddActivity, setShowAddActivity] = useState(false);
  const [isScrolling, setIsScrolling] = useState(false);

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;
    const handleScroll = throttle(() => {
      clearTimeout(timeoutId);
      setIsScrolling(true);
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      const scrollHeight = document.documentElement.scrollHeight;
      const windowHeight = window.innerHeight;
      const scrollPercentage = (scrollTop + windowHeight) / scrollHeight;
      const triggerThreshold = 0.96;

      setShowAddActivity(scrollPercentage >= triggerThreshold);

      timeoutId = setTimeout(() => {
        setIsScrolling(false);
      }, 500);
    }, 300);

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearTimeout(timeoutId);
    };
  }, []);

  return (
    <>
      {!showAddActivity && (
        <Box
          sx={{
            position: 'fixed',
            bottom: '30px',
            right: '20px',
            zIndex: '1001',
            opacity: isScrolling ? 0.4 : 1,
            transition: 'opacity 0.5s ease-in-out',
          }}
        >
          <AddIcon
              sx={{
                fontSize: '55px',
                color: 'white',
                borderRadius: '50%',
                padding: '10px',
                backgroundColor: `${Colors.primaryAddButton}`,
                cursor: 'pointer',
                '&:hover': {
                  backgroundColor: '#405632',
                },
              }}
              onClick={activateDrawer}
            />
        </Box>
      )}
    </>
  );
};

export default FloatingButton;
