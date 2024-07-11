import React from 'react';
import { useParams } from 'react-router-dom';
import { Container, Button, Typography, Grid } from '@mui/material';
import QuestionForm from '../components/QuestionFrom';
import useQuestions from '../hooks/useQuestion';

const QuestionFormList = () => {
  const { unique_code } = useParams();
  const { questions, addQuestion, removeQuestion, updateQuestion, submitQuestions } = useQuestions(unique_code);

  return (
    <Container style={{ padding: '20px' }}>
      <Typography variant="h5" gutterBottom>
        Create Questions : {unique_code}
      </Typography>
      <Grid container direction="column">
        {questions.map((question, index) => (
          <QuestionForm
            key={question.id || question.tempId}
            index={index}
            data={question}
            handleChange={updateQuestion}
            handleRemove={removeQuestion}
          />
        ))}
      </Grid>
      <Button
        variant="contained"
        color="primary"
        onClick={addQuestion}
        style={{ marginTop: '20px' }}
      >
        Add Question
      </Button>
      <Button
        variant="contained"
        color="secondary"
        onClick={submitQuestions}
        style={{ marginTop: '20px', marginLeft: '10px' }}
      >
        Submit
      </Button>
    </Container>
  );
};

export default QuestionFormList;
