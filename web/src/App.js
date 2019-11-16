import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Container from '@material-ui/core/Container';
import EuroIcon from '@material-ui/icons/Euro';
import HomeIcon from '@material-ui/icons/Home';
import EcoIcon from '@material-ui/icons/Eco';
import Box from '@material-ui/core/Box';
import { BottomNavigation, BottomNavigationAction } from '@material-ui/core';

import { VIEW, changeView } from './store/view';
import LandingPage from './views/LandingPage';
import PruchaseHistory from './views/PurchaseHistory';

function App() {
  const view = useSelector(state => state.view);
  const dispatch = useDispatch();

  return (
    <Container
      maxWidth='sm'
      style={{ display: 'flex', flexDirection: 'column', height: '100vh' }}
    >
      <Box style={{ flex: 1 }}>
        {(() => {
          switch(view) {
            case VIEW.LANDING:
              return <LandingPage />
            case VIEW.PURCHASE_HISTORY:
              return <PruchaseHistory />
            default:
              return <h1>{view} is not known</h1>
          }
        })()}
      </Box>
      <BottomNavigation showLabels>
        <BottomNavigationAction
          label="Purchases"
          icon={<EuroIcon />}
          onClick={() => dispatch(changeView(VIEW.PURCHASE_HISTORY))}
        />
        <BottomNavigationAction
          label="Home"
          icon={<HomeIcon />}
          onClick={() => dispatch(changeView(VIEW.PURCHASE_HISTORY))}
          />
        <BottomNavigationAction label="Make a change" icon={<EcoIcon />}/>
      </BottomNavigation>
    </Container>
  );
}

export default App;
