import { useState, useEffect } from 'react';
import api from "../api";

const useQuestions = (unique_code) => {
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await api.get(`/api/quiz/${unique_code}/find-question/`);
        setQuestions(response.data);
      } catch (error) {
        console.error('Error fetching questions:', error.response ? error.response.data : error.message);
      }
    };

    fetchQuestions();
  }, [unique_code]);

  const addQuestion = () => {
    setQuestions([...questions, { tempId: Date.now(), isNew: true }]);
  };

  const removeQuestion = async (index) => {
    const questionToRemove = questions[index];
    if (!questionToRemove.isNew) {
      try {
        await api.delete(`/api/quiz/delete-question/${questionToRemove.id}/`);
        setQuestions(questions.filter((_, i) => i !== index));
      } catch (error) {
        console.error('Error deleting question:', error.response ? error.response.data : error.message);
      }
    } else {
      setQuestions(questions.filter((_, i) => i !== index));
    }
  };

  const updateQuestion = (index, data) => {
    setQuestions(questions.map((question, i) =>
      i === index ? { ...question, ...data } : question
    ));
  };

  const submitQuestions = async () => {
    try {
      const newQuestions = questions.filter(q => q.isNew);
      const existingQuestions = questions.filter(q => !q.isNew);

      // Post new questions in bulk
      if (newQuestions.length > 0) {
        await api.post(`/api/quiz/${unique_code}/create-question/`, newQuestions);
      }

      // Put existing questions in bulk
      if (existingQuestions.length > 0) {
        await api.put(`/api/quiz/${unique_code}/update-questions/`, existingQuestions);
      }

      console.log('Submission successful');
    } catch (error) {
      console.error('Submission error:', error.response ? error.response.data : error.message);
    }
  };

  return {
    questions,
    addQuestion,
    removeQuestion,
    updateQuestion,
    submitQuestions,
  };
};

export default useQuestions;
