import React, { useState } from 'react';
import { TextField, Button, Grid, Container, Box, CircularProgress, Snackbar, Alert } from '@mui/material';
import { styled } from '@mui/material/styles';
import api from "../api";
import { useNavigate } from 'react-router-dom';

const CustomTextField = styled(TextField)({
  '& label': {
    color: '#D5DADD', // Define your label color here
  },
  '& label.Mui-focused': {
    color: '#D5DADD',
  },
  '& ::placeholder': { // Hide placeholder
    opacity: 0,
  },
});

const CreateQuiz = () => {
  const [formData, setFormData] = useState({
    name: '',
    date: '',
    time: '',
    max_participants: ''
  });

  const [loading, setLoading] = useState(false);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: '' });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const createQuiz = async (data) => {
    setLoading(true);
    try {
      const response = await api.post('http://127.0.0.1:8000/api/quiz/create-session/', data);
      const uniqueCode = response.data.unique_code;
      setSnackbar({ open: true, message: 'Quiz created successfully!', severity: 'success' });
      // Redirect to the create question page
      navigate(`/${uniqueCode}/create-question/`);
    } catch (error) {
      setSnackbar({ open: true, message: 'Failed to create quiz. Please try again.', severity: 'error' });
      // Handle error, e.g., show an error message
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    // Combine date and time into a single DateTime field
    const start_time = `${formData.date}T${formData.time}:00`;

    const data = {
      name: formData.name,
      start_time: start_time,
      max_participants: formData.max_participants
    };

    await createQuiz(data);
  };

  const handleCloseSnackbar = () => {
    setSnackbar({ open: false, message: '', severity: '' });
  };

  return (
    <Container maxWidth="sm">
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="100vh"
      >
        <Box width="100%">
          <form onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <CustomTextField
                  fullWidth
                  label="Name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  variant="standard"
                />
              </Grid>
              <Grid item xs={6}>
                <CustomTextField
                  fullWidth
                  label="Date"
                  type="date"
                  name="date"
                  value={formData.date}
                  onChange={handleChange}
                  InputLabelProps={{
                    shrink: true
                  }}
                  InputProps={{
                    placeholder: '', // Set placeholder to empty
                    classes: {
                      input: CustomTextField.input,
                    },
                  }}
                  required
                  variant="standard"
                />
              </Grid>
              <Grid item xs={6}>
                <CustomTextField
                  fullWidth
                  label="Time"
                  type="time"
                  name="time"
                  value={formData.time}
                  onChange={handleChange}
                  InputLabelProps={{
                    shrink: true
                  }}
                  InputProps={{
                    placeholder: '', // Set placeholder to empty
                  }}
                  required
                  variant="standard"
                />
              </Grid>
              <Grid item xs={12}>
                <CustomTextField
                  fullWidth
                  label="Max Participants"
                  name="max_participants"
                  value={formData.max_participants}
                  onChange={handleChange}
                  type="number"
                  required
                  variant="standard"
                />
              </Grid>
              <Grid item xs={12}>
                <Button
                  variant="contained"
                  color="primary"
                  type="submit"
                  disabled={loading}
                  endIcon={loading && <CircularProgress size={24} />}
                >
                  {loading ? 'Loading...' : 'Next'}
                </Button>
              </Grid>
            </Grid>
          </form>
        </Box>
      </Box>
      <Snackbar open={snackbar.open} autoHideDuration={6000} onClose={handleCloseSnackbar}>
        <Alert onClose={handleCloseSnackbar} severity={snackbar.severity} sx={{ width: '100%' }}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Container>
  );
}

export default CreateQuiz;
