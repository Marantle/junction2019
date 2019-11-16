import React from 'react';
import { useSelector } from 'react-redux';
import Container from '@material-ui/core/Container';
import EuroIcon from '@material-ui/icons/Euro';
import HomeIcon from '@material-ui/icons/Home';
import EcoIcon from '@material-ui/icons/Eco';
import Box from '@material-ui/core/Box';
import { BottomNavigation, BottomNavigationAction } from '@material-ui/core';

import { VIEW } from './store/view';
import LandingPage from './views/LandingPage';

function App() {
  const view = useSelector(state => state.view);

  return (
    <Container
      maxWidth='sm'
      style={{ display: 'flex', flexDirection: 'column', height: '100vh' }}
    >
      <Box style={{ flex: 1 }}>
        {(() => {
          switch(view) {
            case VIEW.MAIN:
              return <LandingPage />
            default:
              return <h1>{view} is not known</h1>
          }
        })()}
      </Box>
      <BottomNavigation showLabels>
        <BottomNavigationAction label="Purchases" icon={<EuroIcon />}/>
        <BottomNavigationAction label="Home" icon={<HomeIcon />}/>
        <BottomNavigationAction label="Make a change" icon={<EcoIcon />}/>
      </BottomNavigation>
    </Container>
  );
}

export default App;
