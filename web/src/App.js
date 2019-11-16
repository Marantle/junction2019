import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import EuroIcon from '@material-ui/icons/Euro';
import HomeIcon from '@material-ui/icons/Home';
import EcoIcon from '@material-ui/icons/Eco';
import Box from '@material-ui/core/Box';
import { BottomNavigation, BottomNavigationAction } from '@material-ui/core';
import { useTheme } from '@material-ui/core/styles';

import { VIEW, changeView } from './store/view';
import LandingPage from './views/LandingPage';
import RecipeSelection from './views/RecipeSelection/RecipeSelection';
import PurchaseHistory from './views/PurchaseHistory';
import MainChoice from './views/MainChoice';
import bg from './bg.png';
import SomethingQuick from './views/SelectIngridients';

function App() {
  const view = useSelector(state => state.view);
  const dispatch = useDispatch();
  const theme = useTheme();
  return (
    <Box
      style={{
        display: 'flex',
        flexDirection: 'column',
        height: '100vh',
        padding: 0,
        margin: 'auto',
        maxWidth: '640px',
        backgroundColor: '',
        backgroundImage: `url(${bg})`,
        backgroundSize: 'cover'
      }}
    >
      <Box bgcolor='secondary.main'>
        <Box component='h1' textAlign='center' color='text.secondary'>
          Kitchen Konmari
        </Box>
      </Box>
      <Box
        flex={'1'}
        display='flex'
        flexDirection='column'
        color='text.primary'
        style={{ overflowX: 'hidden' }}
      >
        {(() => {
          switch(view) {
            case VIEW.LANDING:
              return <LandingPage />
            case VIEW.PURCHASE_HISTORY:
              return <PurchaseHistory />
            case VIEW.RECIPE_SELECTION:
              return <RecipeSelection />
            case VIEW.MAIN_CHOICE:
              return <MainChoice />
            case VIEW.SOMETHING_QUICK:
              return <SomethingQuick />
            default:
              return <h1>{view} is not known</h1>
          }
        })()}
      </Box>
      <BottomNavigation showLabels style={{
        backgroundColor: '#285A45',
        boxShadow: '0 0 8px 2px #285A45',
        borderTopLeftRadius: '16px',
        borderTopRightRadius: '16px'
      }}>
        <BottomNavigationAction
          label="Purchases"
          icon={<EuroIcon fontSize='large' />}
          onClick={() => dispatch(changeView(VIEW.PURCHASE_HISTORY))}
        />
        <BottomNavigationAction
          label="Home"
          icon={<HomeIcon fontSize='large' />}
          onClick={() => dispatch(changeView(VIEW.LANDING))}
          />
        <BottomNavigationAction
          label="Make a change"
          icon={<EcoIcon fontSize='large'/>}
        />
      </BottomNavigation>
    </Box>
  );
}

export default App;
