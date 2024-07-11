import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from './pages/Login';
import Register from './pages/Register';
import NotFound from './pages/NotFound';
import CreateQuiz from './pages/CreateQuiz';
import ProtectedRoute from './components/ProtectedRoutes';
import Home from './pages/Home';
import './App.css';
import QuestionFormList from "./pages/QuestionFormList";

function Logout() {
  localStorage.clear();
  return <Navigate to="/login" />;
}

function RegisterAndLogout() {
  localStorage.clear();
  return <Register route="/api/user/register/" />;
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />
        <Route
          path="/create-session"
          element={
            <ProtectedRoute>
              <CreateQuiz />
            </ProtectedRoute>
          }
        />

        <Route
          path="/:unique_code/create-question/"
          element={
            <ProtectedRoute>
              <QuestionFormList />
            </ProtectedRoute>
          }
        />

        <Route path="/login" element={<Login route="/api/token/" />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="/register" element={<RegisterAndLogout />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
