import React, { useState } from 'react';
import {
  Container,
  Button,
  Typography,
  Grid,
} from '@mui/material';
import QuestionForm from './QuestionForm';

const QuestionFormList = () => {
  const [questions, setQuestions] = useState([{ id: Date.now() }]);

  const handleAddForm = () => {
    setQuestions([...questions, { id: Date.now() }]);
  };

  const handleRemoveForm = (index) => {
    const newQuestions = questions.filter((_, i) => i !== index);
    setQuestions(newQuestions);
  };

  const handleFormChange = (index, data) => {
    const newQuestions = questions.map((question, i) =>
      i === index ? { ...question, ...data } : question
    );
    setQuestions(newQuestions);
  };

  const handleSubmit = () => {
    const questionsData = questions.map(({ id, ...rest }) => rest);
    console.log(JSON.stringify(questionsData));
    // Submit the JSON data to the server
  };

  return (
    <Container style={{ padding: '20px' }}>
      <Typography variant="h5" gutterBottom>
        Create Questions
      </Typography>
      <Grid container direction="column">
        {questions.map((question, index) => (
          <QuestionForm
            key={question.id}
            index={index}
            handleChange={handleFormChange}
            handleRemove={handleRemoveForm}
          />
        ))}
      </Grid>
      <Button
        variant="contained"
        color="primary"
        onClick={handleAddForm}
        style={{ marginTop: '20px' }}
      >
        Add Question
      </Button>
      <Button
        variant="contained"
        color="secondary"
        onClick={handleSubmit}
        style={{ marginTop: '20px', marginLeft: '10px' }}
      >
        Submit
      </Button>
    </Container>
  );
};

export default QuestionFormList;
