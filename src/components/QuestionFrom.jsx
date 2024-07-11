import React, { useState } from 'react';
import {
  TextField,
  Button,
  Grid,
  Paper,
  IconButton,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

const QuestionForm = ({ index, handleChange, handleRemove,data }) => {
  const [formData, setFormData] = useState(data);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    handleChange(index, { ...formData, [name]: value });
  };

  return (
    <Paper style={{ padding: '20px', marginBottom: '20px' }}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField
            label="Question Text"
            name="question_text"
            value={formData.question_text}
            onChange={handleInputChange}
            fullWidth
            required
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            label="Options (JSON)"
            name="options"
            value={formData.options}
            onChange={handleInputChange}
            fullWidth
            required
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            label="Correct Answer"
            name="correct_answer"
            value={formData.correct_answer}
            onChange={handleInputChange}
            fullWidth
            required
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            label="Time Needed (HH:MM:SS)"
            name="time_needed"
            value={formData.time_needed}
            onChange={handleInputChange}
            fullWidth
            required
          />
        </Grid>
        <Grid item xs={12}>
          <IconButton onClick={() => handleRemove(index)}>
            <DeleteIcon />
          </IconButton>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default QuestionForm;
