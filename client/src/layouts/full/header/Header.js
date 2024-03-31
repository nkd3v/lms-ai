import React, { useContext, useEffect } from 'react';
import { Box, AppBar, Toolbar, styled, Stack, IconButton, Badge, Button, Chip } from '@mui/material';
import PropTypes from 'prop-types';
import GoogleButton from 'react-google-button'

// components
import Profile from './Profile';
import { IconBellRinging, IconMenu } from '@tabler/icons';
import { Link, useLocation } from 'react-router-dom';
import Cookies from 'js-cookie';
import { BehaviorContext } from '../../../contexts/BehaviorContext';

function secondsToFormattedTime(seconds) {
  if (isNaN(seconds) || seconds < 0) {
    throw new Error("Input must be a non-negative number of seconds");
  }

  // Get minutes and remaining seconds
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;

  // Format minutes and seconds with leading zeros
  const formattedMinutes = minutes.toString().padStart(2, "0");
  const formattedSeconds = remainingSeconds.toString().padStart(2, "0");

  return `${formattedMinutes} mins ${formattedSeconds} secs`;
}

const Header = (props) => {

  // const lgUp = useMediaQuery((theme) => theme.breakpoints.up('lg'));
  // const lgDown = useMediaQuery((theme) => theme.breakpoints.down('lg'));
  const { behaviorStatus, timer } = useContext(BehaviorContext);

  const location = useLocation()
  console.log(typeof location.pathname)

  const AppBarStyled = styled(AppBar)(({ theme }) => ({
    boxShadow: 'none',
    background: theme.palette.background.paper,
    justifyContent: 'center',
    backdropFilter: 'blur(4px)',
    [theme.breakpoints.up('lg')]: {
      minHeight: '70px',
    },
  }));

  const ToolbarStyled = styled(Toolbar)(({ theme }) => ({
    width: '100%',
    color: theme.palette.text.secondary,
  }));

  return (
    <AppBarStyled position="sticky" color="default">
      <ToolbarStyled>
        <IconButton
          color="inherit"
          aria-label="menu"
          onClick={props.toggleMobileSidebar}
          sx={{
            display: {
              lg: "none",
              xs: "inline",
            },
          }}
        >
          <IconMenu width="20" height="20" />
        </IconButton>


        <IconButton
          size="large"
          aria-label="show 11 new notifications"
          color="inherit"
          aria-controls="msgs-menu"
          aria-haspopup="true"
          sx={{
            ...(typeof anchorEl2 === 'object' && {
              color: 'primary.main',
            }),
          }}
        >
          <Badge variant="dot" color="primary">
            <IconBellRinging size="21" stroke="1.5" />
          </Badge>

        </IconButton>
        <Box flexGrow={1} />

        {
          location.pathname.startsWith('/exam') && <>
            <Chip style={{ marginRight: '10px' }} label={behaviorStatus} />
            <Chip style={{ marginRight: '10px' }} label={`Time left: ${secondsToFormattedTime(timer)}`} variant="outlined" />
          </>
        }

        {
          Cookies.get('jwtToken') ? (
            <Stack spacing={1} direction="row" alignItems="center">
              <Profile />
            </Stack>
          ) : (
            <a href='http://localhost:3000/api/v1/auth/google'>
              <Button variant="outlined">
                Sign in
              </Button>
            </a>
          )
        }

      </ToolbarStyled>
    </AppBarStyled>
  );
};

Header.propTypes = {
  sx: PropTypes.object,
};

export default Header;
