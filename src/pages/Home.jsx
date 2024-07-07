import React from 'react';
import { Box, Button, TextField, InputAdornment, IconButton, Typography, Grid } from '@mui/material';
import { Send } from '@mui/icons-material';
import { styled } from '@mui/system';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';  // Import useNavigate

// Import Roboto font
import '@fontsource/roboto';

const theme = createTheme({
  typography: {
    fontFamily: 'Roboto, sans-serif',
  },
});

const LeftSideBox = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  backgroundColor: '#FFF5E1',
  padding: '40px',
  minHeight: '100vh',
});

const RightSideBox = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  backgroundColor: '#FF6969',
  padding: '40px',
  minHeight: '100vh',
});

const StyledButton = styled(Button)({
  width: '200px',
  height: '56px',
  marginTop: '20px',
  backgroundColor: '#FFF5E1',
  color: '#C80036',
  '&:hover': {
    backgroundColor: '#0C1844',
    color: '#FFF5E1',
  },
});

const StyledTextField = styled(TextField)({
  width: '300px',
  height: '56px',
  marginTop: '20px'
});

function Home() {
  const navigate = useNavigate();  // Use useNavigate hook

  const handleCreateTeam = () => {
    navigate('/create-session');  // Navigate to /create-session
  };

  return (
    <ThemeProvider theme={theme}>
      <Grid container>
        <Grid item xs={6}>
          <LeftSideBox>
            <Typography variant="h4" component="h2" gutterBottom>
              Join a Quiz
            </Typography>
            <StyledTextField 
              label="Enter Code" 
              variant="outlined" 
              InputProps={{ 
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton edge="end" aria-label="join" style={{ color: '#0C1844' }}>
                      <Send />
                    </IconButton>
                  </InputAdornment>
                )
              }}
            />
          </LeftSideBox>
        </Grid>
        <Grid item xs={6}>
          <RightSideBox>
            <Typography variant="h4" component="h2" gutterBottom>
              Create a Quiz
            </Typography>
            <StyledButton variant="contained" onClick={handleCreateTeam}>
              Create quiz
            </StyledButton>
          </RightSideBox>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}

export default Home;
